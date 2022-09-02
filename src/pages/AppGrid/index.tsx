import { Center, Flex, Box } from "@chakra-ui/react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { AppContext } from "../../contexts/AppContext";


export default function AppGrid() {

    const {app} = useContext(AppContext);
    const maxW = '700px';

    return (
        <Flex direction={'column'}
            w='100%' h='100%'
            overflow={'hidden'}
            bg='gray.850'
            flex='1 1 auto'
        >
            <HeaderNavBuilder/>
            <MainBuilder/>
            {app.showAppFooterNav ? <FooterNavBuilder/> : <></>}
        </Flex>
    )


    function MainBuilder() {
        return <Flex 
            direction={'column'} align='center'
            w='100%' h='100%' 
            flex='1 1 auto' overflowY={'hidden'}
        >
            <Box 
                flex='0 0 auto'
                w='100%' maxW={maxW} h='100%'
                overflowY={'auto'}
                bg='gray.800'
                borderRadius={'lg'}
            >
                <Outlet/>
            </Box>
        </Flex>
    }

    function HeaderNavBuilder() {
        return <Center w='100%' h='60px' bg='gray.850' flex='0 0 auto'>
            <Box h='100%' w='100%' maxW={maxW}>
                <Header/>
            </Box>
        </Center>;
    }

    function FooterNavBuilder() {
        return <Center w='100%' h='80px' bg='gray.850' flex='0 0 auto'>
            <Box h='100%' w='100%' maxW={maxW}>
                <Footer/>
            </Box>
        </Center>;
    }

}