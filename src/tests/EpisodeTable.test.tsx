import {customRender, screen} from './utils';

import * as reactQuery from '@tanstack/react-query';
import * as hooks from '../features/content/hooks';

import {fakeEpisodes, fakePodcast} from './data';

vi.mock('@tanstack/react-query', () => ({
  useIsFetching: vi.fn(),
}));

vi.mock('#/src/features/content/hooks', () => ({
  usePodcast: vi.fn(),
  usePodcastEpisodes: vi.fn(),
}));

describe('EpisodeTable Tests', () => {
  it('should display placeholders when loading', () => {
    vi.spyOn(reactQuery, 'useIsFetching').mockImplementation(filters =>
      filters?.queryKey?.includes(hooks.USE_PODCASTS_QUERY_KEY) ? 0 : 1
    );
    vi.spyOn(hooks, 'usePodcast').mockReturnValue(fakePodcast);
    vi.spyOn(hooks, 'usePodcastEpisodes').mockReturnValue(fakeEpisodes);

    customRender({initialEntries: ['/podcast/123']});

    const placeholders = screen.getAllByTestId('placeholder');
    expect(placeholders.length).toBeGreaterThan(0);
  });

  it('displays episodes once loaded', () => {
    vi.spyOn(reactQuery, 'useIsFetching').mockReturnValue(0);
    vi.spyOn(hooks, 'usePodcast').mockReturnValue(fakePodcast);
    vi.spyOn(hooks, 'usePodcastEpisodes').mockReturnValue(fakeEpisodes);

    customRender({initialEntries: ['/podcast/123']});

    expect(screen.getByText(fakeEpisodes[0].trackName)).toBeInTheDocument();
    expect(screen.getByText(fakeEpisodes[1].trackName)).toBeInTheDocument();
    expect(screen.getByText('00:30')).toBeInTheDocument();
    expect(screen.getByText('00:40')).toBeInTheDocument();
  });
});
