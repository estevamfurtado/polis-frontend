import { Center, VStack, Flex, Circle } from "@chakra-ui/react";
import { PropsWithChildren, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PolisAlbum, PolisCard, PolisExchange, PolisGames } from "../../../components/Icons";
import { DataContext } from "../../../contexts/DataContext";

export default function Footer() {

    const {content: {cards, exchangeRequests, packs}} = useContext(DataContext);


    return (
        <Flex 
            justifyContent='center'
            gap={5} align='center' h='100%' px='5' py='3' w='100%' overflow='hidden'>

            <IconNav title="Album" goTo="/album" activeSection="album" notifications={
                cards?.deck.notPasted.new.length ?? 0
            }>
                <PolisAlbum w='30px'/>
            </IconNav>

            <IconNav title="Figurinhas" goTo="/stickers" activeSection="stickers" notifications={
                packs?.new ?? 0
            }>
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

function IconNav ({children, title, goTo, activeSection, notifications} : {
    title: string, goTo: string, activeSection: string, notifications: number
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
        {!isActive && notifications ? <Circle size='3' bg='red.400' position='absolute' top='0.7' right='0.7'/> : <></>}
    </Circle>
}

