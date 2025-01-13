import { Card } from '@/components/ui/card'
import React from 'react'

type Props = React.PropsWithChildren<{
    title: string,
    action?: React.ReactNode
}>

const ItemList = ({ children, title, action }: Props) => {
    return (
        <Card className='h-full w-full lg:flex-none lg:w-80 p-2'>
            <div className="mb-4 flex justify-between items-center">
                <h1 className='text-2xl font-semibold tracking-tight'>
                    {title}
                </h1>
                {action ? action : null}
            </div>
            <div className="w-full h-full flex flex-col items-center justify-start gap-2">
                {children}
            </div>
        </Card>
    )
}

export default ItemList