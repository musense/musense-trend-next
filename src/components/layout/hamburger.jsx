import React from "react";
import styles from './css/hamburger.module.css'
import { useAppContext } from "@store/context";

function Hamburger() {
    const { state, dispatch } = useAppContext();

    return (
        <div className={styles['hamburger']}>
            <input className={styles['hamburger-check']} checked={state.menuOpen} type="checkbox"
                onChange={() =>
                    dispatch({ type: "TOGGLE_MENU" })
                } />
            <span></span>
            <span></span>
            <span></span>
            <button onClick={() =>
                dispatch({ type: 'CLOSE_MENU' })
            } type="button"
                style={{
                    position: 'absolute',
                    display: 'none',
                    right: '10000rem',
                }} />
        </div>
    )
}

export default Hamburger