import Sticker from "../Sticker";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { Card } from "../../types";

export default function CardComponent ({cardId} : {cardId: number}) {

    const {content: {cards}} = useContext(DataContext);
    const card = cards?.cards[cardId] ?? null;
    if (!card) {
        return <></>
    }

    return <Sticker stickerId={card.stickerId} />;
}