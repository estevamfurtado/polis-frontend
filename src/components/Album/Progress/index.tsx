import { CircularProgress, CircularProgressLabel, HStack } from "@chakra-ui/react"
import { useContext } from "react"


export default function Progress ({fontSize, size} : {fontSize: string, size: string}) {
    
    const progressValue = 0.5; 
    
    return <HStack justify={'center'} align='center' h='100%'>
        <CircularProgress value={progressValue*100} color='blue.400' size={size} trackColor='gray.700' capIsRound={true}>
            <CircularProgressLabel fontSize={fontSize}>{
                `${Math.round(progressValue*100)}%`
            }</CircularProgressLabel>
        </CircularProgress>
    </HStack>
}