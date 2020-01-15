import React from 'react';

interface InputProps {
    name: string,
    value: string,
    handleChange: (value: string) => void,
    error: string | null,
    placeholder: string
    setError: (value: string) => void;
}

const Input = ({ value, handleChange, error, name, placeholder, setError }: InputProps) => {
    return (
    <>
        <input type="text" value={value} onChange={e=> {
            setError('');
            handleChange(e.target.value)
        }} placeholder={placeholder}/>
        <p className="error m-0">{error ? error : null}</p>
    </>
    )
}

export default Input;