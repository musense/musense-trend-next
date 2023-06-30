// import styles from './css/headerLayout.module.css'
import Logo from './logo';

import usePathname from './hook/usePathname';
// import useShowHeader from './hook/useShowHeader';
import useRefresh from './hook/useRefresh';
import Hamburger from './hamburger';
import NavWrapper from './NavWrapper';
import NavBackDrop from './NavBackDrop';
import { useState, useEffect, useRef } from 'react';

export default function HeaderLayout() {
  useRefresh()
  const pathname = usePathname();
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

  // const [showHeader, headerForceHide] = useShowHeader();

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
        {pathname !== undefined &&
          <div className={'navbar-wrapper'}>
            <Logo active={active} color={'gray'} />
            <NavWrapper
              active={active}
              pathname={pathname}
              unCheck={unCheck}
            />

          </div>
        }
      </header>
    </>
  );
}





