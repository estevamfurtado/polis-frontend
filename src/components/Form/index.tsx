import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/react";
import Joi from "joi";

type FormProps = {
    value: any;
    children: React.ReactNode;
    label: string;
    helperText?: string;
    isRequired?: boolean;
    validator: Joi.Schema;
    errorMessage?: string;
}

export default function Form ({value, label, helperText, children, isRequired, validator, errorMessage}: FormProps) {

    const hasError = validator.validate(value).error ? true : false;
    const errorMsg = errorMessage ? errorMessage : (validator.validate(value).error?.message ?? '');
    const notEmpty = (value && value !== '') ? true : false;
    const showError = hasError && notEmpty;

    const formError = <FormErrorMessage>{errorMsg}</FormErrorMessage>
    const formHelperText = <FormHelperText>{helperText}</FormHelperText>

    return <FormControl isRequired={isRequired} isInvalid={showError}>
        <FormLabel fontSize='sm'>{label}</FormLabel>
        {children}
        {showError ? formError : null}
    </FormControl>
}