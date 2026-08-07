import { RequireAuth } from '@/shared/auth';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'jotai';
import './App.css';
import AppLayout from './layouts/AppLayout';
import { login } from './modules/_login/routes';
import { profile } from './modules/_profile/routes';
import { registration } from './modules/_registration/routes';
import { reports } from './modules/_reports/routes';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          {login()}
          {registration()}

          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              {profile()}
              {reports()}
              <Route path="/" element={<Navigate to="/reports" replace />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;