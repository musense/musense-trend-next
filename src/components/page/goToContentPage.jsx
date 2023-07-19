import React from 'react'
import styles from "./goToContentPage.module.css";
import GoToBtn from "./goToBtn"

export default function GoToContentPage({
    categoryName,
    prevInfo,
    nextInfo
}) {

    return <div className={styles['content-btn']}>
        {prevInfo && <GoToBtn category={categoryName} title={prevInfo.title} id={prevInfo._id} type='prev' />}
        {nextInfo && <GoToBtn category={categoryName} title={nextInfo.title} id={nextInfo._id} type='next' />}
    </div>;
}

