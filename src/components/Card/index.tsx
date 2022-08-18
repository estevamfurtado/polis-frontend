import Sticker from "../Sticker";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { Card } from "../../types";

export default function CardComponent ({cardId, w, h} : {
    cardId: number,
    w?: number,
    h?: number
}) {

    const {content: {cards}} = useContext(DataContext);
    const card = cards?.cards[cardId] ?? null;
    if (!card) {
        return <></>
    }

    return <Sticker stickerId={card.stickerId}
        w={w} h={h}
    />;
}