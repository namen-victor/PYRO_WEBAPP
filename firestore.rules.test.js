const { initializeTestEnvironment } = require('@firebase/rules-unit-testing');
const { expect } = require('chai');

describe('Firestore Security Rules', () => {
  let testEnv;
  let adminDb;
  let clientDb;
  let staffDb;

  before(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'pyro-test',
      firestore: {
        rules: require('./firestore.rules'),
      },
    });
    
    // Create test users
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      
      // Create admin user
      await db.collection('users').doc('admin_123').set({
        name: 'Admin User',
        email: 'admin@pyrosolutions.com',
        role: 'admin',
        status: 'active'
      });
      
      // Create staff user
      await db.collection('users').doc('staff_456').set({
        name: 'Staff User',
        email: 'staff@pyrosolutions.com',
        role: 'staff',
        status: 'active'
      });
      
      // Create client user
      await db.collection('users').doc('client_789').set({
        name: 'Client User',
        email: 'client@pyrosolutions.com',
        role: 'client',
        status: 'waitlisted'
      });
    });
    
    // Create authenticated contexts
    adminDb = testEnv.authenticatedContext('admin_123').firestore();
    staffDb = testEnv.authenticatedContext('staff_456').firestore();
    clientDb = testEnv.authenticatedContext('client_789').firestore();
  });

  after(() => {
    testEnv.cleanup();
  });

  describe('Users Collection', () => {
    it('should allow users to read their own profile', async () => {
      const doc = await clientDb.collection('users').doc('client_789').get();
      expect(doc.exists).to.be.true;
    });

    it('should allow admins to read all users', async () => {
      const docs = await adminDb.collection('users').get();
      expect(docs.size).to.be.greaterThan(0);
    });

    it('should allow staff to read all users', async () => {
      const docs = await staffDb.collection('users').get();
      expect(docs.size).to.be.greaterThan(0);
    });

    it('should allow users to update their own profile', async () => {
      await expect(
        clientDb.collection('users').doc('client_789').update({
          name: 'Updated Client Name'
        })
      ).to.not.be.rejected;
    });

    it('should allow admins to update any user', async () => {
      await expect(
        adminDb.collection('users').doc('client_789').update({
          status: 'active'
        })
      ).to.not.be.rejected;
    });

    it('should allow staff to update client users', async () => {
      await expect(
        staffDb.collection('users').doc('client_789').update({
          status: 'active'
        })
      ).to.not.be.rejected;
    });

    it('should prevent staff from updating admin users', async () => {
      await expect(
        staffDb.collection('users').doc('admin_123').update({
          name: 'Hacked Admin'
        })
      ).to.be.rejected;
    });

    it('should prevent clients from updating other users', async () => {
      await expect(
        clientDb.collection('users').doc('admin_123').update({
          name: 'Hacked Admin'
        })
      ).to.be.rejected;
    });
  });

  describe('Applications Collection', () => {
    beforeEach(async () => {
      // Create test application
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('applications').doc('app_123').set({
          clientId: 'client_789',
          assignedStaffId: 'staff_456',
          company: 'Test Company',
          position: 'Software Engineer',
          status: 'applied'
        });
      });
    });

    it('should allow clients to read their own applications', async () => {
      const doc = await clientDb.collection('applications').doc('app_123').get();
      expect(doc.exists).to.be.true;
    });

    it('should allow staff to read applications assigned to them', async () => {
      const doc = await staffDb.collection('applications').doc('app_123').get();
      expect(doc.exists).to.be.true;
    });

    it('should allow admins to read all applications', async () => {
      const doc = await adminDb.collection('applications').doc('app_123').get();
      expect(doc.exists).to.be.true;
    });

    it('should allow staff to create applications', async () => {
      await expect(
        staffDb.collection('applications').add({
          clientId: 'client_789',
          assignedStaffId: 'staff_456',
          company: 'New Company',
          position: 'Developer',
          status: 'applied'
        })
      ).to.not.be.rejected;
    });

    it('should prevent clients from creating applications', async () => {
      await expect(
        clientDb.collection('applications').add({
          clientId: 'client_789',
          assignedStaffId: 'staff_456',
          company: 'Unauthorized Company',
          position: 'Developer',
          status: 'applied'
        })
      ).to.be.rejected;
    });
  });

  describe('Messages Collection', () => {
    beforeEach(async () => {
      // Create test message
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('messages').doc('msg_123').set({
          senderId: 'staff_456',
          recipientId: 'client_789',
          content: 'Test message',
          timestamp: new Date()
        });
      });
    });

    it('should allow users to read messages they sent or received', async () => {
      const doc = await clientDb.collection('messages').doc('msg_123').get();
      expect(doc.exists).to.be.true;
    });

    it('should allow users to create messages', async () => {
      await expect(
        clientDb.collection('messages').add({
          senderId: 'client_789',
          recipientId: 'staff_456',
          content: 'Hello from client',
          timestamp: new Date()
        })
      ).to.not.be.rejected;
    });

    it('should prevent users from updating messages', async () => {
      await expect(
        clientDb.collection('messages').doc('msg_123').update({
          content: 'Modified message'
        })
      ).to.be.rejected;
    });

    it('should prevent users from deleting messages', async () => {
      await expect(
        clientDb.collection('messages').doc('msg_123').delete()
      ).to.be.rejected;
    });
  });

  describe('Security: Deny Cases', () => {
    let unauthenticatedDb;
    let otherClientDb;

    before(async () => {
      // Create unauthenticated context
      unauthenticatedDb = testEnv.unauthenticatedContext().firestore();

      // Create another client user for cross-client tests
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('users').doc('client_999').set({
          name: 'Other Client',
          email: 'other@client.com',
          role: 'client',
          status: 'active'
        });
      });
      otherClientDb = testEnv.authenticatedContext('client_999').firestore();
    });

    describe('Unauthenticated Access', () => {
      it('should deny reading any user document', async () => {
        await expect(
          unauthenticatedDb.collection('users').doc('client_789').get()
        ).to.be.rejected;
      });

      it('should deny creating user documents', async () => {
        await expect(
          unauthenticatedDb.collection('users').add({
            email: 'hacker@evil.com',
            role: 'admin'
          })
        ).to.be.rejected;
      });

      it('should deny reading applications', async () => {
        await expect(
          unauthenticatedDb.collection('applications').doc('app_123').get()
        ).to.be.rejected;
      });

      it('should deny reading notifications', async () => {
        await expect(
          unauthenticatedDb.collection('notifications').get()
        ).to.be.rejected;
      });
    });

    describe('Cross-User Access', () => {
      it('should prevent clients from reading other users profiles', async () => {
        await expect(
          clientDb.collection('users').doc('client_999').get()
        ).to.be.rejected;
      });

      it('should prevent clients from updating other users', async () => {
        await expect(
          clientDb.collection('users').doc('client_999').update({
            name: 'Hacked Name'
          })
        ).to.be.rejected;
      });

      it('should prevent clients from reading other clients applications', async () => {
        // Create application for other client
        await testEnv.withSecurityRulesDisabled(async (context) => {
          const db = context.firestore();
          await db.collection('applications').doc('app_999').set({
            clientId: 'client_999',
            assignedStaffId: 'staff_456',
            company: 'Secret Company',
            position: 'Secret Position',
            status: 'applied'
          });
        });

        await expect(
          clientDb.collection('applications').doc('app_999').get()
        ).to.be.rejected;
      });
    });

    describe('Role Escalation Prevention', () => {
      it('should prevent clients from changing their own role', async () => {
        await expect(
          clientDb.collection('users').doc('client_789').update({
            role: 'admin'
          })
        ).to.be.rejected;
      });

      it('should prevent staff from updating admin users', async () => {
        await expect(
          staffDb.collection('users').doc('admin_123').update({
            status: 'inactive'
          })
        ).to.be.rejected;
      });

      it('should prevent staff from granting themselves admin role', async () => {
        await expect(
          staffDb.collection('users').doc('staff_456').update({
            role: 'admin'
          })
        ).to.be.rejected;
      });
    });

    describe('Write Access Control', () => {
      it('should prevent staff from writing to users collection', async () => {
        await expect(
          staffDb.collection('users').doc('new_user_123').set({
            email: 'unauthorized@user.com',
            role: 'client'
          })
        ).to.be.rejected;
      });

      it('should prevent clients from creating applications directly', async () => {
        await expect(
          clientDb.collection('applications').add({
            clientId: 'client_789',
            company: 'Fake Company',
            status: 'applied'
          })
        ).to.be.rejected;
      });

      it('should prevent clients from deleting their own user document', async () => {
        await expect(
          clientDb.collection('users').doc('client_789').delete()
        ).to.be.rejected;
      });
    });

    describe('Onboarding Collection Security', () => {
      it('should prevent clients from reading other users onboarding data', async () => {
        await testEnv.withSecurityRulesDisabled(async (context) => {
          const db = context.firestore();
          await db.collection('onboarding').doc('client_999').set({
            step: 'basics',
            data: { sensitive: 'info' }
          });
        });

        await expect(
          clientDb.collection('onboarding').doc('client_999').get()
        ).to.be.rejected;
      });

      it('should prevent unauthorized creation of onboarding docs', async () => {
        await expect(
          clientDb.collection('onboarding').doc('other_user_123').set({
            step: 'basics',
            data: {}
          })
        ).to.be.rejected;
      });
    });
  });
});
