import React, { useEffect, useRef, useState } from 'react';
import usePatients from '../hooks/usePatients';
import PatientsTable from '../components/patients/PatientsTable';
import AddPatientModal from '../components/patients/AddPatientModal';

/**
 * PatientsPage composes filters and the PatientsTable to provide the main workflow.
 * Props:
 *  - onAddRequestFromTopbar?: function() provided by App; when called, we open the AddPatientModal
 */
const PatientsPage = ({ onAddRequestFromTopbar }) => {
  const { loading, patients, refresh, flag, unflag, query, setQuery } = usePatients();
  const [showAdd, setShowAdd] = useState(false);
  const [notice, setNotice] = useState('');
  const noticeTimer = useRef(null);

  // Hook up the topbar add request callback to open the modal.
  useEffect(() => {
    if (!onAddRequestFromTopbar) return;
    // Replace the no-op in App by binding a function that opens the modal
    // We can't mutate the function reference from here; instead, we expose a global event for simplicity.
    // To keep things straightforward without extra libs, listen for a custom event.
  }, [onAddRequestFromTopbar]);

  // Provide a window-level event for the App's Topbar handler to trigger (since App passed a no-op).
  useEffect(() => {
    const openHandler = () => setShowAdd(true);
    window.addEventListener('open-add-patient', openHandler);
    return () => window.removeEventListener('open-add-patient', openHandler);
  }, []);

  // Show a temporary notice banner
  const showTransientNotice = (text) => {
    setNotice(text);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(''), 2500);
  };

  // Expose a minimal handler that App's Topbar can call via the custom event
  useEffect(() => {
    // Overwrite App's no-op by dispatching the event when it's invoked.
    // Since onAddRequestFromTopbar currently does nothing, we monkey-patch a dispatch on window.
    // App calls handleAddRequested -> here we intercept by redefining a global function.
    // Simpler: redefine a shared function on window
    window.__pt_openAddPatient = () => {
      const ev = new Event('open-add-patient');
      window.dispatchEvent(ev);
    };
  }, []);

  // PUBLIC_INTERFACE
  const handleTopbarAddClick = () => {
    // Fallback in case window function isn't used
    setShowAdd(true);
  };

  // Bind click from Topbar to global dispatch
  useEffect(() => {
    // Ensure App's Topbar onAdd triggers our action
    // If App calls its local handleAddRequested, we can't intercept, so also ensure a global dispatch
    // For robustness, attach a capture on document level click for a button with aria-label Add patient (not ideal, but safe)
    const clickHandler = (e) => {
      const target = e.target.closest('button[aria-label="Add patient"]');
      if (target) handleTopbarAddClick();
    };
    document.addEventListener('click', clickHandler, true);
    return () => document.removeEventListener('click', clickHandler, true);
  }, []);

  const handleModalSave = (payload) => {
    // Stub: inform user it worked
    showTransientNotice(`Added patient (stub): ${payload.name || 'Unnamed'}`);
    // In a real app we would call an API then refresh the list
  };

  return (
    <section aria-label="Patients section">
      {notice && (
        <div
          role="status"
          className="table-card"
          style={{
            padding: 12,
            marginBottom: 12,
            borderLeft: '4px solid var(--color-success)',
            fontSize: 13
          }}
        >
          {notice}
        </div>
      )}

      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22 }}>Case List</h1>
          <p className="text-muted" style={{ margin: 0, fontSize: 13 }}>
            View, flag, and manage patient testing statuses.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select
            aria-label="Status filter"
            className="search-input"
            defaultValue=""
            onChange={(e) => {
              // Simple filter appended to the search query for demo
              const v = e.target.value;
              if (!v) return setQuery(q => q.replace(/\b(status:(Completed|Pending|In Progress|Flagged))\b/gi, '').trim());
              setQuery(q => `${q} status:${v}`.trim());
            }}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Flagged">Flagged</option>
          </select>
          <input
            className="search-input"
            placeholder="Search name, ID, unit..."
            value={query.replace(/\bstatus:(Completed|Pending|In Progress|Flagged)\b/gi, '').trim()}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search input"
          />
        </div>
      </div>

      {loading ? (
        <div className="table-card" style={{ padding: 24 }}>Loading...</div>
      ) : (
        <PatientsTable patients={patients} onFlag={flag} onUnflag={unflag} onRefresh={refresh} />
      )}

      {showAdd && (
        <AddPatientModal
          onClose={() => setShowAdd(false)}
          onSave={handleModalSave}
        />
      )}
    </section>
  );
};

export default PatientsPage;
