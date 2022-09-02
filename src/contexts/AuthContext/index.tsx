import { createContext, PropsWithChildren } from "react"
import useAuth, { initialAuth } from "../../hooks/useAuth"

type ContextValues = {
    authData: ReturnType<typeof useAuth>
}

export const AuthContext = createContext<ContextValues>({
    authData: initialAuth})

export function AuthProvider ({ children }: PropsWithChildren) {

    const authData = useAuth();

    const values : ContextValues = {authData}

    return <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
}