import { createContext, PropsWithChildren } from "react"
import useRanking from "../../hooks/useRanking"

type ContextValues = {
    rankingData: ReturnType<typeof useRanking>
}

export const RankingContext = createContext<ContextValues>({
    rankingData: useRanking()
})

export function RankingProvider ({ children }: PropsWithChildren) {

    const rankingData = useRanking();

    const values : ContextValues = {rankingData}

    return <RankingContext.Provider value={values}>
        {children}
    </RankingContext.Provider>
}