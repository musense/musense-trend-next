import HeaderLayout from '@components/layout/headerLayout'
import ButtonLayout from '@components/layout/buttonLayout'
import FooterLayout from '@components/layout/footerLayout'
import { createPortal } from 'react-dom'
import { useAppContext } from '@store/context'
import useModalRootRef from '@services/useModalRootRef'

export default function Layout({ children }) {
  const { state } = useAppContext()
  const modalRoot = useModalRootRef()

  return (
    <>
      <HeaderLayout />
      {state.clientWidth <= 768 && modalRoot &&
        createPortal(
          <ButtonLayout />,
          modalRoot
        )}
      {children}
      <FooterLayout />
    </>
  )
}
