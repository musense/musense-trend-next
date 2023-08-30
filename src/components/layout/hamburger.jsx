import React from "react";
import styles from './css/hamburger.module.css'

function InnerHamburger({ toggleHamburger, unCheck }, ref) {

    function handClick(e) {
        toggleHamburger(e)
    }

    return (
        <div className={styles['hamburger']}>
            <input ref={ref} className={styles['hamburger-check']} type="checkbox" onClick={handClick} name="hamburger-check" />
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

const Hamburger = React.forwardRef(InnerHamburger)

export default Hamburger