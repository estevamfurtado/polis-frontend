import { VStack, Text, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function ReferralLandingPage () {

    const [searchParams] = useSearchParams();
    const referralId = searchParams.get('id');
    const navigate = useNavigate();

    useEffect (()=>{
        if (referralId) {
            localStorage.setItem('polis_referralId', referralId);
        }
    } , [])

    return <VStack align='center' py='5'>

        <Text>
            Bem-vindo ao Polis!
        </Text>
        <Text>
            Se inscreva e ganhe o Álbum dos Deputados 2022.
        </Text>
        <Button variant='solid' colorScheme='teal' onClick={()=>{
            navigate('/sign-up')
        }}>
            Inscrever-se
        </Button>

    </VStack>

}