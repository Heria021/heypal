import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutationState } from '@/hooks/useMutationState'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { ConvexError } from 'convex/values'
import { Check, User, X } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    id: Id<"request">,
    imageUrl: string,
    userName: string,
    email: string
}

const Request = ({ id, imageUrl, userName, email }: Props) => {
    const { mutate: denyRequest, pending: denyPending } = useMutationState(api.request.deny)
    const { mutate: acceptRequest, pending: acceptPending } = useMutationState(api.request.accept)
    return (
        <Card className=' flex justify-between items-center flex-row gap-2 p-2 w-full'>
            <div className="flex items-center gap-2 truncate">
                <Avatar>
                    <AvatarImage src={imageUrl} />
                    <AvatarFallback><User /></AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate">
                    <h4 className=' truncate'>{userName}</h4>
                    <p className=' text-xs text-muted-foreground truncate'>{email}</p>
                </div>

            </div>
            <div className="flex items-center gap-2">
                <Button disabled={acceptPending} size={'icon'} onClick={() => {
                    acceptRequest({id}).then(()=>{
                        toast.success("Request Accepted")
                    }).catch((error)=>{toast.error(error instanceof ConvexError ? error.data :"Unexpected Error occure!")})
                }}>
                    <Check className='h-4 w-4' />
                </Button>
                <Button disabled={denyPending} size={'icon'} onClick={() => {
                    denyRequest({id}).then(()=>{
                        toast.success("Request Denied")
                    }).catch((error)=>{toast.error(error instanceof ConvexError ? error.data :"Unexpected Error occure!")})
                }}>
                    <X className='h-4 w-4' />
                </Button>
            </div>

        </Card>
    )
}

export default Request