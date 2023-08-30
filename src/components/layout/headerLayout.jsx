import Logo from './logo';
import Hamburger from './hamburger';
import NavWrapper from './NavWrapper';
import NavBackDrop from './NavBackDrop';
import { useAppContext } from "@store/context";
import { useEffect, useRef } from 'react';

export default function HeaderLayout() {
  const { state, dispatch } = useAppContext();

  const hamburgerRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem('pathname')) {
      localStorage.setItem('pathname', window.location.pathname)
    } else if (window.location.pathname !== localStorage.getItem('pathname')) {
      localStorage.setItem('pathname', window.location.pathname)
    }
  }, []);

  const unCheck = () => {
    dispatch({ type: 'CLOSE_MENU' })
  }

  function toggleHamburger(e) {
    dispatch({ type: 'TOGGLE_MENU' })
  }

  return (
    <header>
      {state.clientWidth <= 768 && <>
        <NavBackDrop
          active={state.menuOpen}
          unCheck={unCheck}
        />
        <Hamburger
          toggleHamburger={toggleHamburger}
          unCheck={unCheck}
        />
      </>
      }
      <div className={'navbar-wrapper'}>
        <Logo color={'gray'} />
        <NavWrapper
          unCheck={unCheck}
        />
      </div>
    </header>
  );
}





