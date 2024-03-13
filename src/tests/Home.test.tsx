import {customRender, screen} from './utils';

import * as reactQuery from '@tanstack/react-query';
import * as hooks from '../features/content/hooks';
import {fakePodcast} from './data';

vi.mock('@tanstack/react-query', () => ({
  useIsFetching: vi.fn(),
}));

vi.mock('#/src/features/content/hooks', () => ({
  usePodcasts: vi.fn(),
}));

describe('Home Tests', () => {
  it('should display podcast data', () => {
    vi.spyOn(hooks, 'usePodcasts').mockReturnValue([fakePodcast]);
    vi.spyOn(reactQuery, 'useIsFetching').mockReturnValue(0);

    customRender();

    expect(screen.getByText(fakePodcast.title.label)).toBeInTheDocument();
    expect(screen.getByText(fakePodcast['im:artist'].label)).toBeInTheDocument();
  });
});
