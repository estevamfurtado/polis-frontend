import joi from 'joi';
import { useState } from 'react';

export default function useInput(initialValue: any, validator: joi.Schema) : [any, (value: any)=>void, string, ()=>void] {
    const [value, setStateValue] = useState(initialValue);
    const [error, setError] = useState('');

    function setValue (value: any) {
        const {error} = validator.validate(value);
        if (error) {
            setError(error.message);
        }
        else {setError('')}
        setStateValue(value);
    }

    function clearError () {
        setError('');
    }

    return [value, setValue, error, clearError];
}