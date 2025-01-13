
"use client"
import ConversationFallBack from '@/components/shared/conversation/ConversationFallBack'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
    error: Error
}

const error = ({error}: Props) => {
    const router = useRouter();
    useEffect(()=>{
        router.push("/conversations");
    },[error, router])
  return <ConversationFallBack/>
}

export default error