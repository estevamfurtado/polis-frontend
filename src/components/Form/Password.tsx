import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react"
import Joi from "joi";
import { useState, useRef } from "react";
import Form from "."

type PasswordProps = {
    label: string;
    helperText?: string;
    isRequired?: boolean;
    validator: Joi.Schema;
    state: string | null;
    setState: (value: string) => void;
    placeholder?: string;
    errorMessage?: string;
    type?: string;

    mask?: (value: string) => string;
    checkError?: (value: string) => Promise<string | null>;
}


export default function Password ({
    label, helperText, isRequired, validator, errorMessage,
    state, setState, placeholder, checkError, mask
} : PasswordProps) {
    
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const ref = useRef<HTMLInputElement>(null);
    const value = ref ? (ref.current?.value ?? null) : null
    
    const formProps = {
        value, label, helperText, isRequired, validator, errorMessage: error
    }
    const inputProps = {
        placeholder, state,
        onChange
    }
    
    async function checkingError(v: string) {
        if (validator.validate(v).error) {
            return errorMessage ?? null;
        }
        if (checkError) {
            return await checkError(v);
        }
        return null;
    }

    async function onChange () {
        if (ref.current) {
            let v = ref.current.value;
            v = mask ? mask(v) : v;
            ref.current.value = v;
            setState(v);
            const err = await checkingError(v);
            setError(err);
        }
    }

    return <Form {...formProps}>
        <InputGroup>
            <Input ref={ref} type={showPassword ? 'text' : 'password'} {...inputProps} fontSize={'sm'} variant='solid' bg='gray.700'/>
            <InputRightElement width={'auto'}>
                <Button _hover={{bg: 'transparent'}} _focus={{bg: 'transparent'}} variant={'ghost'} h={'100%'} size={'sm'} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                </Button>
            </InputRightElement>
        </InputGroup>
    </Form>
}

