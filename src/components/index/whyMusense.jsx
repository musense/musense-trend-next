import React from 'react'
import styles from './css/whyMusense.module.css';

export default function WhyMusense() {
    return (
        <div className={styles['why-musense']}>
            <div className={styles['bird']} />
            <div className={styles['main']} />

            <div className={styles['sub-title']}>
                ＂傾聽陌聲，傳遞陌生＂
            </div>
            <div className={styles['article']}>
                <div>Musense的團隊活潑、高效率、態度謹慎，</div>
                <div>我們擁有掌握最新技術的工程師、經驗豐富的行銷團隊以及突破框架的設計人員。</div>
                <div>超前部署，協助您創造商業轉機。</div>
            </div>
            <div className={styles['blueBox']}></div>
        </div>
    )
}
