import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react"
import InStackSection from "../InStackSection";


export function CardsWrap({title, button, children, height} : PropsWithChildren & {height: string, title: string, button?: {title: string, onClick: ()=>void}}) {
    return <InStackSection title={title} button={button}>
        <Flex w='100%' h={height}
            direction='column'
            wrap='wrap'
            overflowY='scroll'
            gap='5'
            px='5'
            justify='center'
        >
            {children}
        </Flex>
    </InStackSection>
}
