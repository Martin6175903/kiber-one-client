import { PropsWithChildren, Suspense } from 'react'
import Aside from '@/src/components/layouts/admin-layout/aside/Aside'
import Main from './main/Main'

const AdminLayout = ({children}: PropsWithChildren) => {
  return (
    <div>
      <div className={'wrapper min-h-screen bg-linear-[90deg,#131313,#131313_30%,white_60%,white]'}>
        <div className={'container__admin'}>
          <div className={'flex items-stretch justify-between'}>
            <Aside/>
            <Main>
              <Suspense fallback={<div>Загрузка...</div>}>
                {children}
              </Suspense>
            </Main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout