import {PodcastEpisodesSchema, PodcastsSchema} from './schemas';

export const getPodcasts = async () => {
  const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
  const result = PodcastsSchema.safeParse(await response.json());
  if (!result.success) {
    console.error(result.error);
    return null;
  }
  return result.data.feed.entry;
};

export const getPodcastEpisodes = async (id: string) => {
  const targetUrl = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`;
  const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
  const json = await response.json();
  const result = PodcastEpisodesSchema.safeParse(JSON.parse(json.contents));
  if (!result.success) {
    console.error(result.error);
    return null;
  }
  const filteredEpisodes = result.data.results.filter(episode => episode.wrapperType === 'podcastEpisode');
  return filteredEpisodes;
};
