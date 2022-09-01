import { createContext, PropsWithChildren, useEffect, useState } from "react"
import useToken from "../../hooks/useToken"
import * as api from "../../services/reqs"


import {
    token, Person,
    GetDeckResponse, GetRankingResponse,
    FunctionalPage
} from "../../types"


export type DataContextValues = {
    
    auth: {
        token: token
        setToken: (input: string | null) => void

        user: Person | null
        setUser: (input: Person | null) => void
    },

    content: {
        rankings: GetRankingResponse['rankings'] | null
        setRankings: (input: GetRankingResponse['rankings'] | null) => void

        politicians: GetRankingResponse['politicians'] | null
        setPoliticians: (input: GetRankingResponse['politicians'] | null) => void

        politicianRecords: GetRankingResponse['politicianRecords'] | null
        setPoliticianRecords: (input: GetRankingResponse['politicianRecords'] | null) => void

        partyRecords: GetRankingResponse['partyRecords'] | null
        setPartyRecords: (input: GetRankingResponse['partyRecords'] | null) => void

        states: GetRankingResponse['states'] | null
        setStates: (input: GetRankingResponse['states'] | null) => void

        parties: GetRankingResponse['parties'] | null
        setParties: (input: GetRankingResponse['parties'] | null) => void

        album: GetDeckResponse['album'] | null
        setAlbum: (input: GetDeckResponse['album'] | null) => void

        pages: GetDeckResponse['pages'] | null
        setPages: (input: GetDeckResponse['pages'] | null) => void

        stickers: GetDeckResponse['stickers'] | null
        setStickers: (input: GetDeckResponse['stickers'] | null) => void

        cards: GetDeckResponse['cards'] | null
        setCards: (input: GetDeckResponse['cards'] | null) => void

        packs: GetDeckResponse['packs'] | null
        setPacks: (input: GetDeckResponse['packs'] | null) => void

        exchangeRequests: GetDeckResponse['exchangeRequests'] | null
        setExchangeRequests: (input: GetDeckResponse['exchangeRequests'] | null) => void

        pagesByParties: FunctionalPage[]
        pagesByStates: FunctionalPage[]
    }

    app: {
        showAppHeader: boolean
        setShowAppHeader: (show: boolean) => void

        showAppFooterNav: boolean
        setShowAppFooterNav: (show: boolean) => void

        limitWidth: boolean
        setLimitWidth: (show: boolean) => void

        section: string | null
        setSection: (show: string | null) => void
    }

    hooks: {
        logOut: () => void
        pasteCard: (cardId: number) => Promise<void>
        pasteAllCards: () => Promise<void>
        openPack: () => Promise<void>
        openPacks: () => Promise<void>
        toggleCard: (cardId: number) => Promise<void>
        accept: (exchangeRequestId: number) => Promise<void>
        reject: (exchangeRequestId: number) => Promise<void>
        cancel: (exchangeRequestId: number) => Promise<void>
        updateDeck: () => Promise<void>
        realizePacks: () => Promise<void>
    }
}

export const DataContext = createContext<DataContextValues>({
    
    auth: {
        token: '',
        user: null,
        setToken: (input: string | null) => {},
        setUser: (input: Person | null) => {},
    },

    content: {
        rankings: null,
        politicians: null,
        politicianRecords: null,
        partyRecords: null,
        states: null,
        parties: null,
        album: null,
        pages: null,
        stickers: null,
        cards: null,
        packs: null,
        exchangeRequests: null,

        pagesByParties: [],
        pagesByStates: [],
        
        setRankings: (input: GetRankingResponse['rankings'] | null) => {},
        setPoliticians: (input: GetRankingResponse['politicians'] | null) => {},
        setPoliticianRecords: (input: GetRankingResponse['politicianRecords'] | null) => {},
        setPartyRecords: (input: GetRankingResponse['partyRecords'] | null) => {},
        setStates: (input: GetRankingResponse['states'] | null) => {},
        setParties: (input: GetRankingResponse['parties'] | null) => {},
        setAlbum: (input: GetDeckResponse['album'] | null) => {},
        setPages: (input: GetDeckResponse['pages'] | null) => {},
        setStickers: (input: GetDeckResponse['stickers'] | null) => {},
        setCards: (input: GetDeckResponse['cards'] | null) => {},
        setPacks: (input: GetDeckResponse['packs'] | null) => {},
        setExchangeRequests: (input: GetDeckResponse['exchangeRequests'] | null) => {},
    },

    app: {
        showAppHeader: true,
        setShowAppHeader: (show: boolean) => {},

        showAppFooterNav: true,
        setShowAppFooterNav: (show: boolean) => {},

        limitWidth: false,
        setLimitWidth: (show: boolean) => {},

        section: null,
        setSection: (section: null | string) => {},
    },

    hooks: {
        logOut: () => {},
        pasteCard: async (cardId: number) => {},
        pasteAllCards: async () => {},
        openPack: async () => {},
        openPacks: async () => {},
        toggleCard: async (cardId: number) => {},
        accept: async (requestId: number) => {},
        reject: async (requestId: number) => {},
        cancel: async (requestId: number) => {},
        updateDeck: async () => {},
        realizePacks: async () => {}
    }
})


export function DataProvider ({ children }: PropsWithChildren) {

    const [token, setToken] = useToken();
    const [user, setUser] = useState<Person | null>(null)
    
    const [rankings, setRankings] = useState<GetRankingResponse['rankings'] | null>(null)
    const [politicians, setPoliticians] = useState<GetRankingResponse['politicians'] | null>(null)
    const [politicianRecords, setPoliticianRecords] = useState<GetRankingResponse['politicianRecords'] | null>(null)
    const [partyRecords, setPartyRecords] = useState<GetRankingResponse['partyRecords'] | null>(null)
    const [states, setStates] = useState<GetRankingResponse['states'] | null>(null)
    const [parties, setParties] = useState<GetRankingResponse['parties'] | null>(null)
    const [album, setAlbum] = useState<GetDeckResponse['album'] | null>(null)
    const [pages, setPages] = useState<GetDeckResponse['pages'] | null>(null)
    const [stickers, setStickers] = useState<GetDeckResponse['stickers'] | null>(null)
    const [cards, setCards] = useState<GetDeckResponse['cards'] | null>(null)
    const [packs, setPacks] = useState<GetDeckResponse['packs'] | null>(null)
    const [exchangeRequests, setExchangeRequests] = useState<GetDeckResponse['exchangeRequests'] | null>(null)
    const [pagesByParties, setPagesByParties] = useState<GetDeckResponse['pagesByParties']>([])
    const [pagesByStates, setPagesByStates] = useState<GetDeckResponse['pagesByStates']>([])
    
    const [showAppHeader, setShowAppHeader] = useState<boolean>(true);
    const [showAppFooterNavDismiss, setShowAppFooterNav] = useState<boolean>(false);
    const [limitWidth, setLimitWidth] = useState<boolean>(false);
    const [section, setSection] = useState<string | null>(null);

    const showAppFooterNav = user ? true : false;

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };

    // when token changes: if there is token get user / if not, set user to null
    useEffect(()=>{
        if (token) {
            getUserData();
        } else {
            clearAuth();
        }
    }, [token])

    // get ranking data
    useEffect(()=>{
        if (!rankings) {
            getRankingData();
        }
    }, [])

    // if ranking or user changes, if there is both, get album data
    useEffect(()=>{
        if (rankings && user) {
            getDeckData();
        } else {
            clearDeckData();
        }
    }, [rankings, user])


    const auth = {
        token, setToken,
        user, setUser,
    }

    const content = {
        rankings, setRankings,
        politicians, setPoliticians,
        politicianRecords, setPoliticianRecords,
        partyRecords, setPartyRecords,
        states, setStates,
        parties, setParties,
        album, setAlbum,
        pages, setPages,
        stickers, setStickers,
        cards, setCards,
        packs, setPacks,
        exchangeRequests, setExchangeRequests,
        pagesByParties, pagesByStates
    }

    const app = {
        showAppHeader, setShowAppHeader,
        showAppFooterNav, setShowAppFooterNav,
        limitWidth, setLimitWidth,
        section, setSection
    }

    const hooks = {
        logOut,
        pasteCard,
        pasteAllCards,
        openPack,
        openPacks,
        toggleCard,
        accept,
        reject,
        cancel,
        updateDeck,
        realizePacks
    }
    
    return <DataContext.Provider value={{auth, content, app, hooks}}>{children}</DataContext.Provider>


    // ------------------------------------------------------------------


    async function getUserData() {
        try {
            const res = await api.getUser();
            setUser(res);
        } catch (error) {
            clearAuth();
        }
    }

    async function getRankingData() {
        try {
            const res = await api.getRanking();
            setRankingData(res);
        } catch (error) {
            clearRankingData();
        }
    }

    async function getDeckData() {
        try {
            const res = await api.getDeck();
            setDeckData(res);
        } catch (error) {
            clearDeckData();
        }
    }

    function setRankingData(rankingResponse: GetRankingResponse) {
        setRankings(rankingResponse.rankings);
        setPoliticians(rankingResponse.politicians);
        setPoliticianRecords(rankingResponse.politicianRecords);
        setPartyRecords(rankingResponse.partyRecords);
        setStates(rankingResponse.states);
        setParties(rankingResponse.parties);
    }

    function setDeckData(deckResponse: GetDeckResponse) {
        setAlbum(deckResponse.album);
        setPages(deckResponse.pages);
        setStickers(deckResponse.stickers);
        setCards(deckResponse.cards);
        setPacks(deckResponse.packs);
        setExchangeRequests(deckResponse.exchangeRequests);
        setPagesByParties(deckResponse.pagesByParties)
        setPagesByStates(deckResponse.pagesByStates)
    }

    function clearRankingData() {
        setRankings(null);
        setPoliticians(null);
        setPoliticianRecords(null);
        setPartyRecords(null);
        setStates(null);
        setParties(null);
    }

    function clearDeckData() {
        setAlbum(null);
        setPages(null);
        setStickers(null);
        setCards(null);
        setPacks(null);
        setExchangeRequests(null);
        setPagesByParties([])
        setPagesByStates([])
    }

    function clearAuth() {
        setToken(null);
        setUser(null);
    }

    // ------------------------------------------------------------------

    async function logOut() {
        setUser(null);
        setToken(null);
    }

    async function pasteCard(id: number) {
        await api.pasteCard(id);
        await getDeckData();
    }

    async function pasteAllCards() {
        await api.pasteAll();
        await getDeckData();
    }

    async function openPack() {
        await api.openOnePack();
        await getDeckData();
    }

    async function openPacks() {
        await api.openAllPacks();
        await getDeckData();
    }

    async function toggleCard(id: number) {
        await api.toggleMark(id);
        await getDeckData();
    }

    async function accept (id: number) {
        await api.acceptRequest(id);
        await getDeckData();
    }
    async function reject (id: number) {
        await api.rejectRequest(id);
        await getDeckData();
    }
    async function cancel (id: number) {
        await api.cancelRequest(id);
        await getDeckData();
    }

    async function updateDeck() {
        await getDeckData();
    }

    async function realizePacks() {
        await api.realizePacks();
        await getDeckData();
    }

}









