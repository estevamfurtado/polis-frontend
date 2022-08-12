import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap} from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import Card from "../../components/Card";
import StickerPack from "../../components/StickerPack";
import { DataContext } from "../../contexts/DataContext"
import { CompleteCard, CompleteSticker } from "../../types";
import CardInDeckPage from "./CardInDeckPage";


export default function DeckPage() {

    const {data: {deck, completeAlbum}, hooks: {getDeckData, openPack, openPacks, pasteAllCards}} = useContext(DataContext);

    useEffect(()=>{
        if (!deck) {
            getDeckData();
        }
    }, [completeAlbum])

    if (!deck || !completeAlbum) {
        return <>nao tem deck ou album</>
    }

    const stickers = completeAlbum?.pages.map(page => page.stickers).flat();

    const toPasteHT : {[key: number]: boolean} = {};
    const newCards : CompleteCard[] = []
    const pasteableCards : CompleteCard[] = []
    const exchangeCards : CompleteCard[] = []
    const otherRepeatedCards : CompleteCard[] = []

    for (const cardId of deck?.deck.cards.arrays.notPasted ?? []) {
        const card = deck?.deck.cards.byId[cardId];
        const sticker = stickers?.find(sticker => sticker.id === card?.stickerId) as CompleteSticker;
        const completeCard = {...card, sticker} as CompleteCard;

        const time = new Date(card.createdAt);
        const isNew = time.getTime() > new Date().getTime() - 1000 * 60 * 60;
        const isPasteable = deck.deck.stickers.byId[card.stickerId].pasted.length === 0 && toPasteHT[card.stickerId] === undefined;
        if (isPasteable) {toPasteHT[card.stickerId] = true}
        const isExchangeable = card.forExchange;

        if (isNew) {
            newCards.push(completeCard);
        } 
        if (isPasteable) {
            pasteableCards.push(completeCard);
        } else if (isExchangeable) {
            exchangeCards.push(completeCard);
        } else {
            otherRepeatedCards.push(completeCard);
        }
    }

    const hasPacksMessage = <>
        <Text>{`Você tem +${deck.packs} pacotes`}</Text>
        <HStack align='start'>
            <Button size='sm' onClick={openOnePack}>Abrir +1</Button>
            <Button size='sm' onClick={openAllPacks}>Abrir todos</Button>
        </HStack>
    </>

    return <Flex w='100%' h='100%' overflowX={'hidden'} direction='column' align='center'>
        <VStack spacing={4} w='100%' py='10' maxW='750px'>
            {packsArea()}
            {cardsPanel()}
        </VStack>
    </Flex>

    async function openOnePack() {
        console.log('calling handler')
        await openPack();
    }
    async function openAllPacks() {
        await openPacks();
    }

    function cardsSection(cards: CompleteCard[]) {
        return <Wrap w='100%' justify='center' p='5'>
            {cards.map(card => {
                return <CardInDeckPage key={card.id} card={card}/>
            })}
        </Wrap>
    }

    function packsArea() {
        return <HStack w='100%' py='5' spacing='10' justify='center'>
        <HStack pl='5' flex='0 0 auto' spacing='7'>
            <StickerPack/>

            <VStack align='start' spacing='5'>

                <VStack align='start'>
                {(deck?.packs ?? 0)> 0 ? hasPacksMessage : <></>}
                </VStack>

                <VStack align='start'>
                    <Text>{`Ganhe novos pacotes`}</Text>
                    <HStack align='start'>
                        <Button size='sm'>DepuTinder</Button>
                        <Button size='sm'>SuperPolis</Button>
                    </HStack>
                </VStack>

            </VStack>
        </HStack>
    </HStack>
    }

    async function pasteAll() {
        await pasteAllCards();
    }

    function cardsPanel() {

        const pasteAllButton = <Button size='sm' onClick={pasteAll}>Colar tudo!</Button>

        return <Tabs w='100%' variant='enclosed' borderColor='gray.200' size='sm'>
                <TabList>
                    <Tab fontWeight={'semibold'}>{`Novas (${newCards.length})`}</Tab>
                    <Tab fontWeight={'semibold'}>{`Colar (${pasteableCards.length})`}</Tab>
                    <Tab fontWeight={'semibold'}>{`Guardar (${otherRepeatedCards.length})`}</Tab>
                    <Tab fontWeight={'semibold'}>{`Trocar (${exchangeCards.length})`}</Tab>
                </TabList>

                <TabPanels w='100%' minH='500px'>
                    <TabPanel w='100%'>
                        {newCards.length > 0 ? pasteAllButton : <></>}
                        {cardsSection(newCards)}
                    </TabPanel>
                    <TabPanel w='100%'>
                        {pasteableCards.length > 0 ? pasteAllButton : <></>}
                        {cardsSection(pasteableCards)}
                    </TabPanel>
                    <TabPanel w='100%'>
                        {cardsSection(otherRepeatedCards)}
                    </TabPanel>
                    <TabPanel w='100%'>
                        {cardsSection(exchangeCards)}
                    </TabPanel>
                </TabPanels>
            </Tabs>
    }
}