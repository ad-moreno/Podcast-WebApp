import classNames from 'classnames';
import {ComponentProps} from 'react';
import {PodcastEntry} from '../content/schemas';
import {Link} from 'react-router-dom';
import {buildRoute} from '#/routes';
import Box from './Box';
import {findClosestHeightImage} from '../util/image';

type Props = Omit<ComponentProps<typeof Link>, 'to'> & {
  podcast: PodcastEntry;
};

const PodcastCard = ({className, podcast, ...props}: Props) => {
  // Pick an image which height is 150px+
  const imageSrc = podcast?.['im:image'] ? findClosestHeightImage(podcast['im:image'], 150)?.label : undefined;
  return (
    <Link
      className={classNames('group relative flex items-start w-72 min-w-48', className)}
      to={buildRoute('/podcast/:podcastId', {podcastId: podcast.id.attributes['im:id']})}
      {...props}
    >
      {!!imageSrc && (
        <img className="absolute start-1/2 top-0 aspect-square size-24 -translate-x-1/2 rounded-full" src={imageSrc} />
      )}
      <Box className="mt-12 flex w-full flex-col gap-y-2 p-4 pt-16 transition duration-500 group-hover:shadow-2xl">
        <div className="text-balance font-medium uppercase">{podcast.title.label}</div>
        <div className="text-gray-400">
          Author: <span className="uppercase">{podcast['im:artist'].label}</span>
        </div>
      </Box>
    </Link>
  );
};

export default PodcastCard;
