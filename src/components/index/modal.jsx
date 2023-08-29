import { useEffect, useRef, useId } from 'react';
import styles from './css/modal.module.css';

export default function Modal({
    modalIsOpen = false,
    closeModal,
    headerContent = '信件已寄出',
    bodyContent = '我們將會盡快與您聯繫，謝謝！'
}) {
    console.log('🚀 ~ file: modal.jsx:10 ~ bodyContent:', bodyContent)
    console.log('🚀 ~ file: modal.jsx:10 ~ headerContent:', headerContent)

    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);
    const modalShowClassRef = useRef('hide')
    const modalHeaderClassRef = useRef('success')

    modalHeaderClassRef.current = headerContent === '資料錯誤' ? 'fail' : 'success'
    modalShowClassRef.current = modalIsOpen ? 'show' : 'hide'


    useEffect(() => {
        if (modalRef.current === null || closeButtonRef.current === null) {
            // modalRef.current = id
        } else {
            const root = document.getElementById('root')
            const modal = modalRef.current
            // const modalCloseButton = document.getElementById('close-button')
            const modalCloseButton = closeButtonRef.current
            root.appendChild(modal)
            modalCloseButton.addEventListener('click', () => closeModal())
        }
        const nodeRef = modalRef.current

        return () => {
            root.removeChild(nodeRef)
        }
    }, [modalRef, closeButtonRef, closeModal]);

    return (
        <div ref={modalRef} className={`${styles['modal-layout']} ${styles[modalShowClassRef.current]}`}>
            <div className={styles['modal-wrapper']}>
                <div className={styles['modal-container']}>
                    <div ref={closeButtonRef} className={styles['modal-close']} />
                    <div className={`${styles['modal-header']} ${styles[modalHeaderClassRef.current]}`}>
                        {headerContent}
                    </div>
                    <div className={styles['modal-body']}>
                        {bodyContent}
                    </div>
                    <div className={styles['modal-footer']}></div>
                </div>
            </div>
        </div>
    )
}
