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

  describe('Negative Test Cases - Role Escalation Prevention', () => {
    it('should prevent client from accessing admin-only collections', async () => {
      // Attempt to read admin settings
      await expect(
        clientDb.collection('admin_settings').doc('config').get()
      ).to.be.rejected;
    });

    it('should prevent staff from modifying admin user role', async () => {
      await expect(
        staffDb.collection('users').doc('admin_123').update({
          role: 'client' // Attempt to downgrade admin
        })
      ).to.be.rejected;
    });

    it('should prevent user from creating document in another user ID', async () => {
      // Client trying to create document for another client
      await expect(
        clientDb.collection('onboarding').doc('other_client_123').set({
          userId: 'other_client_123',
          status: 'pending'
        })
      ).to.be.rejected;
    });

    it('should prevent unauthenticated access', async () => {
      const unauthenticatedDb = testEnv.unauthenticatedContext().firestore();
      await expect(
        unauthenticatedDb.collection('users').get()
      ).to.be.rejected;
    });

    it('should prevent client from accessing staff dashboard data', async () => {
      await expect(
        clientDb.collection('staff_assignments').get()
      ).to.be.rejected;
    });

    it('should prevent cross-role document creation', async () => {
      // Client trying to create admin settings
      await expect(
        clientDb.collection('settings').doc('admin_config').set({
          role: 'admin',
          permissions: 'full'
        })
      ).to.be.rejected;
    });
  });

  describe('Field-Level Security Tests', () => {
    it('should allow user to update their own name but not role', async () => {
      // This should succeed
      await expect(
        clientDb.collection('users').doc('client_789').update({
          name: 'New Name'
        })
      ).to.not.be.rejected;

      // This should fail
      await expect(
        clientDb.collection('users').doc('client_789').update({
          role: 'admin' // Attempt to escalate privilege
        })
      ).to.be.rejected;
    });

    it('should prevent staff from updating user billing information', async () => {
      await expect(
        staffDb.collection('users').doc('client_789').update({
          billingInfo: {
            cardNumber: '1234567890'
          }
        })
      ).to.be.rejected;
    });

    it('should prevent users from modifying timestamps', async () => {
      await expect(
        clientDb.collection('applications').doc('app_123').update({
          createdAt: new Date('2020-01-01') // Attempt to backdate
        })
      ).to.be.rejected;
    });
  });

  describe('Collection-Level Access Control', () => {
    it('should allow staff to read notifications but not modify', async () => {
      // Create a notification
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('notifications').doc('notif_123').set({
          userId: 'client_789',
          type: 'application_update',
          message: 'Your application was reviewed',
          read: false
        });
      });

      // Staff can read
      const doc = await staffDb.collection('notifications').doc('notif_123').get();
      expect(doc.exists).to.be.true;

      // But cannot modify
      await expect(
        staffDb.collection('notifications').doc('notif_123').update({
          read: true
        })
      ).to.be.rejected;
    });

    it('should prevent unauthorized collection queries', async () => {
      // Client trying to query all applications
      await expect(
        clientDb.collection('applications')
          .where('status', '==', 'applied')
          .get()
      ).to.be.rejected;
    });
  });
});
