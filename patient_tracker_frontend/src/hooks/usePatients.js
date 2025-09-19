import { useCallback, useEffect, useMemo, useState } from 'react';
import { getPatients, flagPatient, unflagPatient } from '../services/api';

/**
 * Hook to load and manage patients list with actions and filtering.
 */
// PUBLIC_INTERFACE
export default function usePatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPatients();
      setPatients(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const onFlag = useCallback(async (id) => {
    await flagPatient(id);
    setPatients(prev => prev.map(p => (p.id === id ? { ...p, status: 'Flagged' } : p)));
  }, []);

  const onUnflag = useCallback(async (id) => {
    await unflagPatient(id);
    setPatients(prev => prev.map(p => (p.id === id ? { ...p, status: 'Pending' } : p)));
  }, []);

  const filtered = useMemo(() => {
    if (!query) return patients;
    const q = query.toLowerCase();
    return patients.filter(p =>
      `${p.name} ${p.id} ${p.unit ?? ''} ${p.testType ?? ''}`.toLowerCase().includes(q)
    );
  }, [patients, query]);

  return {
    loading,
    patients: filtered,
    refresh: load,
    flag: onFlag,
    unflag: onUnflag,
    query,
    setQuery
  };
}
