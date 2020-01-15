import React, { useState } from 'react';
import Input from './Input';

interface FormDetails {
	name: string;
	mobile: string;
	email: string;
	occupation?: string;
}

const Form = () => {
	const [details, setDetails] = useState({ name: '', mobile: '', email: '', occupation: '' });
	const [error, setError] = useState({ name: '', mobile: '', email: '', occupation: '' });

	const handleChange = (name: string, value: string) => {
		setDetails({
			...details,
			[name]: value
		})
	}

	const handleError = (name: string, value: string) => {
		setError({
			...error,
			[name]: value
		})
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const request = generateAPIRequest({...details});
		const isValid = validateData(request);
		
		if(isValid){
			console.log(request, "details");
		}
	};

	const validateData = (details: FormDetails) => {
		const newErrors = {...error};
		let hasErrors = false; 

		if(details.name.trim() === ""){
			hasErrors = true;
			newErrors.name = "Enter a valid name";
		}
		if(details.mobile.trim() === ""){
			hasErrors = true;
			newErrors.mobile = "Enter a valid mobile number";
		}
		if(details.email.trim() === ""){
			hasErrors = true;
			newErrors.email = "Enter a valid email";
		}
		if(details.occupation && details.occupation.trim() === ""){
			hasErrors = true;
			newErrors.occupation = "Enter a valid occupation";
		}
		setError(newErrors);
		return !hasErrors;
	}

	const generateAPIRequest = (details: FormDetails) => {
		if(details.occupation === ""){
			delete details.occupation;
		}
		return details;
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input name="name" value={details.name} handleChange={handleChange} error={error.name} placeholder="Full Name" setError={handleError}/>
			<Input name="mobile" value={details.mobile} handleChange={handleChange} error={error.mobile} placeholder="Mobile Number" setError={handleError}/>
			<Input name="email" value={details.email} handleChange={handleChange} error={error.email} placeholder="Email" setError={handleError}/>
			<Input name="occupation" value={details.occupation} handleChange={handleChange} error={error.occupation} placeholder="Occupation" setError={handleError}/>
			<button>Submit</button>
		</form>
	);
}

export default Form;