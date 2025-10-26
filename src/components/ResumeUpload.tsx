"use client";
import { useState } from 'react';

interface ResumeUploadProps {
  onUpload: (file: File) => void;
  onRemove: () => void;
  currentFile?: File | null;
  disabled?: boolean;
}

export function ResumeUpload({ onUpload, onRemove, currentFile, disabled }: ResumeUploadProps) {
  const [dragActive, setDragActive] = useState(false);

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
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        onUpload(file);
      } else {
        alert('Please upload a PDF file only.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        onUpload(file);
      } else {
        alert('Please upload a PDF file only.');
      }
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
        Resume (PDF only)
      </label>
      
      {currentFile ? (
        <div style={{
          padding: '16px',
          border: '2px solid #28a745',
          borderRadius: '8px',
          backgroundColor: '#d4edda',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              backgroundColor: '#28a745',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 600
            }}>
              PDF
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 500, color: '#155724' }}>
                {currentFile.name}
              </p>
              <p style={{ margin: 0, fontSize: '12px', color: '#155724' }}>
                {(currentFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={onRemove}
            disabled={disabled}
            style={{
              padding: '8px 12px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.6 : 1
            }}
          >
            Remove
          </button>
        </div>
      ) : (
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
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            transition: 'all 0.2s'
          }}
        >
          <div style={{ marginBottom: 16 }}>
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
              📄
            </div>
            <h3 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>
              Upload your resume
            </h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
              Drag and drop your PDF resume here, or click to browse
            </p>
          </div>
          
          <input
            type="file"
            accept=".pdf"
            onChange={handleChange}
            disabled={disabled}
            style={{ display: 'none' }}
            id="resume-upload"
          />
          <label
            htmlFor="resume-upload"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '6px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            Choose File
          </label>
        </div>
      )}
      
      <p style={{ 
        margin: '8px 0 0 0', 
        fontSize: '12px', 
        color: '#666' 
      }}>
        Maximum file size: 10MB. Only PDF files are accepted.
      </p>
    </div>
  );
}
