import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { DataContext } from "../DataContext"
import {CompleteRanking, CompleteRecord, RankingGroup} from "../../types"



type RankingContextValues = {
    search: string

    showBad: boolean
    showNeutral: boolean
    showGood: boolean

    groupBy: "party" | "position"
    showPartyRanking: boolean

    showState: string
    groups: RankingGroup[]

    setSearch: (input: string) => void
    setShowBad: (input: boolean) => void
    setShowNeutral: (input: boolean) => void
    setShowGood: (input: boolean) => void
    setGroupBy: (input: "party" | "tier") => void
    setShowPartyRanking: (input: boolean) => void
    setShowState: (input: string) => void
}

export const RankingContext = createContext<RankingContextValues>({
    search: "",
    showBad: true,
    showNeutral: true,
    showGood: true,
    groupBy: "party",
    showPartyRanking: true,
    showState: "",
    setSearch: (input: string) => {},
    setShowBad: (input: boolean) => {},
    setShowNeutral: (input: boolean) => {},
    setShowGood: (input: boolean) => {},
    setGroupBy: (input: "party" | "tier") => {},
    setShowPartyRanking: (input: boolean) => {},
    setShowState: (input: string) => {},
    groups: []
})


export function RankingProvider ({ children }: PropsWithChildren) {

    const {data: {completeRanking}} = useContext(DataContext);

    const [search, setSearch] = useState("");
    const [showBad, setShowBad] = useState(true);
    const [showNeutral, setShowNeutral] = useState(true);
    const [showGood, setShowGood] = useState(true);
    const [groupBy, setGroupBy] = useState("party");
    const [showPartyRanking, setShowPartyRanking] = useState(false);
    const [showState, setShowState] = useState("");

    const searchIsValid = search.length > 0;
    const stateIsValid = statesAbbreviations.find(state => state === showState) ? true : false;

    const [partiesFiltered, tiersFiltered] = processRanking(completeRanking);
    const groups = groupBy === "party" ? partiesFiltered : tiersFiltered;

    const pass = {
        search, setSearch,
        showState, setShowState,
        showBad, setShowBad,
        showNeutral, setShowNeutral,
        showGood, setShowGood,
        
        groupBy, setGroupBy,
        groups,

        showPartyRanking, setShowPartyRanking,
    } as RankingContextValues;

    return (
        <RankingContext.Provider value={pass}>
            {children}
        </RankingContext.Provider>
    )

    function processRanking (ranking: CompleteRanking | null) {

        if (!ranking) {return [[],[]]};

        const {records} = ranking;
        const parties: RankingGroup[] = ranking.partyRecords.map(pr => {
            return {
                title: pr.partyAbbreviation,
                color: pr.party.mainColor || "gray.200",
                records: []
            }
        })
        const tiers: RankingGroup[] = [
            {title: "Top 10", color: "green.500", records: []},
            {title: "Top 50", color: "green.500", records: []},
            {title: "Top 100", color: "green.500", records: []},
            {title: "Top 300", color: "purple.500", records: []},
            {title: "Outros", color: "red.500", records: []},
        ]

        // const orderedRecords = records.sort((a, b) => {
        //     return (b.scoreRanking ?? 0) - (a.scoreRanking ?? 0);
        // })

        for (const r of records) {
            const show = showRecord(r);
            if (show) {
                tiers[tier(r)]?.records.push(r);
                parties.find(p => p.title === r.partyAbbreviation)?.records.push(r);
            }
        }

        return [parties, tiers]

        function tier (record: CompleteRecord) {
            const {scoreRanking} = record;
            if (scoreRanking) {
                if (scoreRanking <= 10) {
                    return 0;
                } else if (scoreRanking <= 50) {
                    return 1;
                } else if (scoreRanking <= 100) {
                    return 2;
                } else if (scoreRanking <= 300) {
                    return 3;
                }
            }
            return 4;
        }

        function showRecord (r: CompleteRecord) {
            let show = true;
            if (searchIsValid) {
                show = r.politician.name.toLowerCase().includes(search.toLowerCase());
            } else {
                if (stateIsValid) {show = r.stateAbbreviation === showState;}
                if (show) {
                    if ((r.scoreTotal ?? 0) < 6.5) {show = showBad}
                    else if ((r.scoreTotal ?? 0) < 7.5) {show = showNeutral}
                    else {show = showGood}
                }
            }
            return show;
        }
    }
}

const statesAbbreviations = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
]