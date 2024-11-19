import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // handle submit event for the form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // validate email and passwords
        if (!email || !password || !confirmPassword) {
            toast.error("Please fill in all fields.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email address.");
        } else if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
        } else {
            // post data to the /register api
            fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                //.then((response) => response.json())
                .then((data) => {
                    // handle success or error from the server
                    console.log(data);
                    if (data.ok)
                        toast.success("Registration successful.");
                    else
                        toast.error("Error registering.");

                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    toast.error(error.message);
                });
        }
    };

    return (
        <div className='flex min-h-screen justify-center'>
            <div className="mt-10">
                <h1 className='text-gray-900 mb-3 text-center text-4xl font-bold'>Register</h1>
                <p className='text-gray-600 mb-8 text-center text-lg'>Creating account is extremely easy!</p>
                <form className='bg-gray-200 p-10 rounded-lg' onSubmit={handleSubmit}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='my-3 px-3 py-2 outline-none font-semibold w-72 rounded-md' type="email" placeholder='Email' /> <br />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='my-3 px-3 py-2 outline-none font-semibold w-72 rounded-md' type="password" placeholder='Enter your password' /> <br />
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='my-3 px-3 py-2 outline-none font-semibold w-72 rounded-md' type="password" placeholder='Confirm your password' /> <br />
                    <div className="mt-2 text-center"><button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded-md text-lg font-semibold hover:bg-blue-700'>Register</button></div>
                    <ToastContainer />
                    <span className='text-gray-600 mt-2'>Don't have an account? <Link to="/login" className='text-blue-600 font-semibold'>Sign Up</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login