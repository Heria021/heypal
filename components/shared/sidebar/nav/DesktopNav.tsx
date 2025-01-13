"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigation } from '@/hooks/useNavigation'
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react'

const DesktopNav = () => {
  const paths = useNavigation();

  return (
    <Card className='hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4'>
      <nav>
        <ul className='flex flex-col items-center gap-4'>
          {paths.map((path, id) => {
            return (
              <li key={id}>
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Button
                          size={'icon'}
                          variant={path.active ? "default" : "outline"}
                        >
                          {path.icon}
                        </Button>
                        {path.count ? (
                          <Badge className="absolute left-6 bottom-6 rounded-full border border-border w-4 h-4 flex items-center justify-center text-xs p-2 ">
                            {path.count}
                          </Badge>
                        ) : null}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {path.name}
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4">
        <UserButton />
      </div>
    </Card>
  )
}

export default DesktopNav