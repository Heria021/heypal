import { Card } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import React from 'react'

type Props = React.PropsWithChildren<{
    title: string,
    action?: React.ReactNode[] // Array of React components
}>

const ItemList = ({ children, title, action }: Props) => {

    const handleActionClick = (e: React.MouseEvent) => {
        e.preventDefault(); 
        console.log("Action triggered without default behavior");
    };

    return (
        <Card className='h-full w-full lg:flex-none lg:w-80 p-2'>
            <div className="mb-4 flex justify-between items-center">
                <h1 className='text-2xl font-semibold tracking-tight'>
                    {title}
                </h1>
                {action && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Actions</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            {action.map((actionComponent, index) => (
                                <DropdownMenuItem 
                                    key={index}
                                    onClick={(e) => handleActionClick(e)} 
                                    className=' flex items-center justify-center'
                                >
                                    {actionComponent}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
            <div className="w-full h-full flex flex-col items-center justify-start gap-2">
                {children}
            </div>
        </Card>
    )
}

export default ItemList