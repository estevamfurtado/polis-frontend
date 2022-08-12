import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import useToken from "../../hooks/useToken"
import * as api from "../../services/services/reqs"

import {
    token, Person,
    CompleteRanking, CompleteAlbum,
    MyDeck
} from "../../types"



export type DataContextValues = {data: {

        token: token | null
        setToken: (input: string | null) => void

        user: Person | null
        setUser: (input: Person | null) => void
    
        completeRanking: CompleteRanking | null
        setCompleteRanking: (input: CompleteRanking | null) => void

        completeAlbum: CompleteAlbum | null
        setCompleteAlbum: (input: CompleteAlbum | null) => void

        deck: MyDeck | null
        setDeck: (input: MyDeck | null) => void
    },
    hooks: {
        getUserData: () => void
        getRankingData: () => void
        getAlbumData: () => void
        getDeckData: () => void
        logOut: () => void
        pasteCard: (cardId: number) => Promise<void>
        pasteAllCards: () => Promise<void>
        openPack: () => Promise<void>
        openPacks: () => Promise<void>
    }
}

export const DataContext = createContext<DataContextValues>({
    data: {
        token: '',
        user: null,
        completeRanking: null,
        completeAlbum: null,
        deck: null,

        setToken: (input: string | null) => {},
        setUser: (input: Person | null) => {},
        setCompleteRanking: (input: CompleteRanking | null) => {},
        setCompleteAlbum: (input: CompleteAlbum | null) => {},
        setDeck: (input: MyDeck | null) => {}
    },
    hooks: {
        getUserData: () => {},
        getAlbumData: () => {},
        getRankingData: () => {},
        getDeckData: () => {},
        logOut: () => {},
        pasteCard: async (cardId: number) => {},
        pasteAllCards: async () => {},
        openPack: async () => {},
        openPacks: async () => {}
    }
})


export function DataProvider ({ children }: PropsWithChildren) {

    const [token, setToken] = useToken();
    const [user, setUser] = useState<Person | null>(null)
    
    const [completeRanking, setCompleteRanking] = useState<CompleteRanking | null>(null)
    const [completeAlbum, setCompleteAlbum] = useState<CompleteAlbum | null>(null)
    const [deck, setDeck] = useState<MyDeck | null>(null)
    
    useEffect(()=>{
        if (token) {
            getUserData();
        }
    }, [token])

    const data = {
        token, setToken,
        user, setUser,
        completeRanking, setCompleteRanking,
        completeAlbum, setCompleteAlbum,
        deck, setDeck
    }

    const hooks = {
        getUserData,
        getRankingData,
        getAlbumData,
        getDeckData,
        logOut,
        pasteCard,
        pasteAllCards,
        openPack,
        openPacks
    }
    
    return <DataContext.Provider value={{data, hooks}}>{children}</DataContext.Provider>

    async function getUserData() {
        try {
            const data = await api.getUser();
            setUser(data.data);
        } catch (error) {
            setToken(null);
        }
    }

    async function getRankingData() {
        const res = await api.getRanking();
        const data = res.data;
        
        setCompleteRanking(data.ranking);
    }

    async function getAlbumData() {
        const res = await api.getAlbum();
        const data = res.data;
        
        setCompleteAlbum(data.album);
    }

    async function getDeckData() {
        const res = await api.getDeck();
        const data = res.data;
        setDeck(data);
    }

    async function logOut() {
        setToken(null);
        setCompleteRanking(null);
    }

    async function pasteCard(id: number) {
        console.log('pasteCard', id);
        await api.pasteCard(id);
        await getDeckData();
    }

    async function pasteAllCards() {
        console.log('pasteAllCards');
        await api.pasteAll();
        await getDeckData();
    }

    async function openPack() {
        console.log('calling from context');
        await api.openOnePack();
        console.log('api worked')
        await getDeckData();
        console.log('gettind data');
    }

    async function openPacks() {
        await api.openAllPacks();
        await getDeckData();
    }
}