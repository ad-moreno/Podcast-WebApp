import {useQuery} from '@tanstack/react-query';
import {getPodcastEpisodes, getPodcasts} from './';

const USE_PODCASTS_QUERY_KEY = 'podcasts';

export const usePodcastsQuery = () => {
  const query = useQuery({
    queryKey: [USE_PODCASTS_QUERY_KEY],
    queryFn: getPodcasts,
  });
  return query;
};

const USE_PODCAST_EPISODES_QUERY_KEY = 'podcast';

export const usePodcastEpisodesQuery = (id: string) => {
  const query = useQuery({
    queryKey: [USE_PODCAST_EPISODES_QUERY_KEY, id],
    queryFn: () => getPodcastEpisodes(id),
  });
  return query;
};
