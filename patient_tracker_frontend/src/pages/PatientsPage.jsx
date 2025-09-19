import React from 'react';
import usePatients from '../hooks/usePatients';
import PatientsTable from '../components/patients/PatientsTable';

/**
 * PatientsPage composes filters and the PatientsTable to provide the main workflow.
 */
const PatientsPage = () => {
  const { loading, patients, refresh, flag, unflag, query, setQuery } = usePatients();

  return (
    <section aria-label="Patients section">
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
    </section>
  );
};

export default PatientsPage;
