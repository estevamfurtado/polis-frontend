import { Box, Button, VStack, Text, useToast } from '@chakra-ui/react';
import joi from 'joi';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../../../components/Buttons';
import Password from '../../../components/Form/Password';
import TextInput from '../../../components/Form/TextInput';
import { DataContext } from '../../../contexts/DataContext';
import { signIn } from '../../../services/reqs';




// const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validators = {
    username: joi.string().required(),
    password: joi.string().min(4).required(),
};

const validatorSchema = joi.object(validators)


export default function Forms () {

    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const { auth: {setToken}} = useContext(DataContext);

    const toast = useToast();
    
    const [loading, setLoading] = useState(false);

    const validation = validatorSchema.validate({
        username, password
    })
    const isValid = validation.error? false : true;


    const data = {
        username,
        password
    }

    const props = {
        username: {
            label: 'Nome de usuário',
            helperText: 'meunome',
            isRequired: true,
            validator: validators.username,
            state: username,
            setState: setUsername,
            errorMessage: 'Deve ter pelo menos 5 caracteres.',
            mask: (v: string) => {
                return v.replace(/[^A-Za-z0-9_@.]+/g, "");
            }
        },
        password: {
            value: password,
            label: 'Senha',
            helperText: 'Digite sua senha',
            isRequired: true,
            validator: validators.password,
            state: password,
            setState: setPassword,
            errorMessage: 'Deve ter pelo menos 4 caracteres.',
        },
    }


    return <Box w={'100%'} bg={'gray.850'} p={'5'} borderRadius='xl'>
        <VStack gap={5} w={'100%'}>

            <VStack gap={1} w={'100%'}>
                <TextInput {...props.username} />
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