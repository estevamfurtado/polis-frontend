import { SearchIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Input, InputGroup, InputLeftElement, Select, HStack } from "@chakra-ui/react";

export function ControlePartidos() {
    return <HStack align={'center'} w='100%' h='100%' padding='2'>
            <IconButton aria-label='Search database' icon={<SearchIcon />} />
    </HStack>
}

