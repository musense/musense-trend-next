import React from 'react'

export default function EnterBox({ styles, title, type, name, large = false }) {
    return <div data-title={title} className={`${styles['enter-box']} ${large ? styles['large'] : ''}`}>
        {large ?
            (<textarea className={styles['input-class']}
                type={type}
                name={name}
            />) :
            (<input className={styles['input-class']}
                type={type}
                name={name} />)}
    </div>;
}
