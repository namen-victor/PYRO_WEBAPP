"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange, logout, type User } from '@/lib/auth';
import { Chat } from '@/components/Chat';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ClientChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState<any>(null);
  const [assignedStaff, setAssignedStaff] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      if (user && user.role !== 'client') {
        router.replace('/login');
        return;
      }
      setLoading(false);
    });
    
    return unsubscribe;
  }, [router]);

  useEffect(() => {
    if (!user || user.role !== 'client') return;

    // Find assigned staff member
    const findAssignedStaff = async () => {
      try {
        // Get applications for this client
        const applicationsQuery = query(
          collection(db, 'applications'),
          where('clientId', '==', user.uid)
        );
        
        const applicationsSnapshot = onSnapshot(applicationsQuery, async (snapshot) => {
          if (!snapshot.empty) {
            const application = snapshot.docs[0].data();
            if (application.assignedStaffId) {
              // Get staff member info
              const staffDoc = await getDoc(doc(db, 'users', application.assignedStaffId));
              if (staffDoc.exists()) {
                const staffData = staffDoc.data();
                setAssignedStaff({
                  id: staffDoc.id,
                  name: staffData?.name || 'Staff Member',
                  email: staffData?.email || 'staff@pyrosolutions.com'
                });

                // Find or create conversation
                findOrCreateConversation(user.uid, application.assignedStaffId);
              }
            }
          }
        });
      } catch (error) {
        console.error('Error finding assigned staff:', error);
      }
    };

    const findOrCreateConversation = async (clientId: string, staffId: string) => {
      try {
        // Check if conversation already exists
        const conversationsQuery = query(
          collection(db, 'conversations'),
          where('clientId', '==', clientId),
          where('staffId', '==', staffId)
        );
        
        const conversationsSnapshot = onSnapshot(conversationsQuery, async (snapshot) => {
          if (snapshot.empty) {
            // Create new conversation
            const newConversation = await addDoc(collection(db, 'conversations'), {
              clientId,
              staffId,
              createdAt: serverTimestamp(),
              lastMessageAt: serverTimestamp()
            });
            setConversation({ id: newConversation.id, clientId, staffId });
          } else {
            // Use existing conversation
            const conv = snapshot.docs[0];
            setConversation({
              id: conv.id,
              clientId: conv.data().clientId,
              staffId: conv.data().staffId
            });
          }
        });
      } catch (error) {
        console.error('Error finding conversation:', error);
      }
    };

    findAssignedStaff();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== 'client') {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You need to be logged in as a client to view this page.</p>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  if (!assignedStaff) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ margin: 0, color: '#1C1C1E' }}>Chat</h1>
          <button 
            onClick={handleLogout}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
        
        <div style={{
          backgroundColor: '#fff',
          padding: 48,
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: 16 }}>💬</div>
          <h3 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>
            No Staff Assigned
          </h3>
          <p style={{ margin: 0, color: '#666' }}>
            You don't have a staff member assigned yet. 
            Once you have applications, a staff member will be assigned to help you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0, color: '#1C1C1E' }}>Chat</h1>
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      
      {conversation && (
        <Chat
          conversationId={conversation.id}
          currentUserId={user.uid}
          currentUserName={user.name}
          otherUserId={assignedStaff.id}
          otherUserName={assignedStaff.name}
        />
      )}
    </div>
  );
}
