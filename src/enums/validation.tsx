import {object, string} from 'yup';
export const emailRegEx = /^[a-zA-Z0-9._-]+@[gmail]+\.[a-zA-Z]{2,4}$/;

export const signInValidation = object({
  email: string()
    .matches(emailRegEx, 'Email address is not valid!')
    .required('Email address is required!'),
  password: string()
    .min(6, ({min}) => `Password must be at least ${min} characters.`)
    .required('Password is required!'),
});
