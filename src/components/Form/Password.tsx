import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react"
import Joi from "joi";
import { useState } from "react";
import Form from "."

type Password = {
    value: any;
    label: string;
    helperText?: string;
    isRequired?: boolean;
    validator: Joi.Schema;
    state: string | null;
    setState: (value: string) => void;
    placeholder?: string;
    errorMessage?: string;
}


export default function Password ({
    value, label, helperText, isRequired, validator, errorMessage,
    state, setState, placeholder, 
} : Password) {
    
    const [showPassword, setShowPassword] = useState(false);
    
    const formProps = {
        value, label, helperText, isRequired, validator, errorMessage
    }
    const inputProps = {
        type: showPassword ? 'text' : 'password',
        value, placeholder, state,
        onChange: (e : React.ChangeEvent<HTMLInputElement>) => {setState(e.target.value)}
    }


    return <Form {...formProps}>
        <InputGroup>
            <Input {...inputProps} fontSize={'sm'} variant='solid' bg='gray.700'/>
            <InputRightElement width={'auto'}>
                <Button _hover={{bg: 'transparent'}} _focus={{bg: 'transparent'}} variant={'ghost'} h={'100%'} size={'sm'} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                </Button>
            </InputRightElement>
        </InputGroup>
    </Form>
}

