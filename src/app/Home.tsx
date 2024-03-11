import {usePodcastsQuery} from '#/features/content/hooks';

const Home = () => {
  const podcastsQuery = usePodcastsQuery();
  if (podcastsQuery.isLoading) return null;

  return (
    <main className="p-16 text-5xl">
      {podcastsQuery.data?.map(podcast => (
        <div key={`podcast-${podcast.id.attributes['im:id']}`}>{podcast.title.label}</div>
      ))}
    </main>
  );
};

export default Home;
