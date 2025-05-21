'use client'
import { PropsWithChildren, Suspense, useContext, useEffect } from 'react'
import Aside from '@/src/components/layouts/admin-layout/aside/Aside'
import Main from './main/Main'
import { useUserContext } from '@/src/providers/user.context'
import { useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/src/config/url.config'

const AdminLayout = ({children}: PropsWithChildren) => {

  const router = useRouter()
  const {user, isLoadingUser} = useUserContext()

  useEffect(() => {
    if (!isLoadingUser && user?.role === 'USER') router.replace(PUBLIC_URL.home())
    if (!isLoadingUser && !user) router.push(PUBLIC_URL.auth())
  }, [isLoadingUser])

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