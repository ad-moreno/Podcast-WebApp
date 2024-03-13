import classNames from 'classnames';
import {ComponentProps} from 'react';
import {Link} from 'react-router-dom';
import {Routes} from '#/routes';
import {Spinner} from './Icons';
import {useIsFetching} from '@tanstack/react-query';

const Navbar = ({className, ...props}: ComponentProps<'div'>) => {
  const isFetching = useIsFetching() > 0;
  return (
    <div
      className={classNames('flex flex-row justify-between items-center border-b ps-8 pe-12 py-2', className)}
      {...props}
    >
      <Link className="p-4 text-xl font-bold text-primary" to={Routes.Home}>
        PODCASTER
      </Link>
      <div
        className={classNames(
          'flex flex-row gap-x-4 transition duration-500',
          isFetching ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="text-lg">Loading...</div>
        <Spinner />
      </div>
    </div>
  );
};

export default Navbar;
