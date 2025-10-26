"use client";
import { useState } from 'react';

interface CSVUploadProps {
  onUpload: (data: any[]) => void;
  onError: (error: string) => void;
  disabled?: boolean;
  acceptedColumns?: string[];
}

export function CSVUpload({ 
  onUpload, 
  onError, 
  disabled = false,
  acceptedColumns = ['clientEmail', 'company', 'position', 'status', 'assignedStaffEmail']
}: CSVUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled || processing) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        processFile(file);
      } else {
        onError('Please upload a CSV file only.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled || processing) return;
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        processFile(file);
      } else {
        onError('Please upload a CSV file only.');
      }
    }
  };

  const processFile = async (file: File) => {
    setProcessing(true);
    
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        onError('CSV file must have at least a header row and one data row.');
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        return row;
      });

      // Validate required columns
      const missingColumns = acceptedColumns.filter(col => 
        !headers.includes(col.toLowerCase())
      );
      
      if (missingColumns.length > 0) {
        onError(`Missing required columns: ${missingColumns.join(', ')}`);
        return;
      }

      // Validate data
      const errors: string[] = [];
      data.forEach((row, index) => {
        if (!row.clientemail) {
          errors.push(`Row ${index + 2}: Client email is required`);
        }
        if (!row.company) {
          errors.push(`Row ${index + 2}: Company is required`);
        }
        if (!row.position) {
          errors.push(`Row ${index + 2}: Position is required`);
        }
        if (row.status && !['applied', 'interview', 'offer', 'rejected'].includes(row.status.toLowerCase())) {
          errors.push(`Row ${index + 2}: Invalid status. Must be: applied, interview, offer, rejected`);
        }
      });

      if (errors.length > 0) {
        onError(`Validation errors:\n${errors.join('\n')}`);
        return;
      }

      onUpload(data);
    } catch (error) {
      onError('Failed to process CSV file. Please check the format.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ 
        display: 'block', 
        fontWeight: 600, 
        color: '#1C1C1E', 
        marginBottom: 8,
        fontSize: '14px'
      }}>
        Upload Applications CSV
      </label>
      
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragActive ? '#007bff' : '#dee2e6'}`,
          borderRadius: '8px',
          padding: '32px',
          textAlign: 'center',
          backgroundColor: dragActive ? '#f8f9fa' : '#fff',
          cursor: disabled || processing ? 'not-allowed' : 'pointer',
          opacity: disabled || processing ? 0.6 : 1,
          transition: 'all 0.2s'
        }}
      >
        {processing ? (
          <div>
            <div style={{ 
              width: 48, 
              height: 48, 
              border: '3px solid #007bff', 
              borderTop: '3px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px'
            }}></div>
            <h3 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>
              Processing CSV...
            </h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
              Please wait while we validate your data
            </p>
          </div>
        ) : (
          <div>
            <div style={{
              width: 48,
              height: 48,
              backgroundColor: '#f8f9fa',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '24px'
            }}>
              📊
            </div>
            <h3 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>
              Upload Applications CSV
            </h3>
            <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
              Drag and drop your CSV file here, or click to browse
            </p>
            
            <input
              type="file"
              accept=".csv"
              onChange={handleChange}
              disabled={disabled || processing}
              style={{ display: 'none' }}
              id="csv-upload"
            />
            <label
              htmlFor="csv-upload"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '6px',
                cursor: disabled || processing ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              Choose CSV File
            </label>
          </div>
        )}
      </div>
      
      <div style={{ marginTop: 16, fontSize: '12px', color: '#666' }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 600 }}>Required columns:</p>
        <ul style={{ margin: 0, paddingLeft: 16 }}>
          <li><strong>clientEmail</strong> - Client's email address</li>
          <li><strong>company</strong> - Company name</li>
          <li><strong>position</strong> - Job position</li>
          <li><strong>status</strong> - Application status (applied, interview, offer, rejected)</li>
          <li><strong>assignedStaffEmail</strong> - Staff member's email (optional)</li>
        </ul>
        <p style={{ margin: '8px 0 0 0' }}>
          Maximum file size: 10MB. Only CSV files are accepted.
        </p>
      </div>
    </div>
  );
}
