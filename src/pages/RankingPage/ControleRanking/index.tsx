import { SearchIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Input, InputGroup, InputLeftElement, Select, HStack } from "@chakra-ui/react";

export function ControleRanking() {
    return <Flex h='100%' align='center' justify='center' px='5'>
        <Flex h='100%' w='100%' maxW='750px' align='center' justify='space-between'>
            <HStack>
                <InputGroup maxW='400px' boxShadow='sm' size='md' my='70px'>
                    <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                    />
                    <Input type='text' placeholder='Procurar...' border='none' cursor='pointer'/>
                </InputGroup>
            </HStack>
    
            <HStack>
                <Select placeholder='Select option' maxW="100px">
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select>
            </HStack>
        </Flex>
    </Flex>
}

