import { Card } from '@/components/ui/card'
import React from 'react'

type Props = React.PropsWithChildren<{}>

const ProfileContainer = ({children}: Props) => {
  return (
    <Card className='w-[20%] shadow-none border-none p-0 lg:h-full hidden lg:flex flex-col gap-2'>
        {children}
    </Card>
)
}

export default ProfileContainer