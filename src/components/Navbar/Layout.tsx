import HeaderLayout from '@components/layout/headerLayout';
import ButtonLayout from '@components/layout/buttonLayout';
import FooterLayout from '@components/layout/footerLayout';
export interface Props {
  path: string;
  children: ReactNode;
}

export default function Layout({
  path,
  children
}: Props) {

  return (
    <>
      <HeaderLayout />
      <ButtonLayout path={path} />
      {children}
      <FooterLayout />
    </>
  )

}



