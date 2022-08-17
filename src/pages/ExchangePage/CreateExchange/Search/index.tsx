import { VStack, Input, HStack, Text } from "@chakra-ui/react";
import * as api from "../../../../services/reqs";

type UserInfo = {
    id: number;
    email: string;
    name: string;
}

export default function Search ({text, setText, users, setUsers, clickUser} : {
    text: string;
    setText: (text: string) => void;
    users: UserInfo[];
    setUsers: (users: UserInfo[]) => void;
    clickUser: (user: UserInfo) => void;
}) {
    
    return <VStack w='100%' align='center' spacing='0'>
        <Input borderColor='gray.400' placeholder='Procurar email...' value={text} onChange={handleSearchInput}/>
        <VStack w='95%' boxShadow='lg' bg='white' borderBottomRadius={'lg'}>
            {users.map(user => {
                return <HStack key={user.id} onClick={()=>{clickUser(user)}} cursor='pointer' w='100%' px='3' py='2' _hover={{backgroundColor: 'gray.100'}}>
                    <Text fontSize='sm'>{user.name}</Text>
                    <Text color='gray.400' fontSize='sm'>{user.email}</Text>
                </HStack>
            })}
        </VStack>
    </VStack>

    async function handleSearchInput (e: any) {
        const value = e.target.value || '' as string;
        setText(value);
        
        if (value) {
            const response = await api.searchUsers(value);
            setUsers(response.data);
        }
        else {
            setUsers([]);
        }
    }
}