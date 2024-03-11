import {createRoot} from 'react-dom/client';
import '#/styles/globals.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import React from 'react';
import Home from './app/Home';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000, // 24 hrs
    },
  },
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
