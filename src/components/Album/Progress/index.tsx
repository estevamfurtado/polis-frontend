import { CircularProgress, CircularProgressLabel, HStack } from "@chakra-ui/react"
import { useContext } from "react"

import {AlbumContext} from '../../../contexts/AlbumContext'

export default function Progress ({fontSize, size} : {fontSize: string, size: string}) {
    
    const {progressValue} = useContext(AlbumContext) 
    
    return <HStack justify={'center'} align='center' h='100%'>
        <CircularProgress value={progressValue*100} color='blue.400' size={size} trackColor='gray.700' capIsRound={true}>
            <CircularProgressLabel fontSize={fontSize}>{
                `${Math.round(progressValue*100)}%`
            }</CircularProgressLabel>
        </CircularProgress>
    </HStack>
}