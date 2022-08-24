import { Box, Button, VStack, Text, useToast } from '@chakra-ui/react';
import joi from 'joi';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../../../components/Buttons';
import Password from '../../../components/Form/Password';
import TextInput from '../../../components/Form/TextInput';
import { DataContext } from '../../../contexts/DataContext';
import { signIn } from '../../../services/reqs';




const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validator = {
    email: joi.string().regex(emailRegex).required(),
    password: joi.string().min(4).required(),
};

const validatorSchema = joi.object().keys(validator);


export default function Forms () {

    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const { auth: {setToken}} = useContext(DataContext);

    const toast = useToast();
    
    const [loading, setLoading] = useState(false);

    const validation = validatorSchema.validate({
        email, password
    })
    const isValid = validation.error? false : true;


    const data = {
        email,
        password
    }

    const props = {
        email: {
            value: email,
            label: 'Email',
            helperText: 'Digite seu email',
            isRequired: true,
            validator: validator.email,
            state: email,
            setState: setEmail,
            errorMessage: 'Deve ser um email válido.',
        },
        password: {
            value: password,
            label: 'Senha',
            helperText: 'Digite sua senha',
            isRequired: true,
            validator: validator.password,
            state: password,
            setState: setPassword,
            errorMessage: 'Deve ser uma senha válida.',
        },
    }


    return <Box w={'100%'} bg={'gray.850'} p={'5'} borderRadius='xl'>
        <VStack gap={5} w={'100%'}>

            <VStack gap={1} w={'100%'}>
                <TextInput {...props.email} />
                <Password {...props.password} />
            </VStack>

            <VStack gap={1} w={'100%'}>
                <MainButton 
                    disabled={!isValid}
                    onClick={submitHandler}
                >Entrar</MainButton>
            </VStack>

        </VStack>
    </Box>

    async function submitHandler() {
            
        setLoading(true)
        const response = await signIn({...data});

        if (response.status === 200) {
            setToken(response.data.token);
            toast({
                title: 'Bem-vindo!',
                description: "Você está logado.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

        } else {
            toast({
                title: response.response.statusText,
                description: response.response.data,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
        setLoading(false)
    }
}