import { Box, VStack, useToast, HStack, UseToastOptions } from '@chakra-ui/react';
import joi from 'joi';
import { useState } from 'react';
import Password from '../../../components/Form/Password';
import TextInput from '../../../components/Form/TextInput';
import SelectInput from '../../../components/Form/SelectInput';
import { signUp } from '../../../services/reqs';
import { useNavigate } from 'react-router-dom';
import { MyButton } from '../../../components/Buttons';

import { SkinColor, PoliticalPosition, EconomicClass } from '../../../types';
import Number from '../../../components/Form/Number';
import SelectBoxInput from '../../../components/Form/SelectBoxInput';


// email regex
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
// const phoneRegex = /^\d{2} \d{4,5}-\d{4}$/;

const validators = {
    username: joi.string().min(5).required(), 
    password: joi.string().min(4).required(),
    voteStateAbbreviation: joi.string().length(2).required(),
    
    name: joi.string().min(5),
    email: joi.string(),
    cpf: joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
    phone: joi.string().regex(/^\d{2} \d{4,5}-\d{4}$/),
    
    skinColor: joi.string().valid(...Object.values(SkinColor)),
    economicClass: joi.string().valid(...Object.values(EconomicClass)),
    
    birthDate: joi.date(),
    year: joi.number().max(2020).min(1900),
    month: joi.number().max(12).min(1),

    politicalPosition: joi.string().valid(...Object.values(PoliticalPosition)),
    diplomaticAxis: joi.number().min(0).max(100),
    economicAxis: joi.number().min(0).max(100),
    civilAxis: joi.number().min(0).max(100),
    socialAxis: joi.number().min(0).max(100),
}
export const SignUp = joi.object(validators);


export default function Forms () {

    const referralId = localStorage.getItem('polis_referralId');

    const [username, setUsername] = useState<string | null>('');
    const [password, setPassword] = useState<string | null>('');
    const [voteStateAbbreviation, setVoteStateAbbreviation] = useState<string | null>('');
    const [year, setYear] = useState<number | null>(null);
    const [month, setMonth] = useState<number | null>(null);
    const [politicalPosition, setPoliticalPosition] = useState<PoliticalPosition |null>(null);

    const navigate = useNavigate();

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
                return v.replace(/[^A-Za-z0-9_]+/g, "");
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
        voteStateAbbreviation: {
            value: voteStateAbbreviation,
            label: 'Estado',
            helperText: 'Você vota em qual estado?',
            isRequired: true,
            validator: validators.voteStateAbbreviation,
            state: voteStateAbbreviation,
            setState: setVoteStateAbbreviation,
            errorMessage: 'Deve ser uma UF válida.',
            options: ufs,
        },
        year: {
            value: year,
            label: 'Do ano',
            helperText: 'Seu ano de nascimento',
            isRequired: true,
            validator: validators.year,
            state: year,
            setState: setYear,
            errorMessage: 'Deve ser um ano válido.',
            type: 'number',
        },
        month: {
            value: month,
            label: 'Nasci em...',
            helperText: 'Nasci no mês...',
            isRequired: true,
            validator: validators.month,
            state: month,
            setState: setMonth,
            errorMessage: 'Deve ser um mês válido.',
            options: months,
        },
        politicalPosition: {
            value: politicalPosition,
            label: 'Qual a sua posição política?',
            helperText: 'Me considero de...',
            isRequired: false,
            validator: validators.politicalPosition,
            state: politicalPosition,
            setState: setPoliticalPosition,
            errorMessage: 'Deve ser uma posição válida.',
            options: [
                {value: 'left', label: '⬅️ Esquerda'},
                {value: 'center', label: 'Centro'},
                {value: 'right', label: 'Direita ➡️'},
            ],
        },
    }

    const data = {
        username: username,
        password: password,
        voteStateAbbreviation: voteStateAbbreviation,
        month: month,
        year: year,
        politicalPosition: politicalPosition
    }

    const validation = SignUp.validate(data);

    return <Box w={'100%'} bg={'gray.850'} p={'5'} borderRadius='xl'>
        <VStack gap={5} w={'100%'}>
            
            <VStack gap={1} w={'100%'}>
                <TextInput {...props.username} />
                <Password {...props.password} />
            </VStack>

            <VStack gap={1} w={'100%'}>
                <SelectInput {...props.voteStateAbbreviation} />
                <HStack gap={1} w={'100%'} align='start'>
                    <SelectInput {...props.month} />
                    <Number {...props.year} />
                </HStack>
            </VStack>

            <VStack gap={1} w={'100%'}>
                <SelectBoxInput {...props.politicalPosition} />
            </VStack>

            <VStack gap={1} w={'100%'}>

                <MyButton 
                    disabled={!(!(validation.error)) ?? false}
                    onClick={submitHandler}
                >Criar conta
                </MyButton>

            </VStack>

        </VStack>
    </Box>


    async function submitHandler() {

        const response = await signUp(data, referralId);

        let toast : UseToastOptions | undefined = undefined;

        if (response.status === 201) {
            toast = {
                title: 'Contra criada!',
                description: "Criamos uma conta pra você.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            }
            localStorage.setItem('polis_referralId', '');
            navigate('/sign-in');
        } else {
            toast = {
                title: response.response.statusText,
                description: response.response.data,
                status: 'error',
                duration: 2000,
                isClosable: true,
            }
        }

        return toast;
    }
}




const months = [
    { value: 1, label: 'Janeiro'},
    { value: 2, label: 'Fevereiro'},
    { value: 3, label: 'Março'},
    { value: 4, label: 'Abril'},
    { value: 5, label: 'Maio'},
    { value: 6, label: 'Junho'},
    { value: 7, label: 'Julho'},
    { value: 8, label: 'Agosto'},
    { value: 9, label: 'Setembro'},
    { value: 10, label: 'Outubro'},
    { value: 11, label: 'Jovembro'},
    { value: 12, label: 'Dezembro'},
]

const ufs = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' },
]