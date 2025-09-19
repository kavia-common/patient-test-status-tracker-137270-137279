import React from 'react';
import StatusBadge from '../common/StatusBadge';

/**
 * Table of patients with testing status and actions.
 * Props:
 *  - patients: array of patient objects
 *  - onFlag: function(patientId)
 *  - onUnflag: function(patientId)
 *  - onRefresh: function()
 */
const PatientsTable = ({ patients, onFlag, onUnflag, onRefresh }) => {
  return (
    <div className="table-card" role="region" aria-label="Patients table">
      <div className="table-header">
        <div>
          <strong>Patients</strong>
          <div className="text-muted" style={{ fontSize: 12 }}>
            {patients.length} total
          </div>
        </div>
        <div className="row-actions">
          <button className="button ghost" onClick={onRefresh} aria-label="Refresh patients">↻ Refresh</button>
        </div>
      </div>
      <table className="table" role="table">
        <thead>
          <tr role="row">
            <th role="columnheader">Patient</th>
            <th role="columnheader">ID</th>
            <th role="columnheader">Age</th>
            <th role="columnheader">Test</th>
            <th role="columnheader">Status</th>
            <th role="columnheader">Last Updated</th>
            <th role="columnheader" style={{ width: 140 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id} role="row">
              <td role="cell">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600 }}>{p.name}</span>
                  <span className="text-muted" style={{ fontSize: 12 }}>{p.unit || '—'}</span>
                </div>
              </td>
              <td role="cell">{p.id}</td>
              <td role="cell">{p.age}</td>
              <td role="cell">{p.testType}</td>
              <td role="cell"><StatusBadge status={p.status} /></td>
              <td role="cell">{p.updatedAt}</td>
              <td role="cell">
                <div className="row-actions">
                  {p.status === 'Flagged' ? (
                    <button className="button ghost" onClick={() => onUnflag(p.id)}>Unflag</button>
                  ) : (
                    <button className="button" onClick={() => onFlag(p.id)}>Flag</button>
                  )}
                  <button className="button ghost">Details</button>
                </div>
              </td>
            </tr>
          ))}
          {patients.length === 0 && (
            <tr>
              <td colSpan="7" className="text-muted" style={{ textAlign: 'center', padding: 24 }}>
                No patients to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsTable;
