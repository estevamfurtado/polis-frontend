import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { DataContext } from "../DataContext"
import {GetDeckResponse, UserInfo} from "../../types"
import * as api from '../../services/reqs'

export enum Mode {
    home = 'home',
    stats = 'stats',
    pagesSection = 'pagesSection'
}
export enum PagesSection {
    parties = 'parties',
    states = 'states'
}

type AlbumContextValues = {
    progressValue: number,
    showPasteAllCardsButton: boolean,
    mode: Mode | null
    setMode: (mode: Mode | null) => void
    pagesSection: PagesSection | null
    setPagesSection: (v: PagesSection | null) => void
}


export const AlbumContext = createContext<AlbumContextValues>({
    progressValue: 0,
    showPasteAllCardsButton: false,
    mode: null, setMode: () => {},
    pagesSection: null, setPagesSection: () => {}
})



export function AlbumContextProvider ({ children }: PropsWithChildren) {

    const {content: {cards, stickers}, app: {setShowAppHeader, setSection}} = useContext(DataContext);

    const [mode, setMode] = useState< Mode | null>(null);
    const [pagesSection, setPagesSection] = useState<PagesSection | null>(null);

    useEffect(() => {
        setSection('album');

        return () => {
            setSection(null);
        }
    },[])

    const showPasteAllCardsButton = (cards?.deck.notPasted.new.length ?? 0) > 30;
    const total = stickers ? Object.keys(stickers).length : 0;
    const pasted = cards ? cards.deck.pasted.length : 0;
    const progressValue = total === 0 ? 0 : pasted/total;

    const values : AlbumContextValues = {
        progressValue,
        showPasteAllCardsButton,
        mode, setMode,
        pagesSection, setPagesSection
    }

    return (
        <AlbumContext.Provider value={values}>
            {children}
        </AlbumContext.Provider>
    )

}
