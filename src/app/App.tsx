import Navbar from '#/features/components/Navbar';
import classNames from 'classnames';
import {ComponentProps} from 'react';
import {Outlet} from 'react-router-dom';

const App = ({className, ...props}: ComponentProps<'div'>) => {
  return (
    <div className={classNames('flex flex-col', className)} {...props}>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
