import { useEffect, useState } from "react"
import {GetDeckResponse} from "../types";
import * as api from "../services/reqs"


export default function useDeck(immediate = true) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [wasInitiated, setWasInitiated] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const [cards, setCards] = useState<GetDeckResponse['cards'] | null>(null);
    const [packs, setPacks] = useState<GetDeckResponse['packs'] | null>(null);
    const [exchangeRequests, setExchangeRequests] = useState<GetDeckResponse['exchangeRequests'] | null>(null);

    
    useEffect(()=>{
        if (immediate) updateDeck()
    }, [])

    return {
        status: {isLoading, error, wasInitiated},
        data: {cards, packs, exchangeRequests},
        actions: {
            updateDeck,
            pasteCard, pasteAllCards,
            openPack, openPacks,
            toggleCard, 
            accept, reject, cancel, 
            realizePacks
        }
    }

    async function updateDeck() {
        setError(null);
        setIsLoading(true);
        try {
            const res = await api.getDeck();
            setDeckData(res);
            if (!wasInitiated) {setWasInitiated(true)}
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
            clearDeckData();
        }
    }

    function setDeckData(deckResponse: GetDeckResponse) {
        setCards(deckResponse.cards);
        setPacks(deckResponse.packs);
        setExchangeRequests(deckResponse.exchangeRequests);
    }

    function clearDeckData() {
        setCards(null);
        setPacks(null);
        setExchangeRequests(null);
    }

    async function pasteCard(id: number) {
        await api.pasteCard(id);
        await updateDeck();
    }

    async function pasteAllCards() {
        await api.pasteAll();
        await updateDeck();
    }

    async function openPack() {
        await api.openOnePack();
        await updateDeck();
    }

    async function openPacks() {
        await api.openAllPacks();
        await updateDeck();
    }

    async function toggleCard(id: number) {
        await api.toggleMark(id);
        await updateDeck();
    }

    async function accept (id: number) {
        await api.acceptRequest(id);
        await updateDeck();
    }

    async function reject (id: number) {
        await api.rejectRequest(id);
        await updateDeck();
    }

    async function cancel (id: number) {
        await api.cancelRequest(id);
        await updateDeck();
    }

    async function realizePacks() {
        await api.realizePacks();
        await updateDeck();
    }

}


export const initialDeck : ReturnType<typeof useDeck> = {
    status: {isLoading: false, error: null, wasInitiated: false},
    data: {cards: null, packs: null, exchangeRequests: null},
    actions: {
        updateDeck: async ()=>{},
        pasteCard: async ()=>{}, pasteAllCards: async ()=>{},
        openPack: async ()=>{}, openPacks: async ()=>{},
        toggleCard: async ()=>{}, 
        accept: async ()=>{}, reject: async ()=>{}, cancel: async ()=>{}, 
        realizePacks: async ()=>{}
    }
}