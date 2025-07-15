import MainHeader from '@/components/module/home/Header'
import { LayoutProps } from '@/types'
import React from 'react'

const Layout = ({children}:LayoutProps) => {
  return (
    <div>
        <MainHeader/>
        {children}
        </div>
  )
}

export default Layout