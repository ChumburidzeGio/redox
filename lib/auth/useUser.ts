import { useSession } from "next-auth/react";

export function useUser() {
    const { data: session } = useSession()

    return {
        isAuth: Boolean(session?.user),
        name: session?.user?.name || undefined,
        email: session?.user?.email || undefined,
        role: session?.role,
    }
}