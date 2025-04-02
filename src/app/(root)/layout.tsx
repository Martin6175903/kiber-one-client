'use client'
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import MainLayout from '@/src/components/layouts/main-layout/MainLayout'
import { useProfile } from '@/src/hooks/useProfile'
import { IUser } from '@/src/shared/types/user.types'

export const UserContext = createContext<IUser | {}>({})

const Layout = ({ children }: PropsWithChildren) => {
  const {user, isLoading} = useProfile()
  const [context, setContext] = useState<IUser | {}>({})
  useEffect(() => {
    if (!isLoading) setContext(user!)
  }, [user])

  return (
    <UserContext value={context}>
      <MainLayout>{children}</MainLayout>
    </UserContext>
  )
}

export default Layout