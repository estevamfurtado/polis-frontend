import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap} from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import AlbumBrief from "../../components/AlbumBrief";
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
        return <></>
    }

    const stickers = completeAlbum?.pages.map(page => page.stickers).flat();

    const toPasteHT : {[key: number]: boolean} = {};
    const newCards : CompleteCard[] = []
    const pasteableCards : CompleteCard[] = []
    const exchangeCards : CompleteCard[] = []
    const favoriteCards : CompleteCard[] = []

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
        } else {
            exchangeCards.push(completeCard);
            if (!isExchangeable) {
                favoriteCards.push(completeCard);
            }
        }
    }

    return <Flex w='100%' h='100%' overflowX={'hidden'} direction='column' align='center'>
        <VStack spacing={4} w='100%' py='10' maxW='750px'>
            {cardsPanel()}
        </VStack>
    </Flex>

    function cardsSection(cards: CompleteCard[]) {
        return <Wrap w='100%' justify='center' p='5'>
            {cards.map(card => {
                return <CardInDeckPage key={card.id} card={card}/>
            })}
        </Wrap>
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
                    <Tab fontWeight={'semibold'}>{`Repetidas (${exchangeCards.length})`}</Tab>
                    <Tab fontWeight={'semibold'}>{`Favoritas (${favoriteCards.length})`}</Tab>
                    <Tab fontWeight={'semibold'}>{`Visão geral`}</Tab>
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
                        {cardsSection(exchangeCards)}
                    </TabPanel>
                    <TabPanel w='100%'>
                        {cardsSection(favoriteCards)}
                    </TabPanel>
                    <TabPanel w='100%'>
                        <AlbumBrief/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
    }
}