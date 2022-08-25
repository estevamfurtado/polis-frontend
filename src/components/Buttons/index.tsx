import { Box, ToastProps, useToast, UseToastOptions } from "@chakra-ui/react"
import { PropsWithChildren, ReactNode, useState } from "react"

type ButtonColors = {
    bg: string,
    bgHover: string,
    shadow: string
}

type buttonTypes = 'main' | 'gray';

const buttonTypeStyles : {[key in buttonTypes]: ButtonColors} = {
    gray: {bgHover: '#666', bg: '#555', shadow: '#222'},
    main: {bgHover: 'rgba(82, 158, 155)', bg: 'rgb(74,129,127)', shadow: 'rgb(47, 74, 73)'},
}




export function MyButton (
    {type, children, size, onClick, px, py, borderRadius, w, h, disabled, loading}
    : PropsWithChildren & {
        type?: buttonTypes,
        size?: string,
        onClick?: () => Promise<UseToastOptions | null | undefined | void> | void;
        px?: string,
        py?: string,
        w?: string,
        h?: string,
        borderRadius?: string,
        disabled?: boolean,
        loading?: ReactNode | undefined,
    }
) {

    const [isDisabled, setIsDisabled] = useState((disabled === undefined) ? false : disabled);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const btnType = type ? type : 'gray';
    const btnStyles = buttonTypeStyles[btnType];

    return <Box pt='0' pb='3px' _active={{pt: '3px', pb: '0', transition: 'all 0.2s'}} w={w ?? ''} h={h ?? ''}>
        <Box 
            as='button'
            onClick={handleClick}
            disabled={isDisabled || isLoading}
            fontSize={size ?? 'sm'}
            fontWeight='bold'
            px={px ?? '4'} py={py ?? '2'} borderRadius={borderRadius ?? 'lg'}
            w='100%'
            h='100%'
            color='white' 
            _hover={{bg: btnStyles.bgHover}}
            bg={btnStyles.bg}
            boxShadow={`0 3px 0 ${btnStyles.shadow}`}
            _active={{boxShadow: `0 0 0 ${btnStyles.shadow}`, transition: 'all 0.2s'}}
            _disabled={{opacity: '80%'}}
        >
            {
                !isLoading ? children
                    : loading ? loading
                        : <>Carregando</>
            }
        </Box>
    </Box>

    async function handleClick() {
        setIsLoading(true);
        if (onClick) {
            const toastProps = await onClick();
            if (toastProps) {
                toast(toastProps)
            }
        }
        setIsLoading(false);
    }
}
