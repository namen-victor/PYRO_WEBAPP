"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange, logout, type User } from '@/lib/auth';
import { Chat } from '@/components/Chat';
import { collection, query, where, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Conversation {
  id: string;
  clientId: string;
  staffId: string;
  clientName: string;
  clientEmail: string;
  lastMessageAt: Date;
}

export default function StaffChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      if (user && user.role !== 'staff') {
        router.replace('/login');
        return;
      }
      setLoading(false);
    });
    
    return unsubscribe;
  }, [router]);

  useEffect(() => {
    if (!user || user.role !== 'staff') return;

    const q = query(
      collection(db, 'conversations'),
      where('staffId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const convs: Conversation[] = [];
      
      for (const docSnapshot of snapshot.docs) {
        const data = docSnapshot.data();
        
        // Get client information
        const clientDoc = await getDoc(doc(db, 'users', data.clientId));
        const clientData = clientDoc.exists() ? clientDoc.data() : null;
        
        convs.push({
          id: docSnapshot.id,
          clientId: data.clientId,
          staffId: data.staffId,
          clientName: clientData?.name || 'Unknown Client',
          clientEmail: clientData?.email || 'unknown@email.com',
          lastMessageAt: data.lastMessageAt?.toDate() || new Date()
        });
      }
      
      // Sort by last message time
      convs.sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime());
      setConversations(convs);
      
      // Select first conversation if none selected
      if (convs.length > 0 && !selectedConversation) {
        setSelectedConversation(convs[0]);
      }
    });

    return unsubscribe;
  }, [user, selectedConversation]);

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

  if (!user || user.role !== 'staff') {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You need to be logged in as staff to view this page.</p>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 120px)', gap: 16 }}>
      {/* Conversations List */}
      <div style={{ 
        width: 300, 
        backgroundColor: '#fff', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ 
          padding: '20px', 
          borderBottom: '1px solid #dee2e6',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px 8px 0 0'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>
            Conversations
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {conversations.length === 0 ? (
            <div style={{ 
              padding: 32, 
              textAlign: 'center', 
              color: '#666' 
            }}>
              <div style={{ fontSize: '24px', marginBottom: 8 }}>💬</div>
              <div>No conversations yet</div>
              <div style={{ fontSize: '14px', marginTop: 4 }}>
                Clients will appear here when they start chatting
              </div>
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #f8f9fa',
                  cursor: 'pointer',
                  backgroundColor: selectedConversation?.id === conv.id ? '#e3f2fd' : 'transparent',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (selectedConversation?.id !== conv.id) {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedConversation?.id !== conv.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ fontWeight: 600, color: '#1C1C1E', marginBottom: 4 }}>
                  {conv.clientName}
                </div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: 4 }}>
                  {conv.clientEmail}
                </div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  Last message: {conv.lastMessageAt.toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {selectedConversation ? (
          <Chat
            conversationId={selectedConversation.id}
            currentUserId={user.uid}
            currentUserName={user.name}
            otherUserId={selectedConversation.clientId}
            otherUserName={selectedConversation.clientName}
          />
        ) : (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ textAlign: 'center', color: '#666' }}>
              <div style={{ fontSize: '48px', marginBottom: 16 }}>💬</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>
                Select a conversation
              </h3>
              <p style={{ margin: 0 }}>
                Choose a client from the list to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
