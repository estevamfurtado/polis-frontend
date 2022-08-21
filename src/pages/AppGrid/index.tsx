import { Center, Flex, Grid, GridItem, Box, Button, Heading, useColorMode } from "@chakra-ui/react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import {DataContext} from "../../contexts/DataContext";


export default function AppGrid() {

    const {app} = useContext(DataContext);
    const maxW = '700px';

    const Main = MainBuilder();
    const HeaderNav = app.showAppHeader ? HeaderNavBuilder() : <></>;
    const FooterNav = app.showAppFooterNav ? FooterNavBuilder() : <></>

    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <Flex direction={'column'}
            w='100%' h='100%'
            overflow={'hidden'}
        >
            {HeaderNav}
            {Main}
            {FooterNav}
        </Flex>
    )


    function MainBuilder() {
        return <Flex 
            direction={'column'} align='center'
            w='100%' h='100%' 
            flex='1 1 auto' overflowY={'auto'}
        >
            <Box w='100%' flex='0 0 auto' maxW={maxW}>
                <Outlet/>
            </Box>
        </Flex>
    }

    function HeaderNavBuilder() {
        return <Center w='100%' h='60px' bg='gray.900' flex='0 0 auto'>
            <Box h='100%' w='100%' maxW={maxW}>
                <Header/>
            </Box>
        </Center>;
    }

    function FooterNavBuilder() {
        return <Center w='100%' h='60px' bg='gray.900' flex='0 0 auto'>
            <Box h='100%' w='100%' maxW={maxW}>
            </Box>
        </Center>;
    }

}