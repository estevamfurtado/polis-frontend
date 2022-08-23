import { Center,  VStack, Flex, Circle } from "@chakra-ui/react";
import { PropsWithChildren, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PolisAlbum, PolisCard, PolisExchange, PolisGames } from "../../../components/Icons";
import { DataContext } from "../../../contexts/DataContext";

export default function Footer() {

    const {content: {cards, exchangeRequests}} = useContext(DataContext);


    return (
        <Flex justify='space-around' align='center' h='100%' px='5' py='3' w='100%' overflow='hidden'>

            <IconNav title="Album" goTo="/album" activeSection="album" notifications={
                cards?.deck.notPasted.new.length ?? 0
            }>
                <PolisAlbum w='30px'/>
            </IconNav>

            <IconNav title="Figurinhas" goTo="/stickers" activeSection="stickers" notifications={
                cards?.deck.notPasted.new.length ?? 0
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

    return <Center
        w='100%' 
        onClick={() => {navigate(goTo)}}
        color={section === activeSection ? 'white' : 'whiteAlpha.400'}
        _hover={{color: activeSection? 'white' : 'whiteAlpha.500'}}
        cursor='pointer'
    >
        <VStack align='center'>
            {children}
            {notifications ? <Circle size='5px' bg='green.300' /> : <></>}
        </VStack>
    </Center>
}

