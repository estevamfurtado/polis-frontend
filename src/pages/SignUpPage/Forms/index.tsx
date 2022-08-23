import { Box, VStack, useToast } from '@chakra-ui/react';
import joi from 'joi';
import { useState } from 'react';
import Password from '../../../components/Form/Password';
import TextInput from '../../../components/Form/TextInput';
import SliderInput from '../../../components/Form/SliderInput';
import SelectInput from '../../../components/Form/SelectInput';
import { signUp } from '../../../services/reqs';
import { useNavigate } from 'react-router-dom';


export const SkinColor = [
    {value: 'White', label: 'Branco'},
    {value: 'Black', label: 'Preto'},
    {value: 'Brown', label: 'Pardo'},
    {value: 'Yellow', label: 'Amarelo'},
    {value: 'Other', label: 'Outro'},
]

export const EconomicClass = [
    'A', 'B', 'C', 'D', 'E'
];

// email regex
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
const phoneRegex = /^\d{2} \d{4,5}-\d{4}$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validator = {
    name: joi.string().min(5).required(),
    email: joi.string().regex(emailRegex).required(),
    password: joi.string().min(4).required(),
    cpf: joi.string().regex(cpfRegex).required(),
    voteStateAbbreviation: joi.string().length(2).required(),

    phone: joi.string().regex(phoneRegex).allow(null),
    birthDate: joi.date().optional().allow(null),
    skinColor: joi.string().valid(...SkinColor.map(({value}) => value)).allow(null),
    economicClass: joi.string().valid(...EconomicClass).allow(null),

    diplomaticAxis: joi.number().min(0).max(100).allow(null),
    economicAxis: joi.number().min(0).max(100).allow(null),
    civilAxis: joi.number().min(0).max(100).allow(null),
    socialAxis: joi.number().min(0).max(100).allow(null),
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
    const [phone, setPhone] = useState<string | null>('');
    const [birthDate, setBirthDate] = useState<string | null>(null);
    const [skinColor, setSkinColor] = useState<string | null>(null);
    const [economicClass, setEconomicClass] = useState<string | null>(null);

    const [diplomaticAxis, setDiplomaticAxis] = useState<number | null>(50);
    const [economicAxis, setEconomicAxis] = useState<number | null>(50);
    const [civilAxis, setCivilAxis] = useState<number | null>(50);
    const [socialAxis, setSocialAxis] = useState<number | null>(50);
    
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const validation = validatorSchema.validate({
        name, email, password, cpf, voteStateAbbreviation, phone, birthDate, skinColor, economicClass,
        diplomaticAxis, economicAxis, civilAxis, socialAxis
    })
    const isValid = validation.error? false : true;


    const data = {
        name,
        email,
        password,
        cpf,
        voteStateAbbreviation,
        phone,
        birthDate,
        skinColor,
        economicClass,
        diplomaticAxis,
        economicAxis,
        civilAxis,
        socialAxis,
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
        phone: {
            value: phone,
            label: 'Telefone',
            helperText: 'Digite seu telefone',
            isRequired: false,
            validator: validator.phone,
            state: phone,
            setState: setPhone,
            errorMessage: 'Deve ser um telefone válido no formato xx xxxxx-xxxx.',
            inputProcessor: (value: string) => {
                let clean = value.replace(/\D/g, '');
                const p1 = clean.slice(0, 2);
                const p2 = clean.length > 2 ? ' ' + clean.slice(2, 7) : '';
                const p3 = clean.length > 7 ? '-' + clean.slice(7, 11) : '';
                return p1 + p2 + p3;
            }
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
        skinColor: {
            value: skinColor,
            label: 'Cor de pele',
            helperText: 'Digite sua cor de pele',
            isRequired: false,
            validator: validator.skinColor,
            state: skinColor,
            setState: setSkinColor,
        },
        economicClass: {
            value: economicClass,
            label: 'Classe econômica',
            helperText: 'Digite sua classe econômica',
            isRequired: false,
            validator: validator.economicClass,
            state: economicClass,
            setState: setEconomicClass,
        },
        diplomaticAxis: {
            value: diplomaticAxis,
            label: 'Diplomática',
            helperText: 'Digite sua nota de Diplomática',
            isRequired: false,
            validator: validator.diplomaticAxis,
            state: diplomaticAxis,
            setState: setDiplomaticAxis,
            axisLabel: {
                left: 'Globalista',
                right: 'Nacionalista',
            }
        },
        economicAxis: {
            value: economicAxis,
            label: 'Econômica',
            helperText: 'Digite sua nota de Econômica',
            isRequired: false,
            validator: validator.economicAxis,
            state: economicAxis,
            setState: setEconomicAxis,
            axisLabel: {
                left: 'Igualdade',
                right: 'Liberdade',
            }
        },
        civilAxis: {
            value: civilAxis,
            label: 'Civil',
            helperText: 'Digite sua nota de Civil',
            isRequired: false,
            validator: validator.civilAxis,
            state: civilAxis,
            setState: setCivilAxis,
            axisLabel: {
                left: 'Autoritarismo',
                right: 'Democracia',
            }
        },
        socialAxis: {
            value: socialAxis,
            label: 'Social',
            helperText: 'Digite sua nota de Social',
            isRequired: false,
            validator: validator.socialAxis,
            state: socialAxis,
            setState: setSocialAxis,
            axisLabel: {
                left: 'Progressista',
                right: 'Conservador',
            }
        }
    }


    return <Box w={'100%'} bg={'gray.850'} p={'5'} borderRadius='xl'>
        <VStack gap={5} w={'100%'}>
            
            <VStack gap={1} w={'100%'}>
                <TextInput {...props.name} />
                <TextInput {...props.email} />
                <Password {...props.password} />
                <TextInput {...props.cpf} />
                <TextInput {...props.phone} />
            </VStack>

            <VStack gap={1} w={'100%'}>
                <SelectInput {...props.voteStateAbbreviation} />
                <TextInput {...props.birthDate} />
            </VStack>

            <VStack gap={1} w={'100%'}>
                <SliderInput {...props.diplomaticAxis} />
                <SliderInput {...props.economicAxis} />
                <SliderInput {...props.civilAxis} />
                <SliderInput {...props.socialAxis} />
            </VStack>

            <VStack gap={1} w={'100%'}>

                <Box 
                    as='button'
                    fontSize='md'
                    fontWeight='bold'
                    color='white' 
                    bg='#165967'
                    boxShadow={'0 3px 0 #13424B'}
                    px='4' py='2' borderRadius='lg'
                    disabled={!isValid}
                    onClick={submitHandler}
                >
                    Criar conta
                </Box>

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