import { Divider, Box, Text, Flex, Button, Tab, HStack, TabList, TabPanel, TabPanels, Tabs, Menu, MenuList, MenuItem, MenuButton, IconButton } from "@chakra-ui/react";
import { PropsWithChildren, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { PolisAlbum, PolisCard, PolisExchange, PolisGames, PolisPerson } from "../../../components/Icons";
import { DataContext } from "../../../contexts/DataContext";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

export default function Footer() {

    const {auth: {token, user}, app: {section}} = useContext(DataContext);
    const navigate = useNavigate();

    return (
        <Flex justify='space-around' align='center' h='100%' px='5' py='3' w='100%' overflow='hidden'>
            <IconButton 
                aria-label={'Álbum'} 
                variant='ghost' w='100%' 
                onClick={() => {navigate('/album')}}
                color={section === 'album' ? 'whiteAlpha.800' : 'whiteAlpha.400'}
                icon={<PolisAlbum/>}
            />
            <IconButton 
                aria-label={'Figurinhas'} 
                variant='ghost' w='100%' 
                onClick={() => {navigate('/stickers')}}
                color={section === 'stickers' ? 'whiteAlpha.800' : 'whiteAlpha.400'}
                icon={<PolisCard/>}
            />
            <IconButton 
                aria-label={'Trocar'} 
                variant='ghost' w='100%' 
                onClick={() => {navigate('/exchange')}}
                color={section === 'exchange' ? 'whiteAlpha.800' : 'whiteAlpha.400'}
                icon={<PolisExchange/>}
            />
            <IconButton 
                aria-label={'Jogar'} 
                variant='ghost' w='100%' 
                onClick={() => {navigate('/games')}}
                color={section === 'games' ? 'whiteAlpha.800' : 'whiteAlpha.400'}
                icon={<PolisGames/>}
            />
        </Flex>
        
    )

}






