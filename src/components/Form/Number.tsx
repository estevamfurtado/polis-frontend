import { Input } from "@chakra-ui/react"
import Joi from "joi";
import Form from "."

type NumberProps = {
    value: any;
    label: string;
    helperText?: string;
    isRequired?: boolean;
    validator: Joi.Schema;
    state: number | null;
    setState: (value: number) => void;
    placeholder?: string;
    errorMessage?: string;
}

export default function Number ({
    value, label, helperText, isRequired, validator,
    state, setState, placeholder, errorMessage
} : NumberProps) {

    const formProps = {
        value, label, helperText, isRequired, validator, errorMessage
    }
    const inputProps = {
        type: 'number',
        value, placeholder, state,
        onChange: (e : React.ChangeEvent<HTMLInputElement>) => {setState(parseInt(e.target.value))}
    }

    return <Form {...formProps} >
        <Input {...inputProps}/>
    </Form>
}