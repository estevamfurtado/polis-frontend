import { Box, HStack, VStack , Heading} from "@chakra-ui/react";
import { PropsWithChildren } from "react"
import { MainButton } from "../Buttons";


export default function InStackSection ({title, button, children} : PropsWithChildren & {
    title: string,
    button?: {
        title: string,
        onClick: (p: any) => void
    } 
}) {

    return <VStack spacing='2' w='100%' align='start' px='3'>
        <HStack justify={'space-between'} align='end' w='100%'>
            <Heading as='h3' fontSize={'md'} opacity='70%'>{title}</Heading>
            {button ? 
                <MainButton
                    onClick={button.onClick}
                >{button.title}</MainButton>
                
            : <></>}
        </HStack>
        <Box bg='gray.850' w='100%' py='3' borderRadius={'lg'}>
            {children}
        </Box>    
    </VStack>
}

