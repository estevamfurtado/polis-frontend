import {
    Flex,
    Stack,
    Heading,
    Text,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


export default function EditInfoPage() {

    const {authData:{data:{token}}} = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(()=>{
        if (!token) {
            navigate('/ranking')
        }
    }, [token])

    return (
        <Flex
            direction={'column'} align={'center'} my={'20'} py='5'
        >
            <Stack spacing={8} mx={'auto'} w={'100%'} maxW={'500px'}>
                <Headline/>
            </Stack>
        </Flex>
    );
}


function Headline () {
    return <Stack align={'center'}>
        <Heading fontSize={'2xl'} textAlign={'center'}>
            Página em construção
        </Heading>
        <Text fontSize={'lg'} color={'gray.600'} textAlign={'center'}>
            Daqui a pouco você vai poder editar o seu cadastro.
        </Text>
        <Link to={'/album/sections/parties'}>Quer tal ver seu álbum?</Link>
    </Stack>
}