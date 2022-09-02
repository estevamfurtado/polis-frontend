import Sticker from "../Sticker";
import { useContext } from "react";
import { DeckContext } from "../../contexts/DeckContext";

export default function CardComponent ({cardId, w, h} : {
    cardId: number,
    w?: number,
    h?: number
}) {

    const {deckData: {data: {cards}}} = useContext(DeckContext);
    const card = cards?.cards[cardId] ?? null;
    if (!card) {
        return <></>
    }

    return <Sticker stickerId={card.stickerId}
        w={w} h={h}
    />;
}