import Logo from './logo';
import Hamburger from './hamburger';
import NavWrapper from './NavWrapper';
import NavBackDrop from './NavBackDrop';
import { useAppContext } from "@store/context";
import { useEffect } from 'react';

export default function HeaderLayout() {
  const { state } = useAppContext();

  useEffect(() => {
    if (!localStorage.getItem('pathname')) {
      localStorage.setItem('pathname', window.location.pathname)
    } else if (window.location.pathname !== localStorage.getItem('pathname')) {
      localStorage.setItem('pathname', window.location.pathname)
    }
  }, []);

  return (
    <header>
      {state.clientWidth <= 768 && <>
        <NavBackDrop />
        <Hamburger />
      </>
      }
      <div className={'navbar-wrapper'}>
        <Logo color={'gray'} />
        <NavWrapper />
      </div>
    </header>
  );
}





