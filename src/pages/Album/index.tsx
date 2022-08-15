import { Stack, HStack, Box, Button, Flex, Grid, GridItem, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, Wrap, WrapItem, Image, Heading } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";

export default function Album () {

    const { data: {deck, completeAlbum, user}, hooks: {getAlbumData, getDeckData} } = useContext(DataContext);
    const download = user && !deck && !completeAlbum;

    const navigate = useNavigate();

    const location = useLocation();

    useEffect(()=>{
        if (!user) {
            navigate('/sign-in');
        }
        if (download) {
            getAlbumData();
            getDeckData();
        }
    },[user]);

    return user 
    ? <Stack w='100%' h='100%' overflow='hidden' spacing='0' direction='column'>
        <Stack w='100%' h='50px' direction='row' align='center' justify='center' overflow='auto' flex='0 0 auto'>
            {NavButton({title: 'Álbum', page: 'pages', notifications: 0})}
            {NavButton({title: 'Figurinhas', page: 'deck', notifications: 5})}
            {NavButton({title: 'Pacotinhos', page: 'packs', notifications: 3})}
            {NavButton({title: 'Trocar', page: 'exchange', notifications: 0})}
        </Stack>
        <Outlet/>
    </Stack>
    : <>Nada aqui</>

    function NavButton (props: {title: string, page: string, notifications: number}) {

        const isSelected = location.pathname.includes(props.page);

        const notification = props.notifications > 0 
            ? <Box 
                position='absolute' 
                top='-4px' right='-4px' 
                w='10px' h='10px'
                borderRadius='100%' border='2px solid white' 
                bg='red.500'
                fontSize={'xm'}
                color='white'
            >
            </Box> : <></>;

        return <Box position='relative'>
            <Button 
                size='sm' onClick={()=>{navigate(`./${props.page}`)}}
                variant={'solid'}
                colorScheme={isSelected ? 'blue' : 'gray'}
            >
                {props.title}
            </Button>
            {notification}
        </Box>
    }
}

