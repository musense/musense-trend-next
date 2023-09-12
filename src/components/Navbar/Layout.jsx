import HeaderLayout from '@components/layout/headerLayout'
import ButtonLayout from '@components/layout/buttonLayout'
import FooterLayout from '@components/layout/footerLayout'
import Facebook from '@components/Facebook/Facebook'
import { createPortal } from 'react-dom'
import { useAppContext } from '@store/context'
import useModalRootRef from '@services/useModalRootRef'

export default function Layout({ children }) {
  const { state } = useAppContext()
  const modalRoot = useModalRootRef()

  return (
    <>
      <HeaderLayout />
      {children}
      <Facebook />
      <FooterLayout />
    </>
  )
}
