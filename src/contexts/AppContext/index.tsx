import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { AuthContext } from "../AuthContext"

type Section = 'album' | 'stickers' | 'exchange' | 'games' | null

type ContextValues = {
    app: {
        section: Section
        setSection: (v: Section) => void,
        showAppFooterNav: boolean,
        setShowAppFooterNav: (v: boolean) =>void,
        loadApp: boolean,
        setLoadApp: (v: boolean) =>void,
    }
}

export const AppContext = createContext<ContextValues>({
    app: {
        section: null, setSection: (v)=>{},
        showAppFooterNav: true, setShowAppFooterNav: (v) => {},
        loadApp: true, setLoadApp: (v) => {},
    }
})

export function AppProvider ({ children }: PropsWithChildren) {

    const {authData: {data: {user, token}, status: {wasInitiated}}} = useContext(AuthContext);

    const [loadApp, setLoadApp] = useState<boolean>(true)
    const [section, setSection] = useState<Section>(null)
    const [showAppFooterNav, setShowAppFooterNav] = useState<boolean>(false)

    useEffect(()=>{
        if (wasInitiated) {
            setLoadApp(false);
        }
    }, [wasInitiated])

    useEffect(()=>{
        if (user && token) {
            setShowAppFooterNav(true);
        } else {
            setShowAppFooterNav(false);
        }
    }, [user, token])

    const values : ContextValues = {
        app: {
            loadApp, setLoadApp,
            section, setSection,
            showAppFooterNav, setShowAppFooterNav
        }
    }

    return <AppContext.Provider value={values}>
        {children}
    </AppContext.Provider>
}