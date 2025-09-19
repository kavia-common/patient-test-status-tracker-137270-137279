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

  return (
    <div className="app-shell">
      <Sidebar brand="Patient Tracker" items={sidebarItems} />
      <div className="main-area">
        <Topbar onToggleTheme={onToggleTheme} theme={theme} />
        <main className="content-area" role="main" aria-label="Patient tracker main content">
          <PatientsPage />
        </main>
      </div>
    </div>
  );
}

export default App;
