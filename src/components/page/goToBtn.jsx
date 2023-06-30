import React from 'react'
import { useNavigate } from "react-router-dom";
import styles from './goToBtn.module.css';

export default function GoToBtn({ category, title, id, type }) {
    const navigate = useNavigate()
    function goToContent(contentID) {
        if (contentID === null) return
        navigate(`/c/${category}/p/${contentID}`)
    }
    return (id && title) && (
        <div title={title} onClick={() => goToContent(id)}
            className={`${styles.btn} ${type === 'prev'
                ? styles['prev-btn']
                : type === 'next'
                    ? styles['next-btn']
                    : ''}`}>{title}

        </div>
    );
}
