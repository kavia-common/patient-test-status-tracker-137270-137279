import React, { useState } from 'react';

/**
 * Simple modal dialog to add a new patient (stubbed).
 * Provides minimal form fields and returns the form data through onSave.
 * - onClose: function() closes the modal
 * - onSave: function(formData) called when user submits (stubbed to caller)
 */
const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.35)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalStyle = {
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  borderRadius: 'var(--radius-md)',
  border: 'var(--border)',
  boxShadow: 'var(--shadow-md)',
  width: 'min(520px, 92vw)',
  maxWidth: '520px',
  padding: '20px'
};

const labelStyle = { display: 'block', fontSize: 13, marginBottom: 6, color: 'var(--color-secondary)' };
const inputStyle = {
  width: '100%',
  border: 'var(--border)',
  background: 'transparent',
  color: 'var(--color-text)',
  padding: '10px',
  borderRadius: 'var(--radius-sm)',
  outline: 'none'
};

// PUBLIC_INTERFACE
function AddPatientModal({ onClose, onSave }) {
  /** Modal to add a patient; returns form values through onSave or closes via onClose. */
  const [name, setName] = useState('');
  const [testType, setTestType] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Stubbed behavior: simply return the payload to the parent.
      const payload = {
        name: name.trim(),
        testType: testType.trim()
      };
      await Promise.resolve(); // placeholder for async call
      setMessage('Patient submitted (stub).');
      // Allow a short delay so the user can see feedback
      setTimeout(() => {
        onSave?.(payload);
        onClose?.();
      }, 400);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true" aria-labelledby="add-patient-title">
      <div style={modalStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 id="add-patient-title" style={{ margin: 0, fontSize: 18 }}>Add Patient</h2>
          <button className="button ghost" onClick={onClose} aria-label="Close add patient dialog">
            ✕
          </button>
        </div>
        <p className="text-muted" style={{ marginTop: 0, marginBottom: 16, fontSize: 13 }}>
          Enter basic details to create a new case. This is a stubbed form for demo purposes.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle} htmlFor="patient-name">Patient Name</label>
            <input
              id="patient-name"
              style={inputStyle}
              placeholder="e.g., Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle} htmlFor="patient-test">Test Type</label>
            <input
              id="patient-test"
              style={inputStyle}
              placeholder="e.g., CBC"
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
            />
          </div>

          {message && (
            <div className="text-muted" role="status" style={{ marginBottom: 12, fontSize: 13 }}>
              {message}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="button" className="button ghost" onClick={onClose} aria-label="Cancel add">
              Cancel
            </button>
            <button type="submit" className="button" disabled={submitting} aria-label="Save new patient">
              {submitting ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPatientModal;
