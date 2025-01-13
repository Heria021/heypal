import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Home, MessageSquare, Users } from "lucide-react"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

export const useNavigation = () => {
    const requestsCount = useQuery(api.requests.count);

    const pathname = usePathname()
    
    const paths = useMemo(() => [
        {
            name: "Home",
            href: "/home",
            icon: <Home />,
            active: pathname.startsWith("/home"),
        },
        {
            name: "Conversations",
            href: "/conversations",
            icon: <MessageSquare />,
            active: pathname.startsWith("/conversations"),
        },
        {
            name: "Friends",
            href: "/friends",
            icon: <Users />,
            active: pathname.startsWith("/friends"),
            count: requestsCount,
        }
    ], [pathname, requestsCount])

    return paths;
}