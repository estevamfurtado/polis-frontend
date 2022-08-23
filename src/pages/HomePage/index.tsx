import { Box, Button, Heading, VStack, Text, HStack, Wrap, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import Album from "../AlbumPage";
import SignIn from "../SignInPage";



export default function About() {

    const {auth: {user}} = useContext(DataContext);

    return (
        user ? <Album/> : <SignIn/>
    )

}