import { type ReactNode } from 'react'
import Layout from '@components/Navbar/Layout'

type IMainProps = {
  meta: ReactNode
  children: ReactNode
}

function Main({ meta, children }: IMainProps) {
  return (
    <div className='w-full'>
      {meta}
      <div className='mx-auto'>
        <Layout>
          <main className='relative z-10'>{children}</main>
        </Layout>
      </div>
    </div>
  )
}

export { Main }
