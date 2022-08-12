
import { Badge, Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { CompleteCard } from "../../types";
import PoliticianSticker from "../PoliticianSticker";
import PartySticker from "../PartySticker";
import Sticker from "../Sticker";

export default function Card({card} : {card: CompleteCard}) {

    const model = <Sticker sticker={card.sticker} />;

    return model;
}