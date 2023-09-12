import HeaderLayout from '@components/layout/headerLayout'
import FooterLayout from '@components/layout/footerLayout'

export default function Layout({ children }) {

  return (
    <>
      <HeaderLayout />
      {children}
      <FooterLayout />
    </>
  )
}
