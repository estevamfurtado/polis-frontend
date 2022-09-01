import { Flex } from "@chakra-ui/react";
import { PropsWithChildren, useEffect, useState } from "react"
import CenterLoading from "../CenterLoading";
import InStackSection from "../InStackSection";


export function CardsWrap({title, button, children, height} : PropsWithChildren & {height: string, title: string, button?: {title: string, onClick: ()=>void}}) {
    
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(false)
    },[])
    
    return <InStackSection title={title} button={button}>
        <Flex w='100%' h={height}
            direction='column'
            wrap='wrap'
            overflowY='scroll'
            gap='5'
            px='5'
            justify='center'
        >
            {loading ? <CenterLoading/> : (
                children
            )}
        </Flex>
    </InStackSection>
}
