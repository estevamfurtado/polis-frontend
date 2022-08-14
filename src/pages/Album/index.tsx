import { Stack, HStack, Box, Button, Flex, Grid, GridItem, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, Wrap, WrapItem, Image, Heading } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";

export default function Album () {

    const { data: {deck, completeAlbum, user}, hooks: {getAlbumData, getDeckData} } = useContext(DataContext);
    const download = user && !deck && !completeAlbum;

    const navigate = useNavigate();

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
        <Stack w='100%' h='50px' direction='row' align='center' justify='center'>
            <Button size='sm' onClick={()=>{navigate('./pages')}}>Álbum</Button>
            <Button size='sm' onClick={()=>{navigate('./deck')}}>Figurinhas</Button>
            <Button size='sm' onClick={()=>{navigate('./packs')}}>Pacotinhos</Button>
            <Button size='sm' onClick={()=>{navigate('./exchange')}}>Trocar</Button>
        </Stack>
        <Outlet/>
    </Stack>
    : <>Nada aqui</>
}

