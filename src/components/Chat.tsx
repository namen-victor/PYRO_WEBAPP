"use client";
import { useEffect, useState, useRef } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface ChatProps {
  conversationId: string;
  currentUserId: string;
  currentUserName: string;
  otherUserId: string;
  otherUserName: string;
}

export function Chat({ conversationId, currentUserId, currentUserName, otherUserId, otherUserName }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!conversationId) return;

    const q = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        msgs.push({
          id: doc.id,
          senderId: data.senderId,
          senderName: data.senderName,
          recipientId: data.recipientId,
          content: data.content,
          timestamp: data.timestamp?.toDate() || new Date(),
          read: data.read || false
        });
      });
      setMessages(msgs);
      setLoading(false);
    });

    return unsubscribe;
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId) return;

    try {
      await addDoc(collection(db, 'messages'), {
        conversationId,
        senderId: currentUserId,
        senderName: currentUserName,
        recipientId: otherUserId,
        content: newMessage.trim(),
        timestamp: serverTimestamp(),
        read: false
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 400 
      }}>
        <div>Loading messages...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: 500,
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      backgroundColor: '#fff'
    }}>
      {/* Chat Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #dee2e6',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px 8px 0 0'
      }}>
        <h3 style={{ margin: 0, color: '#1C1C1E' }}>
          Chat with {otherUserName}
        </h3>
        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#666' }}>
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Messages Container */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}>
        {messages.length === 0 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#666',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '24px', marginBottom: 8 }}>💬</div>
              <div>No messages yet</div>
              <div style={{ fontSize: '14px', marginTop: 4 }}>
                Start a conversation with {otherUserName}
              </div>
            </div>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === currentUserId;
            return (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: isOwn ? 'flex-end' : 'flex-start',
                  marginBottom: 8
                }}
              >
                <div style={{
                  maxWidth: '70%',
                  padding: '12px 16px',
                  borderRadius: '18px',
                  backgroundColor: isOwn ? '#007bff' : '#f8f9fa',
                  color: isOwn ? 'white' : '#1C1C1E',
                  wordWrap: 'break-word'
                }}>
                  <div style={{ fontSize: '14px', lineHeight: 1.4 }}>
                    {message.content}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    opacity: 0.7,
                    marginTop: 4,
                    textAlign: isOwn ? 'right' : 'left'
                  }}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} style={{
        padding: '16px 20px',
        borderTop: '1px solid #dee2e6',
        backgroundColor: '#f8f9fa',
        borderRadius: '0 0 8px 8px'
      }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message ${otherUserName}...`}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '1px solid #dee2e6',
              borderRadius: '20px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            style={{
              padding: '12px 20px',
              backgroundColor: newMessage.trim() ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
