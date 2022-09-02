import { createContext, PropsWithChildren } from "react"
import useDeck, { initialDeck } from "../../hooks/useDeck"

type ContextValues = {
    deckData: ReturnType<typeof useDeck>
}

export const DeckContext = createContext<ContextValues>({
    deckData: initialDeck
})

export function DeckProvider ({ children }: PropsWithChildren) {

    const deckData = useDeck();

    const values : ContextValues = {deckData}

    return <DeckContext.Provider value={values}>
        {children}
    </DeckContext.Provider>
}