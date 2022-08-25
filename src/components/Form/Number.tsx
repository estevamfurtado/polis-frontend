import { TriangleUpIcon } from "@chakra-ui/icons";
import { Button, Input, useNumberInput } from "@chakra-ui/react"
import Joi from "joi";
import { useRef, useState } from "react";
import Form from "."

type NumberProps = {
    label: string;
    helperText?: string;
    isRequired?: boolean;
    validator: Joi.Schema;
    state: number | null;
    setState: (value: number) => void;
    placeholder?: string;
    errorMessage?: string;
    type?: string;

    checkError?: (value: number) => Promise<string | null>;
}

export default function NumberInput ({
    label, helperText, isRequired, validator,
    state, setState, placeholder, errorMessage, checkError
} : NumberProps) {

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
        step: 1,
        defaultValue: 1990,
        min: 1920,
        max: 2020,
        allowMouseWheel: true
    });

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()


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
    
    async function checkingError(v: number) {
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
            const v = Number(ref.current.value);
            setState(v);
            const err = await checkingError(v);
            setError(err);
        }
    }

    return <Form {...formProps} >
        <Input ref={ref} {...input} {...inputProps} fontSize={'sm'} variant='solid' bg='gray.700'/>
        <Button {...dec}>-</Button>
        <Button {...inc}>+</Button>
    </Form>
}