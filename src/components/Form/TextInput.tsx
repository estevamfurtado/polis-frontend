import { Input } from "@chakra-ui/react"
import Joi from "joi";
import Form from "."

type TextProps = {
    value: any;
    label: string;
    helperText?: string;
    isRequired?: boolean;
    validator: Joi.Schema;
    state: string | null;
    setState: (value: string) => void;
    placeholder?: string;
    errorMessage?: string;
    type?: string;
    inputProcessor?: (value: string) => string;
}

export default function TextInput ({
    value, label, helperText, isRequired, validator,
    state, setState, placeholder, errorMessage, type, inputProcessor
} : TextProps) {

    const formProps = {
        value, label, helperText, isRequired, validator, errorMessage
    }
    const inputProps = {
        type: type ? type : 'text',
        value, placeholder, state,
        onChange
    }

    function onChange (e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value;
        if (inputProcessor) {
            value = inputProcessor(e.target.value);
        }
        setState(value)
    }

    return <Form {...formProps} >
        <Input {...inputProps} borderColor='gray.300'/>
    </Form>
}