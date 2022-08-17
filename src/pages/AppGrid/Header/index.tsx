import { Divider, Box, Text, Flex, Button, Tab, HStack, TabList, TabPanel, TabPanels, Tabs, Menu, MenuList, MenuItem, MenuButton } from "@chakra-ui/react";
import { PropsWithChildren, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../../contexts/DataContext";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import NavTab from "./NavTab";

export default function Header() {

    const {auth: {token}} = useContext(DataContext);

    return (
        <Flex justify='space-between' align='center' h='100%' px='5' py='3' w='100%' overflow='hidden'>
            <Left/>
            <Right/>
        </Flex>
    )

    function Left () {

        const windowDimensions = useWindowDimensions();
    
        const location = useLocation();
        const navigate = useNavigate();
    
        if (windowDimensions.width < 700) {
            return <HStack>
                <Menu>
                    <MenuButton as={Button}
                        size='sm' variant='ghost' animation='none'
                    >🏛️ Polis</MenuButton>
                    <MenuList fontSize={'sm'} shadow={'lg'}>
                        <MenuItem onClick={()=>{goTo('/about')}}>Sobre</MenuItem>
                        <MenuItem onClick={()=>{goTo('/ranking')}}>Ranking</MenuItem>
                        <MenuItem onClick={()=>{goTo('/album')}}>Álbum</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        }
    
        const About = NavTab({label: 'Polis', emoji: '🏛️', isSelected: (location.pathname === '/about') , goTo: '/about'});
        const Ranking = NavTab({label: 'Ranking', emoji: '🏆', isSelected: (location.pathname === '/ranking'), goTo: '/ranking'});
        const Album = NavTab({label: 'Album', emoji: '🃏', isSelected: (location.pathname === '/album'), goTo: '/album'});
        
        return (
            <Flex align={'center'} h={'100%'} gap={3}>
                {About}
                <Divider orientation={'vertical'} borderColor='gray.200'/>
                {Ranking}
                {Album}
            </Flex>
        )
    
        function goTo (path: string) {
            navigate(path);
        } 
    }


    function Right () {

        const isLoggedIn = token ? true : false;
        return (
            isLoggedIn ? <RightLoggedIn/> : <RightNotLoggedIn/>
        )

        function RightNotLoggedIn () {

            const location = useLocation();
        
            const SignIn = NavTab({label: 'Entrar', isSelected: (location.pathname === '/sign-in'), goTo: '/sign-in', variant: 'outline'});
            const SignUp = NavTab({label: 'Cadastrar', emoji:'👋', isSelected: true, goTo: '/sign-up', colorScheme: 'facebook'});
        
            return (
                <Flex align={'center'} h={'100%'} gap={3}>
                    {SignIn}
                    {SignUp}
                </Flex>
            )
        }
        
        function RightLoggedIn () {
        
            const windowDimensions = useWindowDimensions();
        
            const {auth: {user}, hooks: {logOut}} = useContext(DataContext);
            const navigate = useNavigate();
        
            if (!user) {
                return <></>
            }
        
            const userName = user?.name.split(' ')[0];
        
            return (<HStack>
                {windowDimensions.width >= 700 && userName ? <Box fontSize='sm'>{`Olá, ${userName}`}</Box> : <></>}
                <Menu>
                    <MenuButton as={Button}
                        size='sm' variant='ghost' animation='none'
                    >⚙️</MenuButton>
                    <MenuList fontSize={'sm'} shadow={'lg'}>
                        <MenuItem onClick={()=>{goTo('/user')}}>Meus dados</MenuItem>
                        <MenuItem onClick={handleLogOut}>Sair</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>)
        
            function goTo (path: string) {
                navigate(path);
            } 
        
            function handleLogOut () {
                navigate('/ranking');
                logOut()
            }
        }
        
    }
    

}






