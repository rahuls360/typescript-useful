import React, { useState } from 'react';
import Input from './Input';

interface FormDetails {
  name: string;
  mobile: string;
  email: string;
  occupation?: string;
  educationData?: {
    school?: string;
    branch?: string;
  };
}

const Form = () => {
  const [details, setDetails] = useState({
    name: '',
    mobile: '',
    email: '',
    occupation: '',
    educationData: {
      school: '',
      branch: '',
    },
  });
  const [error, setError] = useState({
    name: '',
    mobile: '',
    email: '',
    occupation: '',
    educationData: {
      school: '',
      branch: '',
    },
  });

  const [apiRequest, setApiRequest] = useState(null);
  const [hasEducationalData, setHasEducationdata] = useState(false);

  const handleChange = (name: string, value: string, formKey?: string) => {
    if (formKey === 'educationData') {
      setDetails({
        ...details,
        educationData: {
          ...details.educationData,
          [name]: value,
        },
      });
    } else {
      setDetails({
        ...details,
        [name]: value,
      });
    }
  };

  const handleError = (name: string, value: string, formKey?: string) => {
    if (formKey === 'educationData') {
      setError({
        ...error,
        educationData: {
          ...error.educationData,
          [name]: value,
        },
      });
    } else {
      setError({
        ...error,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const request = generateAPIRequest({ ...details });
    const isValid = validateData(request);

    let newApiRequest: any = null;
    if (isValid) {
      newApiRequest = request;
    }
    setApiRequest(newApiRequest);
  };

  const validateData = (details: FormDetails) => {
    const newErrors = { ...error };
    let hasErrors = false;

    if (details.name.trim() === '') {
      hasErrors = true;
      newErrors.name = 'Enter a valid name';
    }
    if (details.mobile.trim() === '') {
      hasErrors = true;
      newErrors.mobile = 'Enter a valid mobile number';
    }
    if (details.email.trim() === '') {
      hasErrors = true;
      newErrors.email = 'Enter a valid email';
    }
    if (details.occupation && details.occupation.trim() === '') {
      hasErrors = true;
      newErrors.occupation = 'Enter a valid occupation';
    }
    if (hasEducationalData) {
      if (details.educationData?.school?.trim() === '') {
        hasErrors = true;
        newErrors.educationData.school = 'Enter a valid school name';
      }
      if (details.educationData?.branch?.trim() === '') {
        hasErrors = true;
        newErrors.educationData.branch = 'Enter a valid branch name';
      }
    }
    setError(newErrors);
    return !hasErrors;
  };

  const generateAPIRequest = (details: FormDetails) => {
    if (details.occupation === '') {
      delete details.occupation;
    }
    if (!hasEducationalData) {
      delete details.educationData;
    }
    return details;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          name='name'
          value={details.name}
          handleChange={handleChange}
          error={error.name}
          placeholder='Full Name'
          setError={handleError}
        />
        <Input
          name='mobile'
          value={details.mobile}
          handleChange={handleChange}
          error={error.mobile}
          placeholder='Mobile Number'
          setError={handleError}
        />
        <Input
          name='email'
          value={details.email}
          handleChange={handleChange}
          error={error.email}
          placeholder='Email'
          setError={handleError}
        />
        <Input
          name='occupation'
          value={details.occupation}
          handleChange={handleChange}
          error={error.occupation}
          placeholder='Occupation'
          setError={handleError}
          optional
        />
        <div>
          <input
            type='checkbox'
            checked={hasEducationalData}
            onChange={(e) => setHasEducationdata(!hasEducationalData)}
          />
          <span> Enable Education Data</span>
        </div>
        {hasEducationalData && (
          <>
            <Input
              name='school'
              value={details.educationData.school}
              handleChange={handleChange}
              formKey='educationData'
              error={error.educationData.school}
              placeholder='School Name'
              setError={handleError}
              optional
            />
            <Input
              name='branch'
              value={details.educationData.branch}
              handleChange={handleChange}
              formKey='educationData'
              error={error.educationData.branch}
              placeholder='Branch'
              setError={handleError}
              optional
            />
          </>
        )}
        <button>Submit</button>
      </form>
      <pre>
        <code>{JSON.stringify(apiRequest, null, 2)}</code>
      </pre>
    </>
  );
};

export default Form;
