import { registration } from '@/modules/_registration';
import { AuthProvider } from '@/shared/supabase/authProvider';
import { ProtectedRoute } from '@/shared/supabase/components/ProtectedRoute';
import { UIExample } from '@/shared/ui/UIExample';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { login } from './modules/_login';
import { profile } from './modules/_profile';
import { reports } from './modules/_reports';
import { AppLayout } from '@/shared/layout/AppLayout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/example"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <UIExample />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          {login()}
          {registration()}
          {profile()}
          {reports()}

          {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} /> */}

          <Route path="/" element={<Navigate to="/example" replace />} />
          <Route path="*" element={<div>404 - Страница не найдена</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
