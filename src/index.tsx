import App from '@/App';
import { ThemeProvider } from '@/shared/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';

const queryClient = new QueryClient();

const container = document.getElementById('root');

if (!container) {
  throw new Error('Не найден корневой элемент');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
