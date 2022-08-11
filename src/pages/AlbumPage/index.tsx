import { Badge, HStack, Box, Button, Flex, Grid, GridItem, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, Wrap, WrapItem, Image, Heading } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";

export default function AlbumPage () {

    const { data: {deck, completeAlbum, user}, hooks: {getAlbumData, getDeckData} } = useContext(DataContext);
    const download = user && !deck && !completeAlbum;

    useEffect(()=>{
        if (download) {
            getAlbumData();
            getDeckData();
        }
    },[user]);

    return user ? <Outlet/> : <>Nada aqui</>
}

