import { createContext, PropsWithChildren, useState } from "react"

type Section = 'album' | 'stickers' | 'exchange' | 'games' | null

type ContextValues = {
    app: {
        section: Section
        setSection: (v: Section) => void,
        showAppFooterNav: boolean,
        setShowAppFooterNav: (v: boolean) =>void,
    }
}

export const AppContext = createContext<ContextValues>({
    app: {
        section: null, setSection: (v)=>{},
        showAppFooterNav: true, setShowAppFooterNav: (v) => {}
    }
})

export function AppProvider ({ children }: PropsWithChildren) {

    const [section, setSection] = useState<Section>(null)
    const [showAppFooterNav, setShowAppFooterNav] = useState<boolean>(true)

    const values : ContextValues = {
        app: {
            section, setSection,
            showAppFooterNav, setShowAppFooterNav
        }
    }

    return <AppContext.Provider value={values}>
        {children}
    </AppContext.Provider>
}