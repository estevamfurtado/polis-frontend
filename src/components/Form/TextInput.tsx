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
}

export default function TextInput ({
    value, label, helperText, isRequired, validator,
    state, setState, placeholder, errorMessage
} : TextProps) {

    const formProps = {
        value, label, helperText, isRequired, validator, errorMessage
    }
    const inputProps = {
        type: 'text',
        value, placeholder, state,
        onChange: (e : React.ChangeEvent<HTMLInputElement>) => {setState(e.target.value)}
    }

    return <Form {...formProps} >
        <Input {...inputProps}/>
    </Form>
}