import { MessageSquare, SquareLibraryIcon, Users } from "lucide-react"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

export const useContent = () => {
    const pathname = usePathname()
    const paths = useMemo(() => [
        {
            post: "daily-moments",
            name: "Capture Your Daily Moment",
            icon: <MessageSquare />,
            active: pathname.startsWith("/content/daily-moments"),
        },
        {
            post: "anonymous-confessions",
            name: "Share Anonymous Confessions",
            icon: <Users />,
            active: pathname.startsWith("/content/anonymous-confessions"),
        },
        {
            post: "themed-tales",
            name: "Dive into Themed Tales",
            icon: <SquareLibraryIcon />,
            active: pathname.startsWith("/content/themed-tales"),
        }
    ], [pathname])

    return paths;
}