import { VStack, Input, HStack, Text, Heading} from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { NewRequestContext } from "../../../contexts/NewRequestContext";
import {UserInfo} from "../../../types";



export default function Search () {
    
    const {users, searchUsers, setUsers} = useContext(NewRequestContext);
    const ref = useRef<HTMLInputElement | null>(null)

    return <VStack w='100%' align='center' bg='gray.700' py='5' px='5' borderRadius='10' spacing='5'>
        <Heading size='sm'>Selecione um usuário</Heading>
        <VStack w='100%' spacing='0'>
            <Input ref={ref} bg='rgba(255, 255, 255, 0.1)' textAlign={'center'} border='none' placeholder='Procurar usuário...' onChange={handleInput}/>
            <VStack bg='rgba(0, 0, 0, 0.1)' w='100%' spacing='0'>
                {users.map(user => {
                    return <UsersSearchItem key={user.id}  user={user}/>
                })}
            </VStack>
        </VStack>
    </VStack>

    async function handleInput (e: React.ChangeEvent<HTMLInputElement>) {
        if (ref.current) {
            const email = ref.current.value.toLowerCase().replaceAll(' ', '');
            ref.current.value = email;
            if (email.length > 2) {
                searchUsers(email)
            } else {
                setUsers([]);
            }
        }
    }
}

function UsersSearchItem ({user}: {user: UserInfo}) {
    const {clickUser} = useContext(NewRequestContext);

    return <HStack onClick={()=>{clickUser(user)}} 
        cursor='pointer' w='100%' px='3' py='2'
        >
        <Text fontSize='sm' fontWeight='semibold'>{user.username ?? (user.email?.split('@')[0] ?? '')}</Text>
    </HStack>
}