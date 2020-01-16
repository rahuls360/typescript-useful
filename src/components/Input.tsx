import React from 'react';

interface InputProps {
  name: string;
  value: string;
  handleChange: (name: string, value: string) => void;
  error: string | null;
  placeholder: string;
  setError: (name: string, value: string) => void;
}

const Input = ({
  value,
  handleChange,
  error,
  name,
  placeholder,
  setError,
}: InputProps) => {
  return (
    <>
      <input
        type='text'
        value={value}
        onChange={(e) => {
          setError(name, '');
          handleChange(name, e.target.value);
        }}
        autoComplete='none'
        placeholder={placeholder}
      />
      <p className='error'>{error ? error : null}</p>
    </>
  );
};

export default Input;
