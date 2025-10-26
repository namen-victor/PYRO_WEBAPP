"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange, logout, type User } from '@/lib/auth';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Notification {
  id: string;
  userId: string;
  type: 'email' | 'whatsapp' | 'in_app';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'sent' | 'failed';
  read: boolean;
  createdAt: Date;
  metadata?: any;
}

export default function NotificationsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'email' | 'whatsapp' | 'in_app'>('all');

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      if (!user) {
        router.replace('/login');
        return;
      }
      setLoading(false);
    });
    
    return unsubscribe;
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs: Notification[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        notifs.push({
          id: doc.id,
          userId: data.userId,
          type: data.type,
          title: data.title,
          message: data.message,
          priority: data.priority,
          status: data.status,
          read: data.read || false,
          createdAt: data.createdAt?.toDate() || new Date(),
          metadata: data.metadata
        });
      });
      
      // Sort by createdAt in JavaScript instead of Firestore
      notifs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setNotifications(notifs);
    });

    return unsubscribe;
  }, [user]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await updateDoc(doc(db, 'notifications', notificationId), {
        read: true,
        readAt: new Date()
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      const updatePromises = unreadNotifications.map(notif =>
        updateDoc(doc(db, 'notifications', notif.id), {
          read: true,
          readAt: new Date()
        })
      );
      await Promise.all(updatePromises);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return '📧';
      case 'whatsapp': return '📱';
      case 'in_app': return '🔔';
      default: return '📢';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return '#28a745';
      case 'pending': return '#ffc107';
      case 'failed': return '#dc3545';
      default: return '#6c757d';
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

  if (!user) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You need to be logged in to view this page.</p>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>
            Notifications
          </h1>
          <p style={{ margin: 0, color: '#666' }}>
            {notifications.length} notification{notifications.length !== 1 ? 's' : ''} • {unreadCount} unread
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Mark All Read
            </button>
          )}
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
      </div>

      {/* Filter Buttons */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { key: 'all', label: 'All', count: notifications.length },
            { key: 'unread', label: 'Unread', count: unreadCount },
            { key: 'email', label: 'Email', count: notifications.filter(n => n.type === 'email').length },
            { key: 'whatsapp', label: 'WhatsApp', count: notifications.filter(n => n.type === 'whatsapp').length },
            { key: 'in_app', label: 'In-App', count: notifications.filter(n => n.type === 'in_app').length }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              style={{
                padding: '8px 16px',
                backgroundColor: filter === key ? '#007bff' : '#f8f9fa',
                color: filter === key ? 'white' : '#1C1C1E',
                border: '1px solid #dee2e6',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.2s'
              }}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div style={{
          backgroundColor: '#fff',
          padding: 48,
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: 16 }}>🔔</div>
          <h3 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>
            No notifications found
          </h3>
          <p style={{ margin: 0, color: '#666' }}>
            {filter === 'all' 
              ? "You don't have any notifications yet."
              : `No ${filter} notifications found.`
            }
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => !notif.read && handleMarkAsRead(notif.id)}
              style={{
                backgroundColor: notif.read ? '#fff' : '#f8f9fa',
                border: notif.read ? '1px solid #dee2e6' : '1px solid #007bff',
                borderRadius: '8px',
                padding: 16,
                cursor: notif.read ? 'default' : 'pointer',
                transition: 'all 0.2s',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (!notif.read) {
                  e.currentTarget.style.backgroundColor = '#e3f2fd';
                }
              }}
              onMouseLeave={(e) => {
                if (!notif.read) {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                }
              }}
            >
              {!notif.read && (
                <div style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 8,
                  height: 8,
                  backgroundColor: '#007bff',
                  borderRadius: '50%'
                }} />
              )}
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ fontSize: '20px' }}>
                  {getTypeIcon(notif.type)}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <h4 style={{ margin: 0, color: '#1C1C1E', fontSize: '16px' }}>
                      {notif.title}
                    </h4>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '10px',
                      fontSize: '10px',
                      fontWeight: 600,
                      backgroundColor: getPriorityColor(notif.priority),
                      color: 'white'
                    }}>
                      {notif.priority.toUpperCase()}
                    </span>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '10px',
                      fontSize: '10px',
                      fontWeight: 600,
                      backgroundColor: getStatusColor(notif.status),
                      color: 'white'
                    }}>
                      {notif.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <p style={{ 
                    margin: '0 0 8px 0', 
                    color: '#666', 
                    fontSize: '14px',
                    lineHeight: 1.4
                  }}>
                    {notif.message}
                  </p>
                  
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#999',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16
                  }}>
                    <span>{notif.createdAt.toLocaleDateString()} at {notif.createdAt.toLocaleTimeString()}</span>
                    <span>•</span>
                    <span>{notif.type.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
