import {useQuery} from '@tanstack/react-query';
import {getPodcastEpisodes, getPodcasts} from './';
import {useMemo} from 'react';

export const USE_PODCASTS_QUERY_KEY = 'podcasts';

export const usePodcastsQuery = () => {
  const query = useQuery({
    queryKey: [USE_PODCASTS_QUERY_KEY],
    queryFn: getPodcasts,
  });
  if (query.error) throw query.error;
  return query;
};

export const USE_EPISODES_QUERY_KEY = 'episodes';

export const usePodcastEpisodesQuery = (podcastId: string) => {
  const query = useQuery({
    queryKey: [USE_EPISODES_QUERY_KEY, podcastId],
    queryFn: () => getPodcastEpisodes(podcastId),
  });
  if (query.error) throw query.error;
  return query;
};

export const usePodcast = (podcastId: string) => {
  const podcastsQuery = usePodcastsQuery();
  const podcast = useMemo(
    () => podcastsQuery.data?.find(podcast => podcast.id.attributes['im:id'] === podcastId) ?? null,
    [podcastId, podcastsQuery.data]
  );
  return podcast;
};

export const usePodcastEpisodes = (podcastId: string) => {
  const episodesQuery = usePodcastEpisodesQuery(podcastId);
  const episodes = useMemo(() => episodesQuery.data ?? [], [episodesQuery.data]);
  return episodes;
};

export const usePodcastEpisode = (podcastId: string, episodeId: string) => {
  const episodes = usePodcastEpisodes(podcastId);
  const episode = useMemo(
    () => episodes.find(episode => episode.trackId.toString() === episodeId) ?? null,
    [episodeId, episodes]
  );
  return episode;
};
