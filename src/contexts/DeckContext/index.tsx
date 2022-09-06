import { createContext, PropsWithChildren, useContext, useEffect } from "react"
import useDeck, { initialDeck } from "../../hooks/useDeck"
import { AuthContext } from "../AuthContext"

type ContextValues = {
    deckData: ReturnType<typeof useDeck>
}

export const DeckContext = createContext<ContextValues>({
    deckData: initialDeck
})

export function DeckProvider ({ children }: PropsWithChildren) {

    const {authData: {data: {token}}} = useContext(AuthContext)

    const deckData = useDeck();

    useEffect(()=>{
        if (token) {
            console.log('mudou o token')
            deckData.actions.updateDeck();
        }
    },[token])

    const values : ContextValues = {deckData}

    return <DeckContext.Provider value={values}>
        {children}
    </DeckContext.Provider>
}