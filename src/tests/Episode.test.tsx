import {customRender, screen} from './utils';

import * as reactQuery from '@tanstack/react-query';
import * as hooks from '../features/content/hooks';

import {fakeEpisodes, fakePodcast} from './data';

vi.mock('@tanstack/react-query', () => ({
  useIsFetching: vi.fn(),
}));

vi.mock('#/src/features/content/hooks', () => ({
  usePodcast: vi.fn(),
  usePodcastEpisode: vi.fn(),
}));

describe('Episode Component', () => {
  it('should display placeholders when loading', () => {
    vi.spyOn(reactQuery, 'useIsFetching').mockImplementation(filters =>
      filters?.queryKey?.includes(hooks.USE_PODCASTS_QUERY_KEY) ? 0 : 1
    );
    vi.spyOn(hooks, 'usePodcast').mockReturnValue(fakePodcast);

    const episode = fakeEpisodes[0];
    vi.spyOn(hooks, 'usePodcastEpisode').mockReturnValue(episode);

    customRender({initialEntries: ['/podcast/123/episode/456']});

    const placeholders = screen.getAllByTestId('placeholder');
    expect(placeholders.length).toBeGreaterThan(0);
  });

  it('should render correctly', () => {
    vi.spyOn(reactQuery, 'useIsFetching').mockReturnValue(0);
    vi.spyOn(hooks, 'usePodcast').mockReturnValue(fakePodcast);

    const episode = fakeEpisodes[0];
    vi.spyOn(hooks, 'usePodcastEpisode').mockReturnValue(episode);

    customRender({initialEntries: ['/podcast/123/episode/456']});

    expect(screen.getByText(episode.trackName)).toBeInTheDocument();
    if (episode.description) expect(screen.getByText(episode.description)).toBeInTheDocument();
    if (episode.trackViewUrl) expect(screen.getByText(episode.trackViewUrl)).toBeInTheDocument();
  });
});
