import Box from '#/features/components/Box';
import {USE_PODCASTS_QUERY_KEY, usePodcast} from '#/features/content/hooks';
import {findClosestHeightImage} from '#/features/util/image';
import {useIsFetching} from '@tanstack/react-query';
import classNames from 'classnames';
import {ComponentProps} from 'react';
import {useParams} from 'react-router-dom';
import {Outlet} from 'react-router-dom';

const Podcast = ({className, ...props}: ComponentProps<'div'>) => {
  const {podcastId} = useParams<{podcastId: string}>();
  if (!podcastId) throw new Error('Param podcastId not found');

  const podcast = usePodcast(podcastId);

  // Pick an image which height is 200px+
  const imageSrc = podcast?.['im:image'] ? findClosestHeightImage(podcast['im:image'], 200)?.label : undefined;

  const loading = useIsFetching({queryKey: [USE_PODCASTS_QUERY_KEY]}) > 0;

  if (loading) return null;
  if (!podcast) {
    return (
      <div className={classNames('flex pt-20 justify-center', className)} {...props}>
        <Box className="h-fit w-[50rem] p-6 text-center text-2xl">Podcast not found</Box>
      </div>
    );
  }
  return (
    <div className={classNames('flex flex-row gap-x-24 pt-20 justify-center', className)} {...props}>
      <Box className="flex h-fit w-96 flex-col gap-y-4 p-6">
        {!!imageSrc && (
          <>
            <img className="mx-auto aspect-square size-48 rounded" src={imageSrc} />
            <hr />
          </>
        )}
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{podcast.title.label}</div>
          <div>by {podcast['im:artist'].label}</div>
        </div>
        <hr />
        <div className="flex flex-col text-gray-700">
          <div className="text-lg font-semibold">Description:</div>
          <div className="overflow-hidden text-ellipsis italic">{podcast.summary.label}</div>
        </div>
      </Box>
      <div className="w-[60rem]">
        <Outlet />
      </div>
    </div>
  );
};

export default Podcast;
