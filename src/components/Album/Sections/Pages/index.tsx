import {VStack} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AlbumViewContext } from "../../../../contexts/AlbumViewContext";
import Page from "./Page";


type FunctionalPage = {
    title: string,
    badge?: string,
    description?: string,
    color?: string,
    stickers: number[],
}



export default function Pages ({pages, type} : {pages: FunctionalPage[], type: 'parties' | 'states'}) {
    
    const {mode, pageSection} = useContext(AlbumViewContext)
    
    useEffect(()=>{
        mode.set('pages');
        pageSection.set(type)
    }, [])


    return <VStack w='100%' gap='0' overflowY={'scroll'}>            
        {
            pages.map((pg, index) => {
                return <Page key={index} page={pg} classType={type}/>;
            })
        }
    </VStack>

}