import { Center, VStack, Flex, Circle } from "@chakra-ui/react";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PolisAlbum, PolisCard, PolisExchange, PolisGames } from "../../../components/Icons";
import { DataContext } from "../../../contexts/DataContext";
import variables from "../../../services/variables";

export default function Footer() {

    const [nowTime, setNowTime] = useState(new Date());

    const {content: {cards, exchangeRequests, packs}} = useContext(DataContext);

    const nextPackAt = packs ? packs.lastPackAt + 60*60*1000*variables.back.SIGN_IN_FREE_CARDS_HOURS : 0;
    
    const minutesTo = Math.ceil((nextPackAt - nowTime.getTime())/(1000*60));

    const hasPacks = (packs?.new ?? 0) > 0;
    const isAvailable = minutesTo < 1;

        
    useEffect(() => {
        const timer = setInterval(() => setNowTime(new Date()), 60*1000);
        return () => clearInterval(timer);
    }, [nowTime]);


    return (
        <Flex 
            justifyContent='center'
            gap={5} align='center' h='100%' px='5' py='3' w='100%' overflow='hidden'>

            <IconNav title="Album" goTo="/album/sections/parties" activeSection="album" notifications={
                cards?.deck.notPasted.new.length ?? 0
            }>
                <PolisAlbum w='30px'/>
            </IconNav>

            <IconNav title="Figurinhas" goTo="/stickers" activeSection="stickers" 
                notifications={hasPacks ? packs?.new ?? 0 : (!isAvailable ? minutesTo : 0)}
                notificationColor={(!hasPacks && !isAvailable) ? 'blue.800' : undefined}
            >
                <PolisCard h='22px'/>
            </IconNav>

            <IconNav title="Trocar" goTo="/exchange" activeSection="exchange" notifications={
                exchangeRequests?.length ?? 0
            }>
                <PolisExchange w='40px'/>
            </IconNav>

            <IconNav title="Jogar" goTo="/games" activeSection="games" notifications={0}>
                <PolisGames w='40px'/>
            </IconNav>

        </Flex>
        
    )

}

function IconNav ({children, title, goTo, activeSection, notifications, notificationColor} : {
    title: string, goTo: string, activeSection: string, notifications: number, notificationColor?: string
} & PropsWithChildren) {
    
    const {app: {section}} = useContext(DataContext);
    const navigate = useNavigate();

    const isActive = section === activeSection;

    return <Circle
        size='12'
        onClick={() => {navigate(goTo)}}
        color={'white'}
        bg={isActive ? 'green.700' : 'whiteAlpha.100'}
        _hover={{background: isActive ? 'green.700' : 'whiteAlpha.400', animation: 'none'}}
        cursor='pointer'
        position='relative'
    >
        <VStack align='center'>
            {children}
        </VStack>
        {notifications ? 
            <Circle color='white' bg={notificationColor ?? 'red.600'} 
                size='6' fontSize='10px' fontWeight='bold' 
                position='absolute' top='-1' right='-1'
                border='2px solid' borderColor={'gray.850'}
            >
                {notifications}
            </Circle>
        : <></>}
    </Circle>
}

