import Home from '#/app/Home';
import Podcast from '#/app/Podcast';
import Episode from '#/app/Podcast/Episode';
import EpisodeTable from '#/app/Podcast/EpisodeTable';
import {Routes} from '#/routes';
import {render} from '@testing-library/react';
import {RouterProvider, createMemoryRouter} from 'react-router-dom';

const routes = [
  {path: Routes.Home, element: <Home />},
  {
    path: Routes.Podcast,
    element: <Podcast />,
    children: [
      {path: Routes.Podcast, element: <EpisodeTable />},
      {path: Routes.Episode, element: <Episode />},
    ],
  },
];

export const customRender = ({initialEntries = ['/']} = {}) => {
  const router = createMemoryRouter(routes, {initialEntries});
  return render(<RouterProvider router={router} />);
};

export * from '@testing-library/react';
