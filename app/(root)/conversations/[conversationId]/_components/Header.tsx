import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { CircleArrowLeft, Settings, User2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    imageUrl?: string;
    name: string;
    options?: {
        label: string;
        destructive?: boolean;
        onClick: () => void;
    }[];
};

const Header = ({ imageUrl, name, options }: Props) => {
    return (
        <Card className="w-full flex rounded-lg items-center p-2 justify-between">
            <div className="flex items-center gap-2">
                <Link className="lg:hidden block" href={'/conversations'}>
                    <CircleArrowLeft />
                </Link>
                <Avatar>
                    <AvatarImage src={imageUrl} />
                    <AvatarFallback>
                        <User2 />
                    </AvatarFallback>
                </Avatar>
                <h2 className="font-semibold">{name}</h2>
            </div>
            <div>
                {options && options.length > 0 ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            {/* Use div to avoid nested button error */}
                            <div>
                                <Button size={'icon'} variant={'secondary'}>
                                    <Settings />
                                </Button>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {options.map((option, index) => (
                                <DropdownMenuItem
                                    key={index}
                                    onClick={option.onClick}
                                    className={cn(
                                        { 'text-destructive': option.destructive },
                                        'font-semibold'
                                    )}
                                >
                                    {option.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : null}
            </div>
        </Card>
    );
};

export default Header;