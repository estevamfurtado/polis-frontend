import { Box, VStack, useToast } from '@chakra-ui/react';
import joi from 'joi';
import { useState } from 'react';
import Password from '../../../components/Form/Password';
import TextInput from '../../../components/Form/TextInput';
import SelectInput from '../../../components/Form/SelectInput';
import { signUp } from '../../../services/reqs';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../../../components/Buttons';


export const SkinColor = [
    {value: 'White', label: 'Branco'},
    {value: 'Black', label: 'Preto'},
    {value: 'Brown', label: 'Pardo'},
    {value: 'Yellow', label: 'Amarelo'},
    {value: 'Other', label: 'Outro'},
]

enum PoliticalPosition {
    None,
    Left,
    Right,
    Center
}

// email regex
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
// const phoneRegex = /^\d{2} \d{4,5}-\d{4}$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validator = {
    name: joi.string().min(5).required(),
    email: joi.string().regex(emailRegex).required(),
    password: joi.string().min(4).required(),
    cpf: joi.string().regex(cpfRegex).required(),
    voteStateAbbreviation: joi.string().length(2).required(),
    birthDate: joi.date().optional().allow(null),
};

const validatorSchema = joi.object().keys(validator);


export default function Forms () {

    const [referralId, setReferralId] = useState(localStorage.getItem('polis_referralId'));

    const toast = useToast();

    const [name, setName] = useState<string | null>('');
    const [email, setEmail] = useState<string | null>('');
    const [password, setPassword] = useState<string | null>('');
    const [cpf, setCpf] = useState<string | null>('');
    const [voteStateAbbreviation, setVoteStateAbbreviation] = useState<string | null>('');
    const [birthDate, setBirthDate] = useState<string | null>(null);
    
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const validation = validatorSchema.validate({
        name, email, password, cpf, voteStateAbbreviation, birthDate
    })
    const isValid = validation.error? false : true;


    const data = {
        name,
        email,
        password,
        cpf,
        voteStateAbbreviation,
        birthDate,
    }

    const props = {
        name: {
            value: name,
            label: 'Nome',
            helperText: 'Digite seu nome completo',
            isRequired: true,
            validator: validator.name,
            state: name,
            setState: setName,
            errorMessage: 'Deve ter pelo menos 5 caracteres.',
        },
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
            errorMessage: 'Deve ter pelo menos 4 caracteres.',
        },
        cpf: {
            value: cpf,
            label: 'CPF',
            helperText: 'Digite seu CPF',
            isRequired: true,
            validator: validator.cpf,
            state: cpf,
            setState: setCpf,
            errorMessage: 'Deve ser um CPF válido no formato xxx.xxx.xxx-xx.',
            inputProcessor: (value: string) => {
                const clean = value.replace(/\D/g, '');
                const p1 = clean.slice(0, 3);
                const p2 = clean.length > 3 ? '.' + clean.slice(3, 6) : '';
                const p3 = clean.length > 6 ? '.' + clean.slice(6, 9) : '';
                const p4 = clean.length > 9 ? '-' + clean.slice(9, 11) : '';
                return p1 + p2 + p3 + p4;
            },
        },
        voteStateAbbreviation: {
            value: voteStateAbbreviation,
            label: 'UF',
            helperText: 'Digite a UF de votação',
            isRequired: true,
            validator: validator.voteStateAbbreviation,
            state: voteStateAbbreviation,
            setState: setVoteStateAbbreviation,
            errorMessage: 'Deve ser uma UF válida.',
            options: ufs,
        },
        birthDate: {
            value: birthDate,
            label: 'Data de nascimento',
            helperText: 'Digite sua data de nascimento',
            isRequired: false,
            validator: validator.birthDate,
            state: birthDate,
            setState: setBirthDate,
            errorMessage: 'Deve ser uma data válida.',
            type: 'date',
        },
    }


    return <Box w={'100%'} bg={'gray.850'} p={'5'} borderRadius='xl'>
        <VStack gap={5} w={'100%'}>
            
            <VStack gap={1} w={'100%'}>
                <TextInput {...props.name} />
                <TextInput {...props.email} />
                <Password {...props.password} />
                <TextInput {...props.cpf} />
            </VStack>

            <VStack gap={1} w={'100%'}>
                <SelectInput {...props.voteStateAbbreviation} />
                <TextInput {...props.birthDate} />
            </VStack>

            <VStack gap={1} w={'100%'}>

                <MainButton 
                    disabled={!isValid}
                    onClick={submitHandler}
                >Criar conta</MainButton>

            </VStack>

        </VStack>
    </Box>


    async function submitHandler() {

        setLoading(true)

        const sendData = {} as any;

        Object.keys(data).forEach(key => {
            if (data[key as keyof typeof data]) {
                sendData[key] = data[key as keyof typeof data];
            }
        })

        const response = await signUp(sendData, referralId);
        if (response.status === 201) {
            toast({
                title: 'Contra criada!',
                description: "Criamos uma conta pra você.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

            localStorage.setItem('polis_referralId', '');

            navigate('/sign-in');
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


const arrays = {
    divi: ["Separatista","Confederalista","Descentralista","Neutro","Devolucionista","Centralista","Unitário"],
    govt: ["Anarquista","Libertário","Liberal","Moderado","Estatista","Autoritário","Totalitário"],
    mili: ["Cosmopolitano","Internacionalista","Conformista","Equilibrado","Patriótico","Nacionalista","Chauvinista"],
    prot: ["Vigilância em massa Global","Vigilância em massa","Vigilância Policial","Neutro","Privacidade do Governo","Privacidade do Governo e Corporações","Privacidade Total"],
    econ: ["Comunista","Socialista","Social Democrata","Centrista","Apoiante de Livre Mercado","Capitalista","Laissez-Faire"],
    reli: ["Anticlericalista","Laicista","Secularista","Neutro","Etocrata","Teocrata","Clericalista"],
    scty: ["Revolucionário","Muito Progressista","Progressista","Neutro","Tradicional","Conservador","Reacionário"],
    cult: ["Monoculturalista","Multicomunitarista","Interculturalista","Neutro","Assimilacionista","Multiculturalista","Intraculturalista"]
}

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