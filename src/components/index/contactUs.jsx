import React, { useRef, useState, useEffect } from 'react';
import styles from './css/contactUs.module.css';
import Modal from "./modal";
import sendEmail from "@services/emailService";
import EnterBox from "./EnterBox";
import CheckBoxList from './CheckBoxList';
import Image from 'next/image';
import { contactUs, imageDown } from "@components/index/images";
import useLoadImage from "@services/useLoadImage";
import { createPortal } from 'react-dom'
import useModalRootRef from '@services/useModalRootRef'

const enterBoxList = [
  { title: '公司/品牌名稱', name: 'company-name', typ: 'text' },
  { title: '姓名', name: 'name', typ: 'text' },
  { title: '電話', name: 'phone', typ: 'tel' },
  { title: '電子信箱', name: 'email', typ: 'email' },
]

export default function ContactUs() {


  const [modalIsOpen, setIsOpen] = useState(false);
  const [headerContent, setHeaderContent] = useState(null);
  const [bodyContent, setBodyContent] = useState(null);

  const modalRoot = useModalRootRef()

  const contactUsImage = useLoadImage(contactUs);
  const imageDownImage = useLoadImage(imageDown);

  const checkBoxListRef = useRef(null);
  function getAskString(checkList) {
    if (!checkList) return
    let askString = '';
    for (const { select, alias } of checkList.values()) {
      select === 1 && (askString += `${alias}/`)
    }
    return askString.lastIndexOf("/") === askString.length - 1 && (askString = askString.slice(0, -1))
  }
  function getFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("🚀 ~ file: contactUs.jsx:34 ~ getFormData ~ Object.fromEntries(formData):", Object.fromEntries(formData))

    const askString = getAskString(checkBoxListRef.current)
    const userData = Object.fromEntries(formData);
    const templateParams = {
      companyName: userData['company-name'],
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      askString: askString,
      ask: userData.ask
    };
    console.log("🚀 ~ file: contactUs.jsx:46 ~ getFormData ~ templateParams:", templateParams)
    sendEmail(templateParams)
      .then(message => {
        console.log("🚀 ~ file: contactUs.jsx:48 ~ subFormData ~ message:", message)
        openModal()
      })
      .catch(err => {
        console.log("🚀 ~ file: contactUs.jsx:52 ~ subFormData ~ err:", err)

        openModal(err)
      })
  }
  function openModal(err) {
    if (err) {
      setHeaderContent("資料錯誤")
      if (typeof err === 'string') {
        const errorMessage = '「請填寫完整欄位資訊後再點擊送出」';
        setBodyContent(errorMessage)
      } else {
        setBodyContent('出了點問題，請稍後再試！')
      }
    } else {
      setHeaderContent()
      setBodyContent()
    }
    setIsOpen(true)
  }
  function closeModal() {
    console.log("🚀 ~ file: contactUs.jsx:49 ~ closeModal ~ closeModal: clicked!!!!!")

    setIsOpen(false)
  }

  return (
    <div id="contact" className={styles['contact-us-wrapper']}>
      {
        modalRoot && createPortal(
          <Modal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            headerContent={headerContent}
            bodyContent={bodyContent}
          />,
          modalRoot
        )
      }
      {contactUsImage && <Image
        alt=""
        src={contactUsImage.default.src}
        width={contactUsImage.default.width}
        height={contactUsImage.default.height}
        style={{
          width: '100%',
          objectFit: 'contain'
        }}
      />}
      <div className={styles['contact-us-content']}>
        <div className={styles['img-wrapper']}>
          {imageDownImage && <Image
            alt=""
            className={styles['image-down']}
            src={imageDownImage.default.src}
            width={imageDownImage.default.width}
            height={imageDownImage.default.height}
            style={{
              width: '100%',
              objectFit: 'contain'
            }}
          />}
          <div className={styles['orange-box']} />
        </div>
        <form
          name='contactForm'
          className={styles['contact-us-form']}
          onSubmit={getFormData}
        >

          <div className={styles['left-form']}>
            {
              enterBoxList.map((enterBox, index) => (
                <EnterBox
                  styles={styles}
                  key={index}
                  title={enterBox.title}
                  name={enterBox.name}
                  type={enterBox.type}
                />
              ))
            }
          </div>

          <div className={styles['right-form']}>

            <CheckBoxList
              styles={styles}
              checkBoxListRef={checkBoxListRef}
            />
            <EnterBox
              large
              styles={styles}
              title={'其他需求'}
              name={'ask'}
              type={'text'}
            />
            <button
              title='send button'
              className={styles['send-button']}
              type='submit'
            />
          </div>

        </form>
      </div>
    </div>
  );
}


