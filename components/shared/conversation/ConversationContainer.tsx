import { Card } from '@/components/ui/card'
import React from 'react'

type Props = React.PropsWithChildren<{}>

const ConversationContainer = ({children}: Props) => {
  return (
    <Card className='w-full flex-1 lg:h-full h-[100svh-32px)] flex flex-col gap-2 p-4'>
        {children}
    </Card>

)
}

export default ConversationContainer