import { VStack , Text, Heading, useToast} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { DeckContext } from "../../contexts/DeckContext";
import variables from "../../services/variables";
import { MyButton } from "../Buttons";



export default function MyPacks({showUpdateButton} : {showUpdateButton?: boolean}) {

    const {deckData: {data: {packs}, actions: {openPacks, realizePacks}}} = useContext(DeckContext);

    const [nowTime, setNowTime] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const nextPackAt = packs ? packs.lastPackAt + 60*60*1000*variables.back.SIGN_IN_FREE_CARDS_HOURS : 0;
    
    const minutesTo = Math.ceil((nextPackAt - nowTime.getTime())/(1000*60));

    const hasPacks = (packs?.new ?? 0) > 0;
    const isAvailable = minutesTo < 1;

    
    useEffect(() => {
        const timer = setInterval(() => setNowTime(new Date()), 60*1000);
        return () => clearInterval(timer);
    }, [nowTime]);


    const header = <>{hasPacks ? `Abra seus pacotinhos!` 
        : isAvailable ? 'Pacotinhos liberados'
        : 'Você não tem pacotinhos :('}</>

    const description = hasPacks ? `Você tem ${packs?.new} pacotinhos para abrir 🎉` 
        : (isAvailable ? 'Pegue seus pacotinhos grátis!'
        : `Você receberá pacotinhos grátis em ${minutesTo} minutos`);

    const onClick = hasPacks ? onClickOpen
        : isAvailable ? realizeAvailable
        : () => {navigate('/games')};

    const buttonTitle = hasPacks ? (!isLoading ? 'Abrir!' : 'Abrindo...')
        : isAvailable ? (!isLoading ? 'Pegar!' : 'Pegando...')
        : 'Ganhar mais';

        
    return <VStack align='center' textAlign={'center'} p='5' spacing='3' w='100%'>
        <Heading fontSize={'md'}>
            {header}
        </Heading>
        <Text opacity='75%'>{description}</Text>
        <MyButton
            type='main'
            onClick={onClick}
            disabled={isLoading}
        >{buttonTitle}</MyButton>
    </VStack>

    async function onClickOpen () {
        try {
            setIsLoading(true);
            await openPacks();
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    }

    async function realizeAvailable () {
        try {
            setIsLoading(true);
            await realizePacks();
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    }

}