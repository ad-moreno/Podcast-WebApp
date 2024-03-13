import classNames from 'classnames';
import {ComponentProps, useId, useMemo} from 'react';
import {generateRandomNumber} from '../util/random';

type Props = ComponentProps<'div'> & {
  size: number;
  barClassName?: string;
};

const Placeholder = ({className, size, barClassName, ...props}: Props) => {
  const id = useId();
  const placeholders = useMemo(
    () =>
      new Array(size).fill(null).map((_, idx) => {
        const width = `${generateRandomNumber(30, 100)}%`;
        const dark = generateRandomNumber(0, 4) === 0;
        return (
          <div
            key={`placeholder-${id}-${idx}`}
            className={classNames('h-2 rounded-full', dark ? 'bg-gray-300' : 'bg-gray-200', barClassName)}
            data-testid="placeholder"
            style={{width}}
          />
        );
      }),
    [barClassName, id, size]
  );
  return (
    <div className={classNames('flex flex-col gap-y-2 w-full animate-pulse', className)} {...props}>
      {placeholders}
    </div>
  );
};

export default Placeholder;
