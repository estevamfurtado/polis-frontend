import { HStack, Select, Square, VStack } from "@chakra-ui/react"
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

export default function SelectBoxInput ({
    value, label, isRequired, validator,
    state, setState, errorMessage,
    options
} : SelectProps) {

    const erro = value ? (validator.validate(value).error ? errorMessage : null) : null;

    const formProps = {
        label, isRequired, errorMessage: erro
    }

    return <Form {...formProps} >
        <HStack>
            {options.map(({value: v, label: l}) => <Option value={v} label={l} selected={state} setSelected={setState}/>)}
        </HStack>
    </Form>
}

function Option({value, label, selected, setSelected}: {value: any, label: string, selected: any, setSelected: (value: any)=>void}) {

    const isSelected = value === selected;

    return <Square size='40' flex='1 1 auto'
        onClick={()=>{
            isSelected ? setSelected(null) : setSelected(value)
        }}
        borderRadius='lg' 
        bg={isSelected ? '#4a817f' : 'rgba(100,100,100, 0.1)'}
        _hover={
            {bg: isSelected ? '#4a817f' : 'rgba(100,100,100, 0.5)'}
        }
        cursor='pointer'
        fontWeight={'semibold'}
    >
        {label}
    </Square>
}



