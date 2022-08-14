import { Divider, Text, Flex, Button, Tab, HStack, TabList, TabPanel, TabPanels, Tabs, Menu, MenuList, MenuItem, MenuButton } from "@chakra-ui/react";
import { PropsWithChildren, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../../contexts/DataContext";
import NavTab from "./NavTab";

export default function Header() {

    return (
        <Flex justify={'space-between'} align={'center'} h={'100%'} px={5} py={3} >
            <Left/>
            <Right/>
        </Flex>
    )

}


function Left () {

    const location = useLocation();

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
}

function Right () {

    const {data: {token}} = useContext(DataContext);

    const isLoggedIn = token ? true : false;
    return (
        isLoggedIn ? <RightLoggedIn/> : <RightNotLoggedIn/>
    )
}

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

    const {data: {user}, hooks: {logOut}} = useContext(DataContext);
    const navigate = useNavigate();

    if (!user) {
        return <></>
    }

    return (<HStack>
        <Text>{`Olá, ${user?.name}`}</Text>
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