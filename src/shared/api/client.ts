import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Поддержка сигналов в Tanstack Query
// queryFn: ({ signal }) => apiGet('/data', undefined, { signal })
