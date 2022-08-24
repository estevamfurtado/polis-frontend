import {
    Flex,
    Stack,
    Heading,
    Text,
    VStack,
    Box,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GrayButton } from '../../components/Buttons';
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

        <VStack align={'center'} w='100%' spacing='5' p='5'>
            <VStack align={'center'} w='100%' p='5' spacing='5'>
                <Heading fontSize={'lg'} textAlign={'center'}>
                    Crie sua conta
                </Heading>
                <Text textAlign={'center'}>
                    e ganhe o álbum de figurinhas do Congresso Nacional ✌️
                </Text>

                <GrayButton onClick={() => {navigate('/sign-in')}}>
                    Já tem conta? Entre aqui!
                </GrayButton>

            </VStack>

            <Forms/>

        </VStack>

    );
}