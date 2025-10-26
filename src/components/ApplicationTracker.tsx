"use client";
import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Application {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  appliedDate: Date;
  notes?: string;
  salary?: string;
  location?: string;
  jobUrl?: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
}

interface ApplicationTrackerProps {
  userId: string;
}

export function ApplicationTracker({ userId }: ApplicationTrackerProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'applied' | 'interview' | 'offer' | 'rejected'>('all');

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, 'applications'),
      where('clientId', '==', userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps: Application[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        apps.push({
          id: doc.id,
          company: data.company,
          position: data.position,
          status: data.status,
          appliedDate: data.appliedDate?.toDate() || new Date(),
          notes: data.notes,
          salary: data.salary,
          location: data.location,
          jobUrl: data.jobUrl,
          assignedStaffId: data.assignedStaffId,
          assignedStaffName: data.assignedStaffName
        });
      });
      
      // Sort by appliedDate in JavaScript instead of Firestore
      apps.sort((a, b) => b.appliedDate.getTime() - a.appliedDate.getTime());
      setApplications(apps);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  const filteredApplications = applications.filter(app => 
    filter === 'all' || app.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return { bg: '#fff3cd', color: '#856404', text: 'Applied' };
      case 'interview': return { bg: '#d1ecf1', color: '#0c5460', text: 'Interview' };
      case 'offer': return { bg: '#d4edda', color: '#155724', text: 'Offer' };
      case 'rejected': return { bg: '#f8d7da', color: '#721c24', text: 'Rejected' };
      default: return { bg: '#f8f9fa', color: '#6c757d', text: 'Unknown' };
    }
  };

  const getStatusCounts = () => {
    return {
      total: applications.length,
      applied: applications.filter(app => app.status === 'applied').length,
      interview: applications.filter(app => app.status === 'interview').length,
      offer: applications.filter(app => app.status === 'offer').length,
      rejected: applications.filter(app => app.status === 'rejected').length
    };
  };

  const counts = getStatusCounts();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 200 
      }}>
        <div>Loading applications...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: 16, 
        marginBottom: 24 
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#1C1C1E' }}>
            {counts.total}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Total</div>
        </div>
        
        <div style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#856404' }}>
            {counts.applied}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Applied</div>
        </div>
        
        <div style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#0c5460' }}>
            {counts.interview}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Interview</div>
        </div>
        
        <div style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#155724' }}>
            {counts.offer}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>Offers</div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ 
          display: 'flex', 
          gap: 8, 
          flexWrap: 'wrap' 
        }}>
          {[
            { key: 'all', label: 'All', count: counts.total },
            { key: 'applied', label: 'Applied', count: counts.applied },
            { key: 'interview', label: 'Interview', count: counts.interview },
            { key: 'offer', label: 'Offers', count: counts.offer },
            { key: 'rejected', label: 'Rejected', count: counts.rejected }
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

      {/* Applications Table */}
      {filteredApplications.length === 0 ? (
        <div style={{
          backgroundColor: '#fff',
          padding: 48,
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: 16 }}>📋</div>
          <h3 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>
            No applications found
          </h3>
          <p style={{ margin: 0, color: '#666' }}>
            {filter === 'all' 
              ? "You haven't applied to any jobs yet. Your staff will add applications for you."
              : `No applications with status "${filter}" found.`
            }
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
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Company</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Position</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Applied Date</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Location</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Salary</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app, index) => {
                const statusStyle = getStatusColor(app.status);
                return (
                  <tr 
                    key={app.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                      borderBottom: '1px solid #dee2e6'
                    }}
                  >
                    <td style={{ padding: '16px', fontWeight: 500 }}>
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
                    <td style={{ padding: '16px', color: '#666' }}>
                      {app.location || 'Not specified'}
                    </td>
                    <td style={{ padding: '16px', color: '#666' }}>
                      {app.salary ? `$${parseInt(app.salary).toLocaleString()}` : 'Not specified'}
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
