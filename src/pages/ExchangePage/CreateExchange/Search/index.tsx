import { VStack, Input, HStack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { DataContext } from "../../../../contexts/DataContext";
import { NewRequestContext } from "../../../../contexts/NewRequestContext";
import * as api from "../../../../services/reqs";

type UserInfo = {
    id: number;
    email: string;
    name: string;
}

export default function Search () {
    
    const {} = useContext(DataContext);
    const {users, text, searchUsers, clickUser} = useContext(NewRequestContext);


    return <VStack w='100%' align='center' spacing='0'>
        <Input borderColor='gray.400' placeholder='Procurar email...' value={text} onChange={(e) => searchUsers(e.target.value)}/>
        <VStack w='95%' boxShadow='lg' bg='white' borderBottomRadius={'lg'}>
            {users.map(user => {
                return <HStack key={user.id} onClick={()=>{clickUser(user)}} cursor='pointer' w='100%' px='3' py='2' _hover={{backgroundColor: 'gray.100'}}>
                    <Text fontSize='sm'>{user.name}</Text>
                    <Text color='gray.400' fontSize='sm'>{user.email}</Text>
                </HStack>
            })}
        </VStack>
    </VStack>
}