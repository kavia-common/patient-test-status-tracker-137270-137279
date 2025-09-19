import React, { useMemo, useState, useEffect } from 'react';
import './index.css';
import './App.css';
import './styles/theme.css';
import './styles/layout.css';
import './styles/table.css';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import PatientsPage from './pages/PatientsPage';

/**
 * Root App renders the global layout: Sidebar, Topbar, and main content area.
 * Applies Soft Mono minimalist theme and provides a theme toggle.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const onToggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const sidebarItems = useMemo(() => ([
    { id: 'patients', label: 'Patients', icon: '👩‍⚕️' },
    { id: 'flags', label: 'Flags', icon: '⚑' },
    { id: 'reports', label: 'Reports', icon: '📄' }
  ]), []);

  // PUBLIC_INTERFACE
  const handleAddRequested = () => {
    // Dispatch a custom event that PatientsPage listens to for opening the modal
    const ev = new Event('open-add-patient');
    window.dispatchEvent(ev);
  };

  return (
    <div className="app-shell">
      <Sidebar brand="Patient Tracker" items={sidebarItems} />
      <div className="main-area">
        <Topbar onToggleTheme={onToggleTheme} theme={theme} onAdd={handleAddRequested} />
        <main className="content-area" role="main" aria-label="Patient tracker main content">
          <PatientsPage onAddRequestFromTopbar={handleAddRequested} />
        </main>
      </div>
    </div>
  );
}

export default App;
