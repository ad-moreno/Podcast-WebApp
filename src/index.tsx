import {createRoot} from 'react-dom/client';
import '#/styles/globals.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import App from './app/App';
import Home from './app/Home';
import {Routes} from './routes';
import Podcast from './app/Podcast';
import EpisodeTable from './app/Podcast/EpisodeTable';
import Episode from './app/Podcast/Episode';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import NotFound from './app/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000, // Keep the query responses for 24 hrs
    },
  },
});

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {path: Routes.Home, element: <Home />},
      {
        path: Routes.Podcast,
        element: <Podcast />,
        children: [
          {path: Routes.Podcast, element: <EpisodeTable />},
          {path: Routes.Episode, element: <Episode />},
        ],
      },
    ],
  },
]);

dayjs.extend(duration);

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
