import { Box, Button, VStack, Text, useToast } from '@chakra-ui/react';
import joi from 'joi';
import { useContext, useEffect, useState } from 'react';
import Password from '../../../components/Form/Password';
import TextInput from '../../../components/Form/TextInput';
import SliderInput from '../../../components/Form/SliderInput';
import SelectInput from '../../../components/Form/SelectInput';
import { signUp } from '../../../services/reqs';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';


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
    name: joi.string().min(5).allow(null),
    email: joi.string().regex(emailRegex).allow(null),
    password: joi.string().min(4).allow(null),
    cpf: joi.string().regex(cpfRegex).allow(null),
    voteStateAbbreviation: joi.string().length(2).allow(null),

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

    const toast = useToast();
    const {authData: {data: {user, token}}} = useContext(AuthContext);

    const [name, setName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [cpf, setCpf] = useState<string | null>(null);
    const [voteStateAbbreviation, setVoteStateAbbreviation] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const [birthDate, setBirthDate] = useState<string | null>(null);
    const [skinColor, setSkinColor] = useState<string | null>(null);
    const [economicClass, setEconomicClass] = useState<string | null>(null);

    const [diplomaticAxis, setDiplomaticAxis] = useState<number | null>(50);
    const [economicAxis, setEconomicAxis] = useState<number | null>(50);
    const [civilAxis, setCivilAxis] = useState<number | null>(50);
    const [socialAxis, setSocialAxis] = useState<number | null>(50);
    
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        if (!token) {
            navigate('/sign-in');
        }
        if (user) {
            loadUserData();
        }
    }, [user])

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
            errorMessage: 'Deve ser um email v??lido.',
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
            errorMessage: 'Deve ser um CPF v??lido no formato xxx.xxx.xxx-xx.',
        },
        voteStateAbbreviation: {
            value: voteStateAbbreviation,
            label: 'UF',
            helperText: 'Digite a UF de vota????o',
            isRequired: true,
            validator: validator.voteStateAbbreviation,
            state: voteStateAbbreviation,
            setState: setVoteStateAbbreviation,
            errorMessage: 'Deve ser uma UF v??lida.',
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
            errorMessage: 'Deve ser um telefone v??lido no formato (xx) xxxxx-xxxx.',
        },
        birthDate: {
            value: birthDate,
            label: 'Data de nascimento',
            helperText: 'Digite sua data de nascimento',
            isRequired: false,
            validator: validator.birthDate,
            state: birthDate,
            setState: setBirthDate,
            errorMessage: 'Deve ser uma data v??lida.',
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
            label: 'Classe econ??mica',
            helperText: 'Digite sua classe econ??mica',
            isRequired: false,
            validator: validator.economicClass,
            state: economicClass,
            setState: setEconomicClass,
        },
        diplomaticAxis: {
            value: diplomaticAxis,
            label: 'Diplom??tica',
            helperText: 'Digite sua nota de Diplom??tica',
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
            label: 'Econ??mica',
            helperText: 'Digite sua nota de Econ??mica',
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

    return <Box w={'100%'} bg={'white'} p={'5'} shadow={'md'}>
        <VStack gap={20} w={'100%'}>
            
            <VStack gap={2} w={'100%'}>
                <TextInput {...props.name} />
                <TextInput {...props.email} />
                <Password {...props.password} />
                <TextInput {...props.cpf} />
                <TextInput {...props.phone} />
            </VStack>

            <VStack gap={2} w={'100%'}>
                <SelectInput {...props.voteStateAbbreviation} />
                <TextInput {...props.birthDate} />
            </VStack>

            <VStack gap={2} w={'100%'}>
                <SliderInput {...props.diplomaticAxis} />
                <SliderInput {...props.economicAxis} />
                <SliderInput {...props.civilAxis} />
                <SliderInput {...props.socialAxis} />
            </VStack>

            <VStack gap={2} w={'100%'}>
                <Text color={'red'}>{validation.error?.message}</Text>
                <Button colorScheme='facebook' isDisabled={!isValid} onClick={submitHandler}>{ 'Salvar dados' }</Button>
            </VStack>

        </VStack>
    </Box>


    async function submitHandler() {
        setLoading(true)

        const sendData = {} as any;
        const referralId = localStorage.getItem('polis_referralId') || null;

        Object.keys(data).forEach(key => {
            if (data[key as keyof typeof data]) {
                sendData[key] = data[key as keyof typeof data];
            }
        })

        const response = await signUp(sendData, referralId);
        if (response.status === 201) {
            toast({
                title: 'Infos salvas!',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
        } else {
            toast({
                title: response.response.statusText,
                description: response.response.data,
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
        setLoading(false)
    }

    function loadUserData() {
        loadData(user?.name, setName);
        loadData(user?.email, setEmail);
        loadData(user?.password, setPassword);
        loadData(user?.cpf, setCpf);
        loadData(user?.voteStateAbbreviation, setVoteStateAbbreviation);
        loadData(user?.phone, setPhone);
        loadData(user?.birthDate, setBirthDate);
        loadData(user?.economicClass, setEconomicClass);
        loadData(user?.diplomaticAxis, setDiplomaticAxis);
        loadData(user?.economicAxis, setEconomicAxis);
        loadData(user?.civilAxis, setCivilAxis);
        loadData(user?.socialAxis, setSocialAxis);

        function loadData(data: any, setter: (v: any) => void) {
            if (data) {setter(data)}
        }
    }
}

const arrays = {
    divi: ["Separatista","Confederalista","Descentralista","Neutro","Devolucionista","Centralista","Unit??rio"],
    govt: ["Anarquista","Libert??rio","Liberal","Moderado","Estatista","Autorit??rio","Totalit??rio"],
    mili: ["Cosmopolitano","Internacionalista","Conformista","Equilibrado","Patri??tico","Nacionalista","Chauvinista"],
    prot: ["Vigil??ncia em massa Global","Vigil??ncia em massa","Vigil??ncia Policial","Neutro","Privacidade do Governo","Privacidade do Governo e Corpora????es","Privacidade Total"],
    econ: ["Comunista","Socialista","Social Democrata","Centrista","Apoiante de Livre Mercado","Capitalista","Laissez-Faire"],
    reli: ["Anticlericalista","Laicista","Secularista","Neutro","Etocrata","Teocrata","Clericalista"],
    scty: ["Revolucion??rio","Muito Progressista","Progressista","Neutro","Tradicional","Conservador","Reacion??rio"],
    cult: ["Monoculturalista","Multicomunitarista","Interculturalista","Neutro","Assimilacionista","Multiculturalista","Intraculturalista"]
}

const ufs = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amap??' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Cear??' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Esp??rito Santo' },
    { value: 'GO', label: 'Goi??s' },
    { value: 'MA', label: 'Maranh??o' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Par??' },
    { value: 'PB', label: 'Para??ba' },
    { value: 'PR', label: 'Paran??' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piau??' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rond??nia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'S??o Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' },
]