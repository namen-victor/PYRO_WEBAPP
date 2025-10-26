"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange, logout, type User } from '@/lib/auth';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { notifyApplicationUpdate } from '@/lib/notifications';

interface Application {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  appliedDate: Date;
  notes?: string;
  salary?: string;
  location?: string;
  jobUrl?: string;
  assignedStaffId: string;
}

export default function StaffApplicationsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [updating, setUpdating] = useState<string | null>(null);

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
      collection(db, 'applications'),
      where('assignedStaffId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const apps: Application[] = [];
      
      for (const docSnapshot of snapshot.docs) {
        const data = docSnapshot.data();
        
        // Get client information
        const clientDoc = await getDoc(doc(db, 'users', data.clientId));
        const clientData = clientDoc.exists() ? clientDoc.data() : null;
        
        apps.push({
          id: docSnapshot.id,
          clientId: data.clientId,
          clientName: clientData?.name || 'Unknown Client',
          clientEmail: clientData?.email || 'unknown@email.com',
          company: data.company,
          position: data.position,
          status: data.status,
          appliedDate: data.appliedDate?.toDate() || new Date(),
          notes: data.notes,
          salary: data.salary,
          location: data.location,
          jobUrl: data.jobUrl,
          assignedStaffId: data.assignedStaffId
        });
      }
      
      // Sort by appliedDate in JavaScript instead of Firestore
      apps.sort((a, b) => b.appliedDate.getTime() - a.appliedDate.getTime());
      setApplications(apps);
    });

    return unsubscribe;
  }, [user]);

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    setUpdating(applicationId);
    try {
      // Get application data first
      const applicationDoc = await getDoc(doc(db, 'applications', applicationId));
      if (!applicationDoc.exists()) {
        throw new Error('Application not found');
      }
      
      const applicationData = applicationDoc.data();
      
      // Update application status
      await updateDoc(doc(db, 'applications', applicationId), {
        status: newStatus,
        updatedAt: new Date()
      });
      
      // Get client data for notifications
      const clientDoc = await getDoc(doc(db, 'users', applicationData.clientId));
      if (clientDoc.exists()) {
        const clientData = clientDoc.data();
        
        // Send notifications
        await notifyApplicationUpdate(
          applicationData.clientId,
          applicationData.company,
          applicationData.position,
          newStatus,
          clientData.email,
          clientData.whatsappConsent || false
        );
      }
    } catch (error) {
      console.error('Error updating application:', error);
      alert('Failed to update application status');
    } finally {
      setUpdating(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return { bg: '#fff3cd', color: '#856404', text: 'Applied' };
      case 'interview': return { bg: '#d1ecf1', color: '#0c5460', text: 'Interview' };
      case 'offer': return { bg: '#d4edda', color: '#155724', text: 'Offer' };
      case 'rejected': return { bg: '#f8d7da', color: '#721c24', text: 'Rejected' };
      default: return { bg: '#f8f9fa', color: '#6c757d', text: 'Unknown' };
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0, color: '#1C1C1E' }}>Assigned Applications</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: '14px', color: '#666' }}>
            {applications.length} application{applications.length !== 1 ? 's' : ''} assigned to you
          </div>
          <button 
            onClick={async () => {
              try {
                await logout();
                router.replace('/login');
              } catch (error) {
                console.error('Logout error:', error);
              }
            }}
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

      {applications.length === 0 ? (
        <div style={{
          backgroundColor: '#fff',
          padding: 48,
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: 16 }}>📋</div>
          <h3 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>
            No applications assigned
          </h3>
          <p style={{ margin: 0, color: '#666' }}>
            You don't have any applications assigned to you yet. 
            Admins will assign applications to you as they're created.
          </p>
        </div>
      ) : (
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Client</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Company</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Position</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Applied Date</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => {
                const statusStyle = getStatusColor(app.status);
                return (
                  <tr 
                    key={app.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                      borderBottom: '1px solid #dee2e6'
                    }}
                  >
                    <td style={{ padding: '16px' }}>
                      <div>
                        <div style={{ fontWeight: 500, color: '#1C1C1E' }}>{app.clientName}</div>
                        <div style={{ fontSize: '14px', color: '#666' }}>{app.clientEmail}</div>
                      </div>
                    </td>
                    <td style={{ padding: '16px', color: '#1C1C1E' }}>
                      {app.jobUrl ? (
                        <a 
                          href={app.jobUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: '#007bff', textDecoration: 'none' }}
                        >
                          {app.company}
                        </a>
                      ) : (
                        app.company
                      )}
                    </td>
                    <td style={{ padding: '16px', color: '#1C1C1E' }}>{app.position}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color
                      }}>
                        {statusStyle.text}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: '#666' }}>
                      {app.appliedDate.toLocaleDateString()}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusUpdate(app.id, e.target.value)}
                        disabled={updating === app.id}
                        style={{
                          padding: '6px 12px',
                          border: '1px solid #dee2e6',
                          borderRadius: '4px',
                          fontSize: '14px',
                          backgroundColor: '#fff',
                          cursor: updating === app.id ? 'not-allowed' : 'pointer'
                        }}
                      >
                        <option value="applied">Applied</option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      {updating === app.id && (
                        <span style={{ marginLeft: 8, fontSize: '12px', color: '#666' }}>
                          Updating...
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
