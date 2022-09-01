import { TriangleUpIcon } from "@chakra-ui/icons";
import { Button, HStack, Input,
    useNumberInput, NumberInput, NumberInputField,
    NumberIncrementStepper, NumberDecrementStepper,
    NumberInputStepper
} from "@chakra-ui/react"
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

export default function YearInput ({
    label, helperText, isRequired, validator,
    setState, errorMessage, checkError
} : NumberProps) {

    const [error, setError] = useState<string | null>(null)

    const ref = useRef<HTMLInputElement>(null);
    const value = ref ? (ref.current?.value ?? null) : null

    const styles = {
        fontSize: 'sm',
        variant: 'solid',
        bg: 'gray.700'
    }

    const inputProps = {
        step: 1,
        defaultValue: 1990,
        min: 1920,
        max: 2020,
        allowMouseWheel: true,
        onChange,
    }

    const formProps = {
        value, label, helperText, isRequired, validator, errorMessage: error
    }

    return <Form {...formProps}>
        <NumberInput {...inputProps}>
            <NumberInputField ref={ref} {...styles} border={'none'}/>
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    </Form>

    function onChange(v: string) {
        const val = Number(v);
        if (val > 0) {
            setState(val)
            checkingError(val)
        }
    }

    async function checkingError(v: number) {
        if (validator.validate(v).error) {
            return errorMessage ?? null;
        }
        if (checkError) {
            setError(await checkError(v));
        }
        return null;
    }
}