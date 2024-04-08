import {object, ref, string} from 'yup';
export const emailRegEx = /^[a-zA-Z0-9._-]+@[gmail]+\.[a-zA-Z]{2,4}$/;

export const signInValidation = object({
  email: string()
    .matches(emailRegEx, 'Email address is not valid!')
    .required('Email address is required!'),
  password: string()
    .min(6, ({min}) => `Password must be at least ${min} characters.`)
    .required('Password is required!'),
});

export const signUpValidation = object({
  fullName: string().required('Full name is required'),
  email: string()
    .matches(emailRegEx, 'Email address is not valid!')
    .required('Email address is required!'),
  password: string()
    .min(6, ({min}) => `Password must be at least ${min} characters.`)
    .required('Password is required!'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords does not match')
    .required('Confirm Password is required'),
});
