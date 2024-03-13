import Box from '#/features/components/Box';
import classNames from 'classnames';
import {ComponentProps} from 'react';

const NotFound = ({className, ...props}: ComponentProps<'div'>) => {
  return (
    <div className={classNames('flex pt-20 justify-center', className)} {...props}>
      <Box className="h-fit w-[50rem] p-6 text-center text-2xl">Page not found</Box>
    </div>
  );
};

export default NotFound;
