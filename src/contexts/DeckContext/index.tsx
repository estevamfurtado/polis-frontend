import { createContext, PropsWithChildren } from "react"
import useDeck from "../../hooks/useDeck"

type ContextValues = {
    deckData: ReturnType<typeof useDeck>
}

export const DeckContext = createContext<ContextValues>({
    deckData: useDeck()
})

export function DeckProvider ({ children }: PropsWithChildren) {

    const deckData = useDeck();

    const values : ContextValues = {deckData}

    return <DeckContext.Provider value={values}>
        {children}
    </DeckContext.Provider>
}