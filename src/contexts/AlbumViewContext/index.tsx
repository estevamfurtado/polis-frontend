import { createContext, PropsWithChildren, useState } from "react"

type Mode = 'pages' | 'other'
type PageSection = 'parties' | 'states'

type ContextValues = {
    mode: {value: Mode, set: (v: Mode) => void},
    pageSection: {value: PageSection, set: (v: PageSection) => void},
}

export const AlbumViewContext = createContext<ContextValues>({
    mode: {value: 'other', set: ()=>{}},
    pageSection: {value: 'parties', set: ()=>{}},
})

export function AlbumProvider ({ children }: PropsWithChildren) {

    const [mode, setMode] = useState<Mode>('other');
    const [pageSection, setPageSection] = useState<PageSection>('parties');

    const values : ContextValues = {
        mode: {value: mode, set: setMode},
        pageSection: {value: pageSection, set: setPageSection},
    }

    return <AlbumViewContext.Provider value={values}>
        {children}
    </AlbumViewContext.Provider>
}