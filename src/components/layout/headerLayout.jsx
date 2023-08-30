import Logo from './logo';
import Hamburger from './hamburger';
import NavWrapper from './NavWrapper';
import NavBackDrop from './NavBackDrop';
import { useRouter } from "next/router";

import { useState, useEffect, useRef, useCallback } from 'react';

export default function HeaderLayout() {

  const router = useRouter();
  const hamburgerRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('pathname')) {
      localStorage.setItem('pathname', window.location.pathname)
    } else if (window.location.pathname !== localStorage.getItem('pathname')) {
      localStorage.setItem('pathname', window.location.pathname)
    }
  }, [active]);

  const unCheck = () => {
    if (hamburgerRef.current == null) return
    setActive(false)
    const hamburger = hamburgerRef.current
    hamburger.checked = false;
  }

  function toggleHamburger(e) {
    setActive(e.target.checked)
  }

  return (
    <header>
      <NavBackDrop
        active={active}
        unCheck={unCheck}
        hamburgerRef={hamburgerRef}
      />
      <Hamburger
        ref={hamburgerRef}
        toggleHamburger={toggleHamburger}
        unCheck={unCheck}
      />
      <div className={'navbar-wrapper'}>
        <Logo active={active} color={'gray'} />
        <NavWrapper
          active={active}
          pathname={router.asPath}
          unCheck={unCheck}
        />
      </div>
    </header>
  );
}





