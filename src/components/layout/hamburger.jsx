import React from "react";
import styles from './css/hamburger.module.css'
import { useAppContext } from "@store/context";

function Hamburger({ toggleHamburger, unCheck }) {
    const { state } = useAppContext();
    function handClick(e) {
        toggleHamburger(e)
    }

    return (
        <div className={styles['hamburger']}>
            <input className={styles['hamburger-check']} checked={state.menuOpen} type="checkbox" onClick={handClick} />
            <span></span>
            <span></span>
            <span></span>
            <button onClick={unCheck} type="button"
                style={{
                    position: 'absolute',
                    display: 'none',
                    right: '10000rem',
                }} />
        </div>
    )
}

export default Hamburger