import { useEffect, useState } from "react"
import {GetDeckResponse} from "../types";
import * as api from "../services/reqs"


export default function useAlbum(immediate = true) {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [wasInitiated, setWasInitiated] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const [album, setAlbum] = useState<GetDeckResponse['album'] | null>(null)
    const [pages, setPages] = useState<GetDeckResponse['pages'] | null>(null)
    const [stickers, setStickers] = useState<GetDeckResponse['stickers'] | null>(null)
    const [pagesByParties, setPagesByParties] = useState<GetDeckResponse['pagesByParties']>([])
    const [pagesByStates, setPagesByStates] = useState<GetDeckResponse['pagesByStates']>([])
    
    useEffect(()=>{
        if (immediate) updateAlbumData();
    }, [])

    return {
        status: {isLoading, error, wasInitiated},
        data: {album, pages, stickers, pagesByParties, pagesByStates,},
        actions: {
            updateAlbumData
        }
    }

    async function updateAlbumData() {
        setError(null);
        setIsLoading(true);
        try {
            const res = await api.getDeck();
            setAlbumData(res);
            if (!wasInitiated) {setWasInitiated(true)}
            setIsLoading(false);
        } catch (error) {
            clearAlbumData();
            setError(error);
            setIsLoading(false);
        }
    }

    function setAlbumData(deckResponse: GetDeckResponse) {
        setAlbum(deckResponse.album);
        setPages(deckResponse.pages);
        setStickers(deckResponse.stickers);
        setPagesByParties(deckResponse.pagesByParties)
        setPagesByStates(deckResponse.pagesByStates)
    }

    function clearAlbumData() {
        setAlbum(null);
        setPages(null);
        setStickers(null);
        setPagesByParties([])
        setPagesByStates([])
    }

}