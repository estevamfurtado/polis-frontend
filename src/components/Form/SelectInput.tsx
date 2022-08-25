import { Select } from "@chakra-ui/react"
import Joi from "joi";
import Form from "."

type SelectProps = {
    value: any;
    label: string;
    helperText?: string;
    isRequired?: boolean;
    validator: Joi.Schema;
    state: any | null;
    setState: (value: any) => void;
    placeholder?: string;
    errorMessage?: string;
    options: {
        value: any;
        label: string;
    }[]
}

export default function SelectInput ({
    value, label, isRequired, validator,
    state, setState, placeholder, errorMessage,
    options
} : SelectProps) {

    const erro = value ? (validator.validate(value).error ? errorMessage : null) : null;

    const formProps = {
        label, isRequired, errorMessage: erro
    }

    return <Form {...formProps} >
        <Select border='none' bg='gray.700' fontSize='sm' placeholder={placeholder} onChange={(e)=>{setState(e.target.value)}}>
            {options.map(({value: v, label: l}) => <option key={v} value={v}>{l}</option>)}
        </Select>
    </Form>
}



