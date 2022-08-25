import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/react";
import Joi from "joi";
import { PropsWithChildren } from "react";

type FormProps = {
    label: string;
    isRequired?: boolean;
    errorMessage?: string | null;
} & PropsWithChildren

export default function Form ({label, isRequired, errorMessage, children}: FormProps) {

    const hasError = errorMessage ? true : false;

    return <FormControl isRequired={isRequired} isInvalid={hasError}>
        <FormLabel fontSize='sm' w='100%'>{label}</FormLabel>
        {children}
        {hasError ? <FormErrorMessage>{errorMessage}</FormErrorMessage> : null}
    </FormControl>
}