import React from 'react'
import DesktopNav from './nav/DesktopNav'
import MobileNav from './nav/MobileNav'

type Props = React.PropsWithChildren<{}>

const SidebarWrapper = ({ children }: Props) => {
    return (
        <div className='h-screen w-full p-4 flex flex-col lg:flex-row gap-4'>
            <main className='h-[calc(100%-80px)] lg:h-full w-full flex gap-4'>
                <DesktopNav/>
                <MobileNav/>
                {children}
            </main>
        </div>
    )
}

export default SidebarWrapper