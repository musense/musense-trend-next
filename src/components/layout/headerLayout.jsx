import Logo from './logo';
import usePathname from '@services/usePathname';
import Hamburger from './hamburger';
import NavWrapper from './NavWrapper';
import NavBackDrop from './NavBackDrop';
import { useRouter } from "next/router";

import { useState, useEffect, useRef } from 'react';

export default function HeaderLayout() {

  const router = useRouter();
  const hamburgerRef = useRef(null);

  const [active, setActive] = useState(false);
  let hamburgerCheck

  useEffect(() => {
    if (!localStorage.getItem('pathname')) {
      localStorage.setItem('pathname', window.location.pathname)
    } else if (window.location.pathname !== localStorage.getItem('pathname')) {
      localStorage.setItem('pathname', window.location.pathname)
    }

    if (hamburgerRef.current == null) {
      hamburgerRef.current = "hamburger-check"
    }
    // console.log("🚀 ~ file: headerLayout.jsx:25 ~ HeaderLayout ~ active:", active)
  }, [hamburgerRef, active]);

  function unCheck() {

    setActive(false)
    hamburgerCheck = document.querySelector(`#${hamburgerRef.current}`);
    hamburgerCheck.checked = false;
  }
  function toggleHamburger(e) {
    // console.log("Clicked, new value = " + e.target.checked);
    setActive(e.target.checked)
  }
  return (
    <>
      {/* <header className={`${showHeader ? 'show' : 'hide'}`}> */}
      <header>
        <NavBackDrop
          active={active}
          unCheck={unCheck}
        />
        <Hamburger
          id={hamburgerRef.current}
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
    </>
  );
}





