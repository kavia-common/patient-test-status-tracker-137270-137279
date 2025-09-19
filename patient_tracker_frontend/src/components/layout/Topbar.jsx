import React from 'react';

/**
 * Topbar provides search and quick action controls.
 */
const Topbar = ({ onToggleTheme, theme }) => {
  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <input
          type="search"
          placeholder="Search patients..."
          className="search-input"
          aria-label="Search patients"
        />
      </div>
      <div className="actions">
        <button className="button ghost" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <button className="button" aria-label="Add patient">+ Add</button>
      </div>
    </header>
  );
};

export default Topbar;
