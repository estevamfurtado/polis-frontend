// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT22FfMdSWirkYEVOdxyj2nN1LpVxP1m6fWOUALDT9Vxfxa_1jpZQjAXIbVhphrbXIflfc&usqp=CAU

import { Box, Image, Text } from "@chakra-ui/react"

export default function AlbumCover () {
    return <Box w='300px' h='400px' bg='blue.800' shadow={'2xl'} position='relative'>

        <Image w='100%' h='100%' src="https://t4.ftcdn.net/jpg/01/22/52/43/360_F_122524355_LiKGsIhPz5klSRpD8NQTrEy7gqmX5HbH.jpg" alt=""  
            mixBlendMode='soft-light' opacity={0.3}
        />

        <Image w='40%' src="/whitelogo2.png" alt="" position='absolute' 
                    
                    top='50%'
                    left='50%'
                    transform='translate(-50%, -50%)'
                />

        <Box w='40%' 
            position='absolute' 
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
        >
            <Text>ÁLBUM DOS POLÍTICOS</Text>
            <Text>2022</Text>
        </Box>
    </Box>
}

