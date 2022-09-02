import { useEffect, useState } from "react"
import * as api from "../services/reqs"

import {
    GetRankingResponse,
} from "../types"

export default function useRanking(immediate = true) {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [wasInitiated, setWasInitiated] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const [rankings, setRankings] = useState<GetRankingResponse['rankings'] | null>(null)
    const [politicians, setPoliticians] = useState<GetRankingResponse['politicians'] | null>(null)
    const [politicianRecords, setPoliticianRecords] = useState<GetRankingResponse['politicianRecords'] | null>(null)
    const [partyRecords, setPartyRecords] = useState<GetRankingResponse['partyRecords'] | null>(null)
    const [states, setStates] = useState<GetRankingResponse['states'] | null>(null)
    const [parties, setParties] = useState<GetRankingResponse['parties'] | null>(null)

    useEffect(()=>{
        if (immediate) updateRankingData();
    }, [])

    return {
        status: {isLoading, error, wasInitiated},
        data: {
            rankings, politicians, politicianRecords, partyRecords, states, parties,
        },
        actions: {
            updateRankingData
        },
    }

    async function updateRankingData() {
        setError(null);
        setIsLoading(true);
        try {
            const res = await api.getRanking();
            setRankingData(res);
            if (!wasInitiated) {setWasInitiated(true)}
            setIsLoading(false);
        } catch (error) {
            clearRankingData();
            setError(error);
            setIsLoading(false);
        }
    }

    function setRankingData(rankingResponse: GetRankingResponse) {
        setRankings(rankingResponse.rankings);
        setPoliticians(rankingResponse.politicians);
        setPoliticianRecords(rankingResponse.politicianRecords);
        setPartyRecords(rankingResponse.partyRecords)
        setStates(rankingResponse.states)
        setParties(rankingResponse.parties)
    }

    function clearRankingData() {
        setRankings(null);
        setPoliticians(null);
        setPoliticianRecords(null);
        setPartyRecords(null)
        setStates(null)
        setParties(null)
    }

}