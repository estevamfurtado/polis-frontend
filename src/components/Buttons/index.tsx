import { Box } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

export function MainButton ({children, size, onClick, px, py, disabled, borderRadius, w, h} : PropsWithChildren & {
    size?: string,
    onClick?: (React.MouseEventHandler<HTMLDivElement> & React.MouseEventHandler<HTMLButtonElement>)
    px?: string,
    py?: string,
    w?: string,
    h?: string,
    disabled?: boolean
    borderRadius?: string
}) {
    return <Box pt='0' pb='3px' _active={{pt: '3px', pb: '0', transition: 'all 0.2s'}} w={w ?? ''} h={h ?? ''}>
        <Box 
            as='button'
            
            onClick={onClick}
            disabled={disabled ?? false}
            
            fontSize={size ?? 'sm'}
            fontWeight='bold'
            
            px={px ?? '4'} py={py ?? '2'} borderRadius={borderRadius ?? 'lg'}
            
            w='100%'
            h='100%'
            
            color='white' 
            _hover={{bg: 'rgba(82, 158, 155)'}}
            bg='rgb(74,129,127)'
            boxShadow={'0 3px 0 rgb(47, 74, 73)'}

            _active={{boxShadow: '0 0 0 rgb(47, 74, 73)', transition: 'all 0.2s'}}
        >
            {children}
        </Box>
    </Box>
}

export function GrayButton ({children, size, onClick, px, py, disabled, borderRadius, w, h} : PropsWithChildren & {
    size?: string,
    onClick?: (React.MouseEventHandler<HTMLDivElement> & React.MouseEventHandler<HTMLButtonElement>)
    px?: string,
    py?: string,
    w?: string,
    h?: string,
    disabled?: boolean
    borderRadius?: string
}) {
    return <Box pt='0' pb='3px' _active={{pt: '3px', pb: '0', transition: 'all 0.2s'}} w={w ?? ''} h={h ?? ''}>
        <Box 
            as='button'
            
            onClick={onClick}
            disabled={disabled ?? false}
            
            fontSize={size ?? 'sm'}
            fontWeight='bold'
            
            px={px ?? '4'} py={py ?? '2'} borderRadius={borderRadius ?? 'lg'}
            
            w='100%'
            h='100%'

            color='white' 
            _hover={{bg: '#666'}}
            bg='#555'
            boxShadow={'0 3px 0 #222'}

            _active={{boxShadow: '0 0 0 #222', transition: 'all 0.2s'}}
        >
            {children}
        </Box>
    </Box> 
}