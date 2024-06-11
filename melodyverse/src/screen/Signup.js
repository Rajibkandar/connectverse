import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const Signup = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, setFieldError, setFieldTouched }) => {
        try {
            const res = await axios.post('/api/auth/signup', values);
            console.log(res.data); // Assuming the response contains user data
            setSubmitting(false);
            setFieldTouched('username', false); // Reset field touched state
            setFieldTouched('email', false);
            navigate('/login'); // Redirect to login after successful signup
        } catch (err) {
            setSubmitting(false);
            if (err.response && err.response.data) {
                const { message } = err.response.data;
                setFieldError('general', message); // Display general error message
            } else {
                setFieldError('general', 'Error signing up'); // Display generic error message
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Formik
                initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="bg-white p-6 rounded shadow-md w-80">
                        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                        <ErrorMessage name="general" component="div" className="text-red-500 mb-2" />
                        <div className="mb-4">
                            <label className="block mb-2">Username</label>
                            <Field type="text" name="username" className="w-full p-2 border rounded" />
                            <ErrorMessage name="username" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Email</label>
                            <Field type="email" name="email" className="w-full p-2 border rounded" />
                            <ErrorMessage name="email" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Password</label>
                            <Field type="password" name="password" className="w-full p-2 border rounded" />
                            <ErrorMessage name="password" component="div" className="text-red-500" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Confirm Password</label>
                            <Field type="password" name="confirmPassword" className="w-full p-2 border rounded" />
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" disabled={isSubmitting}>
                            Sign Up
                        </button>
                        <p className="mt-4 text-center">
                            Already have an account? <a href="/login" className="text-blue-500">Login</a>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Signup;
