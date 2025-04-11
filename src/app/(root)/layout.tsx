'use client'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import MainLayout from '@/src/components/layouts/main-layout/MainLayout'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <MainLayout>{children}</MainLayout>
  )
}

export default Layout