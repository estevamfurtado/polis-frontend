import { Box, Flex, Button, useDisclosure, HStack, Text } from "@chakra-ui/react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react'

import {
    AlertDialog,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'

import { useContext, useRef } from "react";
import { PolisPerson } from "../../../components/Icons";
import { AuthContext } from "../../../contexts/AuthContext";


export default function Header() {

    const {authData: {data: {user}, actions: {clearAuth}}} = useContext(AuthContext);

    const HomeButton = HomeButtonBuilder();
    const SettingsMenu = SettingsMenuBuilder();

    const name = user ? (user.username
            ? user.username
            : (user.email ? user.email : 'usuário')) : 'usuário'

    return (
        <Flex justify='space-between' align='center' h='100%' px='5' py='3' w='100%' overflow='hidden'>
            {HomeButton}
            { user ? 
                <HStack align='center' spacing='2'>
                    <Box fontSize='sm' fontWeight='semibold'>{`Olá, ${name}`}</Box>
                    {SettingsMenu}
                </HStack>
            : <></>}
        </Flex>
    )

    function HomeButtonBuilder() {
        return <Box fontSize='md' fontWeight={'bold'}>
            🏛️ Polis
        </Box>
    }

    function SettingsMenuBuilder() {

        const { isOpen, onOpen, onClose } = useDisclosure();

        return <><Menu>
            <MenuButton as={Button} 
                color='white' fontSize='md' fontWeight={'bold'} 
                opacity='33%'
                bg='transparent'
                colorScheme='whiteAlpha.300'
                _hover = {{opacity: '90%'}} >
                    <PolisPerson h='22px'/>
            </MenuButton>
            <MenuList
                fontSize={'sm'}
                fontWeight='bold'
                border={'1px solid'}
                borderColor='gray.700'
                bg='gray.800'
            >
                <MenuItem isDisabled={true}>Minha conta</MenuItem>
                <MenuItem onClick={logOutHandler}>Sair</MenuItem>
            </MenuList>
        </Menu>
        <ConfirmLogOut/>
        </>

        function logOutHandler() {
            onOpen();
        }

        function confirmLogOut() {
            onClose();
            clearAuth();
        }

        function ConfirmLogOut () {

            const cancelRef = useRef(null);

            return <>
                <AlertDialog
                    motionPreset='slideInBottom'
                    isOpen={isOpen}
                    onClose={onClose}
                    leastDestructiveRef={cancelRef}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='md' fontWeight='bold'>
                                {'Tem certeza?'}
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <Button size='sm' onClick={onClose} ref={cancelRef} >
                                    Cancelar
                                </Button>
                                <Button colorScheme='red' size='sm' onClick={confirmLogOut} ml={3}>
                                    Sair
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>
        }
    }
    


}






