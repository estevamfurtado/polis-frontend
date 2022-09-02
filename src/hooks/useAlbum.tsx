import { useEffect, useState } from "react"
import {GetAlbumResponse, GetDeckResponse} from "../types";
import * as api from "../services/reqs"


export default function useAlbum(immediate = true) {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [wasInitiated, setWasInitiated] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const [album, setAlbum] = useState<GetAlbumResponse['album'] | null>(null)
    const [pages, setPages] = useState<GetAlbumResponse['pages'] | null>(null)
    const [stickers, setStickers] = useState<GetAlbumResponse['stickers'] | null>(null)
    const [pagesByParties, setPagesByParties] = useState<GetAlbumResponse['pagesByParties']>([])
    const [pagesByStates, setPagesByStates] = useState<GetAlbumResponse['pagesByStates']>([])
    
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
            const res = await api.getAlbum();
            setAlbumData(res);
            if (!wasInitiated) {setWasInitiated(true)}
            setIsLoading(false);
        } catch (error) {
            clearAlbumData();
            setError(error);
            setIsLoading(false);
        }
    }

    function setAlbumData(albumResponse: GetAlbumResponse) {
            
        setAlbum(albumResponse.album);
        setPages(albumResponse.pages);
        setStickers(albumResponse.stickers);
        setPagesByParties(albumResponse.pagesByParties)
        setPagesByStates(albumResponse.pagesByStates)
    }

    function clearAlbumData() {
        setAlbum(null);
        setPages(null);
        setStickers(null);
        setPagesByParties([])
        setPagesByStates([])
    }

}



export const initialAlbum : ReturnType<typeof useAlbum> = {
    status: {isLoading: false, error: null, wasInitiated: false},
    data: {
        album: null, pages: null, stickers: null,
        pagesByParties: [], pagesByStates: []
    },
    actions: {
        updateAlbumData: async ()=>{},
    }
}