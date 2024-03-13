import PodcastCard from '#/features/components/PodcastCard';
import {USE_PODCASTS_QUERY_KEY, usePodcasts} from '#/features/content/hooks';
import {useIsFetching} from '@tanstack/react-query';
import {useState, useCallback, ChangeEventHandler, useMemo} from 'react';

const Home = () => {
  const podcasts = usePodcasts();

  const [text, setText] = useState('');
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
    setText(e.target.value);
  }, []);

  const filteredPodcasts = useMemo(() => {
    const allPodcasts = podcasts ?? [];
    if (text.length === 0) return allPodcasts;
    const lowerText = text.toLowerCase();
    return allPodcasts.filter(
      podcast =>
        podcast.title.label.toLowerCase().includes(lowerText) ||
        podcast['im:artist'].label.toLowerCase().includes(lowerText)
    );
  }, [podcasts, text]);

  const loading = useIsFetching({queryKey: [USE_PODCASTS_QUERY_KEY]}) > 0;
  if (loading) return null;

  return (
    <div className="flex flex-col gap-y-8 p-4 lg:p-16">
      <div className="flex flex-row items-center justify-center gap-x-4 lg:justify-end">
        <div className="rounded bg-primary px-2 py-1 text-lg text-secondary">{filteredPodcasts.length}</div>
        <input
          type="search"
          className="rounded border border-gray-200 p-2 outline-none"
          placeholder="Filter podcasts..."
          value={text}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-x-6 gap-y-12 lg:justify-start">
        {filteredPodcasts.map(podcast => (
          <PodcastCard key={`podcast-${podcast.id.attributes['im:id']}`} podcast={podcast} />
        ))}
      </div>
    </div>
  );
};

export default Home;
