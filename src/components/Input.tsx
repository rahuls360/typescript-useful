import React from 'react';

interface InputProps {
  name: string;
  value: string;
  handleChange: (name: string, value: string, formKey?: string) => void;
  error: string | null;
  placeholder: string;
  setError: (name: string, value: string, formKey?: string) => void;
  formKey?: string;
  optional?: boolean;
}

const Input = ({
  value,
  handleChange,
  error,
  name,
  placeholder,
  setError,
  formKey,
  optional,
}: InputProps) => {
  return (
    <>
      <input
        type='text'
        value={value}
        onChange={(e) => {
          setError(name, '', formKey);
          handleChange(name, e.target.value, formKey);
        }}
        autoComplete='none'
        placeholder={placeholder}
        style={{ border: optional ? '1px solid orange' : 'medium color none' }}
      />
      <p className='error'>{error ? error : null}</p>
    </>
  );
};

export default Input;
