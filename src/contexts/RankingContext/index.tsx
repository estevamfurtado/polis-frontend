import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { DataContext } from "../DataContext"
import {CompleteRanking, CompleteRecord, RankingGroup} from "../../types"
import variables from "../../services/variables"



type RankingContextValues = {
    search: string

    showBad: boolean
    showNeutral: boolean
    showGood: boolean

    groupBy: "party" | "position"
    showPartyRanking: boolean

    showState: string
    groups: RankingGroup[]

    filterState: boolean
    filterSearch: boolean

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
    groups: [],
    filterState: false,
    filterSearch: false,
})


export function RankingProvider ({ children }: PropsWithChildren) {

    const {content: {rankings}} = useContext(DataContext);

    const [groupBy, setGroupBy] = useState("party");
    const [showBad, setShowBad] = useState(true);
    const [showNeutral, setShowNeutral] = useState(true);
    const [showGood, setShowGood] = useState(true);
    const [showPartyRanking, setShowPartyRanking] = useState(false);
    const [showState, setShowState] = useState("");
    const [search, setSearch] = useState("");

    const filterState = statesAbbreviations.filter(state => state === showState).length > 0;
    const filterSearch = search.trim().length > 0;

    const groups = (groupBy === "party" ? rankings?.parties : rankings?.ranking) ?? [];

    const pass = {
        search: search.trim(), setSearch,
        showState, setShowState,
        showBad, setShowBad,
        showNeutral, setShowNeutral,
        showGood, setShowGood,
        groupBy, setGroupBy,
        groups,

        filterState, filterSearch,

        showPartyRanking, setShowPartyRanking,
    } as RankingContextValues;

    return (
        <RankingContext.Provider value={pass}>
            {children}
        </RankingContext.Provider>
    )
}

const statesAbbreviations = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
]