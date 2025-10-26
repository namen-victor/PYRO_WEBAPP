"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange, logout, type User } from '@/lib/auth';
import { CSVUpload } from '@/components/CSVUpload';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export default function UploadApplicationsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<{
    success: number;
    errors: string[];
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      if (user && user.role !== 'admin') {
        router.replace('/login');
        return;
      }
      setLoading(false);
    });
    
    return unsubscribe;
  }, [router]);

  const handleCSVUpload = async (data: any[]) => {
    setUploading(true);
    setUploadResults(null);
    
    const errors: string[] = [];
    let successCount = 0;

    try {
      // Get all users to map emails to UIDs
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersMap = new Map();
      usersSnapshot.forEach(doc => {
        const userData = doc.data();
        usersMap.set(userData.email.toLowerCase(), { uid: doc.id, ...userData });
      });

      // Get all staff to map emails to UIDs
      const staffSnapshot = await getDocs(query(collection(db, 'users'), where('role', '==', 'staff')));
      const staffMap = new Map();
      staffSnapshot.forEach(doc => {
        const staffData = doc.data();
        staffMap.set(staffData.email.toLowerCase(), { uid: doc.id, ...staffData });
      });

      // Process each row
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const rowNumber = i + 2; // +2 because CSV is 1-indexed and we skip header

        try {
          // Validate client exists
          const clientEmail = row.clientemail?.toLowerCase();
          if (!clientEmail) {
            errors.push(`Row ${rowNumber}: Client email is required`);
            continue;
          }

          const client = usersMap.get(clientEmail);
          if (!client) {
            errors.push(`Row ${rowNumber}: Client with email ${clientEmail} not found`);
            continue;
          }

          if (client.role !== 'client') {
            errors.push(`Row ${rowNumber}: User ${clientEmail} is not a client`);
            continue;
          }

          // Validate staff assignment
          let assignedStaffId = null;
          if (row.assignedstaffemail) {
            const staffEmail = row.assignedstaffemail.toLowerCase();
            const staff = staffMap.get(staffEmail);
            if (!staff) {
              errors.push(`Row ${rowNumber}: Staff with email ${staffEmail} not found`);
              continue;
            }
            assignedStaffId = staff.uid;
          }

          // Create application document
          const applicationData = {
            clientId: client.uid,
            assignedStaffId: assignedStaffId,
            company: row.company,
            position: row.position,
            status: row.status?.toLowerCase() || 'applied',
            appliedDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            notes: row.notes || '',
            salary: row.salary || '',
            location: row.location || '',
            jobUrl: row.joburl || ''
          };

          await addDoc(collection(db, 'applications'), applicationData);
          successCount++;

        } catch (error) {
          console.error(`Error processing row ${rowNumber}:`, error);
          errors.push(`Row ${rowNumber}: Failed to create application - ${(error as Error).message}`);
        }
      }

      setUploadResults({
        success: successCount,
        errors
      });

    } catch (error) {
      console.error('CSV upload error:', error);
      setUploadResults({
        success: 0,
        errors: [`Upload failed: ${(error as Error).message}`]
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCSVError = (error: string) => {
    setUploadResults({
      success: 0,
      errors: [error]
    });
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

  if (!user || user.role !== 'admin') {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You need to be logged in as an admin to view this page.</p>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>
            Upload Applications
          </h1>
          <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
            Upload a CSV file to create job applications for clients in bulk.
          </p>
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

      <div style={{ 
        backgroundColor: '#fff', 
        padding: 32, 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: 24
      }}>
        <CSVUpload
          onUpload={handleCSVUpload}
          onError={handleCSVError}
          disabled={uploading}
        />
      </div>

      {uploadResults && (
        <div style={{ 
          backgroundColor: '#fff', 
          padding: 24, 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#1C1C1E' }}>
            Upload Results
          </h3>
          
          <div style={{ marginBottom: 16 }}>
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#d4edda',
              color: '#155724',
              borderRadius: '6px',
              fontWeight: 600
            }}>
              ✅ {uploadResults.success} applications created successfully
            </div>
          </div>

          {uploadResults.errors.length > 0 && (
            <div>
              <h4 style={{ margin: '0 0 12px 0', color: '#dc3545' }}>
                Errors ({uploadResults.errors.length})
              </h4>
              <div style={{
                backgroundColor: '#f8d7da',
                border: '1px solid #f5c6cb',
                borderRadius: '6px',
                padding: 16
              }}>
                {uploadResults.errors.map((error, index) => (
                  <div key={index} style={{ 
                    marginBottom: index < uploadResults.errors.length - 1 ? 8 : 0,
                    fontSize: '14px',
                    color: '#721c24'
                  }}>
                    {error}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ 
            marginTop: 16, 
            paddingTop: 16, 
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: 12
          }}>
            <button
              onClick={() => setUploadResults(null)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear Results
            </button>
            <a
              href="/admin/clients"
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                display: 'inline-block'
              }}
            >
              View Clients
            </a>
          </div>
        </div>
      )}

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: 24, 
        borderRadius: '8px',
        marginTop: 24
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#1C1C1E' }}>
          CSV Format Example
        </h3>
        <div style={{ 
          backgroundColor: '#fff', 
          padding: 16, 
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '14px',
          overflow: 'auto'
        }}>
          <pre>{`clientEmail,company,position,status,assignedStaffEmail,notes,salary,location,jobUrl
client@pyrosolutions.com,Google,Software Engineer,applied,staff@pyrosolutions.com,Great opportunity,120000,San Francisco,https://careers.google.com/jobs
activeclient@pyrosolutions.com,Microsoft,Product Manager,interview,staff@pyrosolutions.com,Second round interview,150000,Seattle,https://careers.microsoft.com`}</pre>
        </div>
      </div>
    </div>
  );
}
