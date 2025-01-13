"use client"
import React from 'react'
import UserInformation from './_components/UserInformation'

type Props = React.PropsWithChildren<{}>

const layout = ({ children }: Props) => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="flex-1 h-full w-ful flex items-center justify-center">
                <UserInformation/>
            </div>
            <div className="flex-1 h-full w-ful flex items-center justify-center px-10">
                {children}
            </div>
        </div>
    )
}

export default layout