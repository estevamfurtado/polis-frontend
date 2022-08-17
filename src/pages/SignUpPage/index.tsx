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


export default function SignUpPage() {

    const {auth: {user}} = useContext(DataContext);
    const navigate = useNavigate()

    useEffect(()=>{
        if (user) {
            navigate('/album')
        }
    }, [user])

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
            Cadastre-se
        </Heading>
        <Text fontSize={'lg'} color={'gray.600'} textAlign={'center'}>
            e ganhe o álbum de figurinhas do Congresso Nacional ✌️
        </Text>
        <Link to={'/sign-in'}>Já tem cadastro? Entre aqui!</Link>
    </Stack>
}