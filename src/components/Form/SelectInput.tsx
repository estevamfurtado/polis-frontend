import { Text, Badge, Flex, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Select } from "@chakra-ui/react"
import Joi from "joi";
import Form from "."

type SelectProps = {
    value: any;
    label: string;
    helperText?: string;
    isRequired?: boolean;
    validator: Joi.Schema;
    state: string | null;
    setState: (value: string) => void;
    placeholder?: string;
    errorMessage?: string;
    options: {
        value: string;
        label: string;
    }[]
}

export default function SelectInput ({
    value, label, helperText, isRequired, validator,
    state, setState, placeholder, errorMessage,
    options
} : SelectProps) {

    const formProps = {
        value, label, helperText, isRequired, validator, errorMessage
    }
    const inputProps = {
        type: 'number',
        value, placeholder, state,
        onChange: (e : React.ChangeEvent<HTMLInputElement>) => {setState(e.target.value)}
    }

    return <Form {...formProps} >
        <Select border='none' bg='gray.700' fontSize='sm' placeholder='Selecione seu estado' onChange={(e)=>{setState(e.target.value)}}>
            {options.map(({value, label}) => <option key={value} value={value}>{label}</option>)}
        </Select>
    </Form>
}



