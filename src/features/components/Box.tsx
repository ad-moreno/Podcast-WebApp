import classNames from 'classnames';
import {ComponentProps} from 'react';

const Box = ({className, ...props}: ComponentProps<'div'>) => {
  return <div className={classNames('shadow-lg border rounded-lg', className)} {...props} />;
};

export default Box;
