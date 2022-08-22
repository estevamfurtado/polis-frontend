import { VStack, Input, HStack, Text, Heading} from "@chakra-ui/react";
import { useContext } from "react";
import { DataContext } from "../../../contexts/DataContext";
import { NewRequestContext } from "../../../contexts/NewRequestContext";
import * as api from "../../../services/reqs";

type UserInfo = {
    id: number;
    email: string;
    name: string;
}

export default function Search () {
    
    const {} = useContext(DataContext);
    const {users, text, searchUsers, setUsers, setText, clickUser} = useContext(NewRequestContext);

    return <VStack w='100%' align='center' bg='gray.700' py='5' px='5' borderRadius='10'>
        <Input bg='rgba(255, 255, 255, 0.1)' textAlign={'center'} border='none' placeholder='Procurar email...' value={text} onChange={handleInput}/>
        <VStack bg='rgba(0, 0, 0, 0.1)' w='100%'>
            {users.map(user => {
                return <UsersSearchItem key={user.id}  user={user}/>
            })}
        </VStack>
    </VStack>

    async function handleInput (e: React.ChangeEvent<HTMLInputElement>) {
        const email = e.target.value;
        setText(email);
        if (email.length > 2) {
            searchUsers(email)
        } else {
            setUsers([]);
        }
    }
}

function UsersSearchItem ({user}: {user: UserInfo}) {
    const {clickUser} = useContext(NewRequestContext);

    return <HStack onClick={()=>{clickUser(user)}} 
        cursor='pointer' w='100%' px='3' py='2'
        >
        <Text fontSize='sm' fontWeight='semibold'>{user.name}</Text>
        <Text color='gray.400' fontSize='sm'>{user.email}</Text>
    </HStack>
}