import { CircularProgress, CircularProgressLabel, HStack } from "@chakra-ui/react"
import { useContext } from "react"
import { AlbumContext } from "../../../contexts/AlbumContext";
import { DeckContext } from "../../../contexts/DeckContext";


export default function Progress ({fontSize, size} : {fontSize: string, size: string}) {
    
    const {deckData: {data: {cards}}} = useContext(DeckContext);
    const {albumData: {data: {stickers}}} = useContext(AlbumContext);

    const iHave = cards ? Object.keys(cards.bySticker).filter(sId => {
        return cards.bySticker[Number(sId)].all.length > 0
    }).length : 0;

    const total = stickers ? Object.keys(stickers).length : 1;

    const progressValue = iHave / total;
    
    return <HStack justify={'center'} align='center' h='100%'>
        <CircularProgress value={progressValue*100} color='blue.400' size={size} trackColor='gray.700' capIsRound={true}>
            <CircularProgressLabel fontSize={fontSize}>{
                `${Math.round(progressValue*100)}%`
            }</CircularProgressLabel>
        </CircularProgress>
    </HStack>
}