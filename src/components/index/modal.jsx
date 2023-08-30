import styles from './css/modal.module.css';

export default function Modal({
    modalIsOpen = false,
    closeModal,
    headerContent = '信件已寄出',
    bodyContent = '我們將會盡快與您聯繫，謝謝！'
}) {

    const modalShowClass = modalIsOpen ? 'show' : 'hide'
    const modalHeaderClass = headerContent === '資料錯誤' ? 'fail' : 'success'

    const modal = <div className={`${styles['modal-layout']} ${styles[modalShowClass]}`}>
        <div className={styles['modal-wrapper']}>
            <div className={styles['modal-container']}>
                <div onClick={closeModal} className={styles['modal-close']} />
                <div className={`${styles['modal-header']} ${styles[modalHeaderClass]}`}>
                    {headerContent}
                </div>
                <div className={styles['modal-body']}>
                    {bodyContent}
                </div>
                <div className={styles['modal-footer']} />
            </div>
        </div>
    </div>

    return modal
}