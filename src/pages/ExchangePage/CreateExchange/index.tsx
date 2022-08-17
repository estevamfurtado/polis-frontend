import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, Input, Badge} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../../contexts/DataContext"
import { MyDeck, CompleteSticker } from "../../../types";
import * as api from "../../../services/reqs";


type UserInfo = {
    id: number;
    email: string;
    name: string;
}


export default function CreateExchange() {

    const {content: {cards, stickers, pages}, hooks: {openPack, openPacks, pasteAllCards}} = useContext(DataContext);

    if (!cards || !stickers || !pages) {
        return <></>
    }

    const [text, setText] = useState('');
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [userDeck, setUserDeck] = useState<MyDeck | null>(null);


    return <VStack w='100%' align='center'>
        <SearchPerson/>
        {userDeck && userInfo ? <NewRequest/> : <></>}
    </VStack>


    function SearchPerson() {
        
        const [users, setUsers] = useState<UserInfo[]>([]);
        
        return <VStack w='70%' align='center' spacing='0'>
            <Input borderColor='gray.400' placeholder='Procurar email...' value={text} onChange={(e)=>searchUsers(e.target.value)}/>
            <VStack boxShadow='lg' bg='white' borderBottomRadius={'lg'}>
                {users.map(user => {
                    return <HStack key={user.id} onClick={()=>{selectUser(user)}} cursor='pointer' w='100%' px='3' py='2' _hover={{backgroundColor: 'gray.100'}}>
                        <Text fontSize='sm'>{user.name}</Text>
                        <Text color='gray.400' fontSize='sm'>{user.email}</Text>
                    </HStack>
                })}
            </VStack>
        </VStack>

        async function searchUsers(email: string) {
            setText(email);
            if (email && email.length > 0) {
                const response = await api.searchUser(email);
                setUsers(response.data);
            }
            else {
                setUsers([]);
            }
        }

        async function selectUser(info: UserInfo) {
            setUserInfo(info);
            const response = await api.getUserDeck(info.id);
            setUserDeck(response.data);
            setText('');
            setUsers([]);
        }
    }


    function NewRequest () {

        if (!userInfo || !userDeck || !stickers || !pages || !cards) {
            return <></>
        }

        const [offeredCards, setOfferedCards] = useState<number[]>([]);
        const [requestedCards, setRequestedCards] = useState<number[]>([]);
        const [cardsYouHaveHeNeeds, cardsHeHasYouNeed] = compareAlbum();

        return <VStack w='100%' align='center'>
            <Heading fontSize='xl'>{userInfo.name}</Heading>
            <HStack w='100%' spacing='3'>
                <CompareAlbumBrief />
            </HStack>
            <SendRequestButton />
        </VStack>  
    
        function compareAlbum() {
            
            if (!userInfo || !userDeck || !stickers || !pages || !cards) {
                return [[],[]];
            }

            const cardsYouHaveHeNeeds : {id: number, identifier: string}[] = [];
            const cardsHeHasYouNeed : {id: number, identifier: string}[] = [];
    
            const lineStickers = Object.keys(stickers);

            lineStickers.forEach(sId => {
                const id = parseInt(sId);
                const sticker = stickers[id] ?? null;
                if (sticker) {
                    const identifier = sticker.identifier;

                    const myCards = sticker.cards;
                    const userCards = userDeck.deck.stickers.byId[id] ?? null;
        
                    const iNeed = myCards.all.length === 0;
                    const iHave = myCards.notPasted.repeated.length > 0;
                    const myCard = iHave ? myCards.notPasted.repeated[0] : null;
        
                    const heNeeds = userCards ? false : true;
                    const heHas = userCards ? userCards.notPasted.length > 0 : false;
                    const hisCard = heHas ? userCards.notPasted[0] : null;
        
                    
                    if (iHave && heNeeds && myCard) {
                        cardsYouHaveHeNeeds.push({
                            id: myCard,
                            identifier
                        });
                    }
                    if (iNeed && heHas && hisCard) {
                        cardsHeHasYouNeed.push({
                            id: hisCard,
                            identifier
                        });
                    }
                }
            });
    
            return [cardsYouHaveHeNeeds, cardsHeHasYouNeed];
        }
    
        function CompareAlbumBrief() {
            return <HStack w='100%' align='start'>
                <VStack w='50%'>
                    <Heading fontSize='md'>Você tem e ele precisa</Heading>
                    <WrappedCards cardIds={cardsYouHaveHeNeeds} cardArray={offeredCards} setCardArray={setOfferedCards} />
                </VStack>
                <VStack w='50%'>
                    <Heading fontSize='md'>Ele tem e você precisa</Heading>
                    <WrappedCards cardIds={cardsHeHasYouNeed} cardArray={requestedCards} setCardArray={setRequestedCards} />
                </VStack>
            </HStack>
        }
    
        function WrappedCards ({cardIds, cardArray, setCardArray} : {cardIds: {id: number, identifier: string}[], cardArray: number[], setCardArray: (cards: number[]) => void}) {
    
            return <Wrap w='100%' spacing='2'>
                {
                    cardIds.map(c => {
                        const isSelected = cardArray.includes(c.id);
                        return <Card key={c.id} cardId={c.id} badge={c.identifier} isSelected={isSelected}/>
                    })
                }
            </Wrap>
    
            function Card ({cardId, isSelected, badge} : {cardId: number, isSelected: boolean, badge: string}) {
                return <Badge cursor='pointer' size='sm' colorScheme={isSelected ? 'blue' : 'gray'} onClick={()=>{toggleCard(cardId)}}>{badge}</Badge>
            }
    
            function toggleCard (cardId: number) {
                const isSelected = cardArray.includes(cardId);
                if (isSelected) {
                    setCardArray( cardArray.filter(c => {return c !== cardId}) )
                } else {
                    setCardArray([...cardArray, cardId]);
                }
            }
        }
    
        function SendRequestButton () {
            return <Button onClick={sendRequest} isDisabled={offeredCards.length + requestedCards.length  === 0} >Enviar proposta</Button>
        
            async function sendRequest () {

                if (!userInfo) {return;}

                await api.postExchangeRequest(userInfo.id, offeredCards, requestedCards)
                setOfferedCards([]);
                setRequestedCards([]);
            }
        
        }
    
    }

}




