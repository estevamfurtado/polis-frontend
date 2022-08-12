// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT22FfMdSWirkYEVOdxyj2nN1LpVxP1m6fWOUALDT9Vxfxa_1jpZQjAXIbVhphrbXIflfc&usqp=CAU

import { Box, Image } from "@chakra-ui/react"


export default function StickerPack () {
    return <Box w='190px' h='240px' bg='teal' shadow={'2xl'} position='relative'>

        <Image w='100%' src="/pack1.png" alt=""  
        mixBlendMode='soft-light'
        />

        <Image w='50%' src="/whitelogo1.png" alt="" position='absolute' 
            
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
        />
    </Box>
}