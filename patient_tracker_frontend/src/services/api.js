const API_BASE = process.env.REACT_APP_PATIENTS_API || '';

/**
 * Internal helper to handle fetch with JSON.
 */
async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API ${res.status}: ${text}`);
    }
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return await res.json();
    }
    return await res.text();
  } catch (err) {
    // Re-throw to allow caller to decide fallback to stubs
    throw err;
  }
}

// PUBLIC_INTERFACE
export async function getPatients() {
  /**
   * Returns list of patients from backend; falls back to stub data on failure.
   */
  try {
    return await request('/patients');
  } catch (_e) {
    // Stub dataset
    return [
      { id: 'PT-1001', name: 'Alex Johnson', age: 58, unit: 'ICU', testType: 'CBC', status: 'Pending', updatedAt: '2025-09-19 09:20' },
      { id: 'PT-1002', name: 'Maria Gomez', age: 41, unit: 'Ward B', testType: 'PCR', status: 'In Progress', updatedAt: '2025-09-19 08:55' },
      { id: 'PT-1003', name: 'David Kim', age: 67, unit: 'Ward A', testType: 'X-Ray', status: 'Completed', updatedAt: '2025-09-18 17:35' },
      { id: 'PT-1004', name: 'Priya Nair', age: 36, unit: 'OPD', testType: 'Blood Sugar', status: 'Flagged', updatedAt: '2025-09-19 07:42' }
    ];
  }
}

// PUBLIC_INTERFACE
export async function flagPatient(patientId) {
  /**
   * Flags a patient case; returns updated patient or status result.
   */
  try {
    return await request(`/patients/${encodeURIComponent(patientId)}/flag`, { method: 'POST' });
  } catch (_e) {
    // Stub action result
    return { id: patientId, status: 'Flagged' };
  }
}

// PUBLIC_INTERFACE
export async function unflagPatient(patientId) {
  /**
   * Removes flag from a patient case; returns updated patient or status result.
   */
  try {
    return await request(`/patients/${encodeURIComponent(patientId)}/unflag`, { method: 'POST' });
  } catch (_e) {
    // Stub action result
    return { id: patientId, status: 'Pending' };
  }
}
