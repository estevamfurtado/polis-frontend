import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, Badge, IconButton} from "@chakra-ui/react";
import { PropsWithChildren, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext"


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
            {button ? <Box 
                as='button'
                fontSize='sm'
                fontWeight='bold'
                color='white' 
                bg='#165967'
                boxShadow={'0 3px 0 #13424B'}
                px='4' py='2' borderRadius='lg'
                onClick={button.onClick}
            >{button.title}</Box> : <></>}
        </HStack>
        <Box bg='gray.850' w='100%' py='3' borderRadius={'lg'}>
            {children}
        </Box>    
    </VStack>
}

