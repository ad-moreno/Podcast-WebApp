import Box from '#/features/components/Box';
import Placeholder from '#/features/components/Placeholder';
import {USE_EPISODES_QUERY_KEY, usePodcastEpisodes} from '#/features/content/hooks';
import {Routes, buildRoute} from '#/routes';
import {useIsFetching} from '@tanstack/react-query';
import classNames from 'classnames';
import dayjs from 'dayjs';
import {ComponentProps} from 'react';
import {Link, useParams} from 'react-router-dom';

const TABLE_PLACEHOLDER_ITEMS = 20;

const EpisodeTable = ({className, ...props}: ComponentProps<'div'>) => {
  const {podcastId} = useParams<{podcastId: string}>();
  if (!podcastId) throw new Error('podcastId not found');

  const episodes = usePodcastEpisodes(podcastId);
  const loading = useIsFetching({queryKey: [USE_EPISODES_QUERY_KEY]}) > 0;

  return (
    <div className={classNames('flex w-full flex-col gap-y-8', className)} {...props}>
      <Box className="p-4 text-xl font-semibold">
        {loading ? <Placeholder size={2} /> : <span>Episodes: {episodes.length}</span>}
      </Box>
      <Box className="p-4">
        <table className="w-full table-fixed text-start">
          <thead>
            <tr className="border-b-2 p-4">
              <th className="w-auto p-2 text-start">Title</th>
              <th className="w-[15%] p-2 text-start">Date</th>
              <th className="w-[12.5%] p-2 text-start">Duration</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? new Array(TABLE_PLACEHOLDER_ITEMS).fill(null).map((_, idx) => (
                  <tr key={`episode-placeholder-${idx}`} className="border-b even:bg-gray-50">
                    <td className="truncate p-2 pe-8" colSpan={3}>
                      <Placeholder size={2} />
                    </td>
                  </tr>
                ))
              : episodes.map(episode => {
                  const date =
                    episode.releaseDate !== undefined ? dayjs(episode.releaseDate).format('DD/MM/YYYY') : 'N/A';
                  const duration =
                    episode.trackTimeMillis !== undefined
                      ? dayjs.duration(episode.trackTimeMillis).format('HH:mm')
                      : 'N/A';
                  return (
                    <tr key={`episode-${episode.trackId}`} className="border-b even:bg-gray-50 hover:bg-gray-200">
                      <td className="truncate p-2 pe-8">
                        <Link
                          to={buildRoute(Routes.Episode, {podcastId, episodeId: episode.trackId.toString()})}
                          className="text-primary hover:underline"
                        >
                          {episode.trackName}
                        </Link>
                      </td>
                      <td className="p-2">{date}</td>
                      <td className="p-2">{duration}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </Box>
    </div>
  );
};

export default EpisodeTable;
