# Patient Tracker Frontend (Soft Mono)

A minimalist React app for nurses to view, flag, and manage patient cases and testing statuses.

## Features
- Soft Mono minimalist UI with sidebar, topbar, and patient table
- Status badges (Pending, In Progress, Completed, Flagged)
- Flag/Unflag actions on patients
- Search and basic status filtering
- REST API integration with stub fallback when backend is unavailable

## Quick Start
- npm install
- npm start
- Open http://localhost:3000

## Environment Variables
Create a .env file at project root with:
- REACT_APP_PATIENTS_API: Base URL for patients backend (e.g., https://backend.example.com/api)

When unset, the app uses local stub data until the backend is ready.

## Project Structure
- src/components/layout: Sidebar, Topbar
- src/components/patients: PatientsTable
- src/pages: PatientsPage (main screen)
- src/services: API client with stub fallback
- src/hooks: usePatients state management
- src/styles: theme, layout, table CSS

## Notes
- This app avoids heavy UI frameworks to keep it lightweight and maintainable.
- Accessibility: uses ARIA roles/labels for table and layout regions.
