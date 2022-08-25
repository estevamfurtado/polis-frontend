import {
    Flex,
    Stack,
    Heading,
    Text,
    Button,
    VStack,
    Box
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyButton } from '../../components/Buttons';
import { DataContext } from '../../contexts/DataContext';
import Forms from './Forms';


export default function SignInPage() {

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
                    Bem-vindo ao Polis!
                </Heading>
                <Text textAlign={'center'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>

                <MyButton onClick={() => {navigate('/sign-up')}}>
                    Ainda não tem conta? Crie aqui!
                </MyButton>

            </VStack>

            <Forms/>

        </VStack>
    );
}
