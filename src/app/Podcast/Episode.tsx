import Box from '#/features/components/Box';
import Placeholder from '#/features/components/Placeholder';
import {USE_EPISODES_QUERY_KEY, usePodcastEpisode} from '#/features/content/hooks';
import {useIsFetching} from '@tanstack/react-query';
import classNames from 'classnames';
import {ComponentProps} from 'react';
import {useParams} from 'react-router-dom';

const Episode = ({className, ...props}: ComponentProps<'div'>) => {
  const {podcastId, episodeId} = useParams<{podcastId: string; episodeId: string}>();
  if (!podcastId || !episodeId) throw new Error('Params podcastId or episodeId not found');

  const episode = usePodcastEpisode(podcastId, episodeId);
  const loading = useIsFetching({queryKey: [USE_EPISODES_QUERY_KEY]}) > 0;

  if (loading) {
    return (
      <Box className={classNames('w-full h-fit p-8', className)} {...props}>
        <Placeholder size={15} className="gap-y-4" barClassName="h-4" />
      </Box>
    );
  }
  if (!episode) {
    return (
      <Box className={classNames('w-full p-6 text-center text-2xl h-fit', className)} {...props}>
        Episode not found
      </Box>
    );
  }
  return (
    <Box className={classNames('flex w-full flex-col gap-y-4 p-8 h-fit', className)} {...props}>
      <div className="text-3xl font-semibold">{episode.trackName}</div>
      {!!episode.description && (
        <div className="flex flex-col gap-y-2">
          {episode.description.split('\n').map((text, idx) => (
            <p
              key={`episode-${episode.trackId}-paragraph-${idx}`}
              dangerouslySetInnerHTML={
                /** Allow to receive HTML code as description */
                {__html: text}
              }
            />
          ))}
        </div>
      )}
      {!!episode.episodeUrl && (
        <audio controls className="mt-4 w-full">
          <source src={episode.episodeUrl} />
          Your browser does not support the audio element.
        </audio>
      )}
    </Box>
  );
};

export default Episode;
