import { Box, HStack, VStack , Heading} from "@chakra-ui/react";
import { PropsWithChildren } from "react"
import { MyButton } from "../Buttons";


export default function InStackSection ({title, button, children} : PropsWithChildren & {
    title: string,
    button?: {
        title: string,
        onClick: () => void
    } 
}) {

    return <VStack spacing='2' w='100%' align='start' px='3'>
        <HStack justify={'space-between'} align='end' w='100%'>
            <Heading as='h3' fontSize={'md'} opacity='70%'>{title}</Heading>
            {button ? 
                <MyButton
                    type='main'
                    onClick={button.onClick}
                >{button.title}</MyButton>
                
            : <></>}
        </HStack>
        <Box bg='gray.850' w='100%' py='3' borderRadius={'lg'}>
            {children}
        </Box>    
    </VStack>
}

