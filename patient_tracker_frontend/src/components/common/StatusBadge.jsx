import React from 'react';

/**
 * Displays patient testing status with color-coded badge.
 * Accepted values: "Pending", "In Progress", "Completed", "Flagged"
 */
const StatusBadge = ({ status }) => {
  const map = {
    'Completed': 'success',
    'Flagged': 'error',
    'Pending': 'neutral',
    'In Progress': 'neutral'
  };
  const variant = map[status] || 'neutral';
  return <span className={`badge ${variant}`}>{status}</span>;
};

export default StatusBadge;
