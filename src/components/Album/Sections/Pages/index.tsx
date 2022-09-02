import {VStack} from "@chakra-ui/react";
import Page from "./Page";


type FunctionalPage = {
    title: string,
    badge?: string,
    description?: string,
    color?: string,
    stickers: number[],
}



export default function Pages ({pages, type} : {pages: FunctionalPage[], type: 'parties' | 'states'}) {

    return <VStack w='100%' gap='0' overflowY={'scroll'}>            
        {
            pages.map((pg, index) => {
                return <Page key={index} page={pg} classType={type}/>;
            })
        }
    </VStack>

}