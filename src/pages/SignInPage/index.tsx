import {
    Flex,
    Stack,
    Heading,
    Text,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../contexts/DataContext';
import Forms from './Forms';


export default function SignInPage() {

    const {data: {token}} = useContext(DataContext);
    const navigate = useNavigate()

    useEffect(()=>{
        if (token) {
            navigate('/album')
        }
    }, [token])

    return (
        <Flex
            direction={'column'} align={'center'} my={'20'}
        >
            <Stack spacing={8} mx={'auto'} w={'100%'} maxW={'500px'}>
                <Headline/>
                <Forms/>
            </Stack>
        </Flex>
    );
}


function Headline () {
    return <Stack align={'center'}>
        <Heading fontSize={'2xl'} textAlign={'center'}>
            Bem-vindo de volta :)
        </Heading>
        
        <Link to={'/sign-up'}>Ainda não tem cadastro? Cadastre-se!</Link>
    </Stack>
}