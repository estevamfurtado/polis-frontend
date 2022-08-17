import Sticker from "../Sticker";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { Card } from "../../types";

export default function CardComponent ({card} : {card: Card}) {
    return <Sticker stickerId={card.stickerId} />;
}