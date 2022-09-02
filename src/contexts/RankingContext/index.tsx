import { createContext, PropsWithChildren } from "react"
import useRanking, { initialRanking } from "../../hooks/useRanking"

type ContextValues = {
    rankingData: ReturnType<typeof useRanking>
}

export const RankingContext = createContext<ContextValues>({
    rankingData: initialRanking
})

export function RankingProvider ({ children }: PropsWithChildren) {

    const rankingData = useRanking();

    const values : ContextValues = {rankingData}

    return <RankingContext.Provider value={values}>
        {children}
    </RankingContext.Provider>
}