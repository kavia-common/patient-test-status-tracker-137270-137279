import React from 'react';

/**
 * Sidebar renders brand and simple navigation links.
 * Minimalist styling, no routing until needed.
 */
const Sidebar = ({ brand, items = [] }) => {
  return (
    <aside className="sidebar" aria-label="Main navigation sidebar">
      <div className="brand">{brand}</div>
      <nav className="nav" role="navigation" aria-label="Primary">
        {items.map(item => (
          <button key={item.id} aria-label={item.label} title={item.label}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div style={{ marginTop: 'auto', fontSize: 12 }} className="text-muted">
        Soft Mono · Minimal
      </div>
    </aside>
  );
};

export default Sidebar;
