import { HStack, VStack , Button, Heading} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../contexts/DataContext"
import StickerComponent from "../Sticker";
import { useParams } from 'react-router-dom';
import { CardsWrap } from "../CardsWrap";
import { MyButton } from "../Buttons";
import CenterLoading from "../CenterLoading";


export default function ViewExchanges () {

    const [loading, setLoading] = useState(true);

    const {auth: {user}, content: {exchangeRequests},  hooks: {accept, cancel, reject}} = useContext(DataContext);

    const { requestId } = useParams()

    const idNum = Number(requestId)
    const request = exchangeRequests?.find(x => x.id === idNum) ?? null;
    
    useEffect(()=>{
        setLoading(false);
    }, [])

    if (!user || !requestId || !request) {return <></>}

    const isAuthor = user?.id === request.proposerId;
    const wasRequested = user?.id === request.requestedId;

    if (!isAuthor && !wasRequested) {return <></>}

    const requestedName = request.requested.username ? request.requested.username : (
        request.requested.email ? request.requested.email.split('@')[0] : 'Alguém'
    )
    const proposerName = request.proposer.username ? request.proposer.username : (
        request.proposer.email ? request.proposer.email.split('@')[0] : 'Alguém'
    )

    const author = isAuthor ? 'Você' : proposerName;
    const requested = isAuthor ? requestedName : 'você'

    const label = `${author} para ${requested}`;

    return loading ? <CenterLoading/> : (<VStack spacing={4} w='100%' align='center' bg='gray.700' py='5' borderRadius='10'>

        <Heading size='md'>{label}</Heading>

        <CardsWrap title={`${author} oferece ${request.cardsOffered.length}`} height='150px'>
            {request.cardsOffered.map(c=>{
                return <StickerComponent stickerId={c.stickerId} h={120} w={90}/>
            })}
        </CardsWrap>

        <CardsWrap title={`${author} pede ${request.cardsRequested.length}`} height='150px'>
            {request.cardsRequested.map(c=>{
                return <StickerComponent stickerId={c.stickerId} h={130} w={100}/>
            })}
        </CardsWrap>

        <HStack w='100%' spacing={4} justify='center'>
            {
                request.proposerId !== user?.id 
                ? <>
                    <MyButton type='red' onClick={()=>{reject(request.id)}}>Recusar</MyButton>
                    <MyButton type='main' onClick={()=>{accept(request.id)}}>Aceitar</MyButton>
                </>
                : <MyButton type='red' onClick={()=>{cancel(request.id)}}>Cancelar</MyButton>
            }
        </HStack>

    </VStack>)

}