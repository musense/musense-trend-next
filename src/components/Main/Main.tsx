import { type ReactNode } from 'react';
import Navbar from '@components/Navbar/Layout';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

function Main({ meta, children }: IMainProps) {
  return (
    <div className='w-full'>
      {meta}
      <div className='mx-auto'>
        <Navbar path={'/'}>
          <main className='relative z-10'>{children}</main>
        </Navbar>
      </div>
    </div>
  );
}

export { Main };
