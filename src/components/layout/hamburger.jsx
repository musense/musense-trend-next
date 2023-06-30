import styles from './css/hamburger.module.css'

export default function Hamburger({ id, toggleHamburger, unCheck }) {

    function handClick(e) {        
        toggleHamburger(e)
    }

    return (
        <div className={styles['hamburger']}>
            <input className={styles['hamburger-check']} id={id} type="checkbox" onClick={handClick} name="hamburger-check" />
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
