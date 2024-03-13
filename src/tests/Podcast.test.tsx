import {customRender, screen} from './utils';

import * as reactQuery from '@tanstack/react-query';
import * as hooks from '../features/content/hooks';

import {fakePodcast} from './data';

vi.mock('@tanstack/react-query', () => ({
  useIsFetching: vi.fn(),
}));

vi.mock('#/src/features/content/hooks', () => ({
  usePodcast: vi.fn(),
  usePodcastEpisodes: vi.fn(),
}));

describe('EpisodeTable Tests', () => {
  it('should display podcast data', () => {
    vi.spyOn(reactQuery, 'useIsFetching').mockReturnValue(0);
    vi.spyOn(hooks, 'usePodcast').mockReturnValue(fakePodcast);
    vi.spyOn(hooks, 'usePodcastEpisodes').mockReturnValue([]);

    customRender({initialEntries: ['/podcast/123']});

    expect(screen.getByText(fakePodcast.title.label)).toBeInTheDocument();
    expect(screen.getByText(fakePodcast.summary.label)).toBeInTheDocument();
  });
});
