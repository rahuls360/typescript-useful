import React, { useState } from 'react';
import Input from './Input';

const Form = () => {
	const [fullName, setFullName] = useState('');
	const [error, setError] = useState('');
	return (
		<form>
			<Input name="full-name" value={fullName} handleChange={setFullName} error={error} placeholder="Full Name" setError={setError}/>
		</form>
	);
}

export default Form;