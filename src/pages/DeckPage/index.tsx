import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap} from "@chakra-ui/react";
import { useContext } from "react"
import AlbumBrief from "../../components/AlbumBrief";
import { DataContext } from "../../contexts/DataContext"
import CardInDeckPage from "./CardInDeckPage";


export default function DeckPage() {

    const {content: {cards}, hooks: {pasteAllCards}} = useContext(DataContext);

    if (!cards) {return <></>}

    return <Flex w='100%' h='100%' overflowX={'hidden'} direction='column' align='center'>
        <VStack spacing={4} w='100%' py='10' maxW='750px'>
            {cardsPanels()}
        </VStack>
    </Flex>

    function cardsPanels() {

        if (!cards) {return <></>}

        return <Tabs w='100%' variant='enclosed' borderColor='gray.200' size='sm'>
            <TabList w='100%' overflowX={'scroll'}>
                <Tab fontWeight={'semibold'}>{`Recentes (${cards.deck.notPasted.recent.length})`}</Tab>
                <Tab fontWeight={'semibold'}>{`Novas (${cards.deck.notPasted.new.length})`}</Tab>
                <Tab fontWeight={'semibold'}>{`Repetidas (${cards.deck.notPasted.repeated.length})`}</Tab>
                <Tab fontWeight={'semibold'}>{`Favoritas (${cards.deck.notPasted.favorites.length})`}</Tab>
                <Tab fontWeight={'semibold'}>{`Geral`}</Tab>
            </TabList>

            <TabPanels w='100%' minH='500px'>
                <TabPanel w='100%'>
                    {cardsSection(cards.deck.notPasted.recent)}
                </TabPanel>
                <TabPanel w='100%'>
                    <Button size='sm' onClick={pasteAllCards}>Colar tudo!</Button>
                    {cardsSection(cards.deck.notPasted.new)}
                </TabPanel>
                <TabPanel w='100%'>
                    {cardsSection(cards.deck.notPasted.repeated)}
                </TabPanel>
                <TabPanel w='100%'>
                    {cardsSection(cards.deck.notPasted.favorites)}
                </TabPanel>
                <TabPanel w='100%'>
                    <AlbumBrief/>
                </TabPanel>
            </TabPanels>
        </Tabs>

        function cardsSection(cardIds: number[]) {
            return <Wrap w='100%' justify='center' p='5'>
                {cardIds.map(cardId => {
                    return <CardInDeckPage key={cardId} cardId={cardId}/>
                })}
            </Wrap>
        }
    }
}