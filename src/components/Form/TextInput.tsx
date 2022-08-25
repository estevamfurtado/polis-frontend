import { Input } from "@chakra-ui/react"
import Joi from "joi";
import { useRef, useState } from "react";
import Form from "."

type TextProps = {
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

export default function TextInput ({
    label, helperText, isRequired, validator,
    state, setState, placeholder, errorMessage, type, mask, checkError
} : TextProps) {

    const [error, setError] = useState<string | null>(null)

    const ref = useRef<HTMLInputElement>(null);
    const value = ref ? (ref.current?.value ?? null) : null
    
    const formProps = {
        value, label, helperText, isRequired, validator, errorMessage: error
    }
    const inputProps = {
        type: type ? type : 'text',
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

    return <Form {...formProps} >
        <Input ref={ref} {...inputProps} fontSize={'sm'} variant='solid' bg='gray.700'/>
    </Form>
}