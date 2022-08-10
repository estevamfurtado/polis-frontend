import { Box, Button, Flex, HStack, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";


type Props = {
    label: string;
    emoji?: string;
    isSelected: boolean;
    goTo: string;
    variant?: 'solid' | 'outline' | 'ghost' | 'link';
    colorScheme?: "whiteAlpha" | "blackAlpha" | "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink" | "linkedin" | "facebook" | "messenger" | "whatsapp" | "twitter" | "telegram";
}


export default function NavTab({label, emoji, goTo, isSelected, colorScheme, variant} : Props) {

    const leftIconComponent = <>{emoji}</>;

    const leftIconObj = emoji ? {leftIcon: leftIconComponent} : {};

    return <Button 
        as={NavLink} to={goTo} 
        size={'sm'}
        variant= {isSelected ? ('solid') : (variant ? variant : 'ghost')}
        colorScheme={colorScheme ? colorScheme : 'gray'}
        fontWeight={'medium'}
        transition='none'
        {...leftIconObj}
    >{label}</Button>;
} 