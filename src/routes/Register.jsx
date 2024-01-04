import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';

const User = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8)
    .refine((value) => {
      return /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
    }, { message: 'Password must contain at least 8 letters [A-Z],[a-z],[1-9]' }),
});

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [repeatError, setRepeatError] = useState('');

  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const user = User.parse({
        email,
        password,
      });

      setErrors({ email: '', password: '' });

      const response = await fetch(`http://localhost:5001/users?email=${email}`);
      const users = await response.json();
      const existingUser = users[0];

      if (existingUser) {
        setErrors({ email: ['This email is already registered'] });
      } else {
        setErrors({ email: '' });
      }
      if (password !== repeatPassword) {
        setRepeatError('Passwords do not match');
      } else {
        setRepeatError('');
      }

      if(!existingUser && password === repeatPassword) {
        const postResponse = await fetch('http://localhost:5001/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });

        if (postResponse.ok) {
          navigate('/login', { replace: true });
        } else {
          console.log('error');
        }
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.formErrors.fieldErrors);
      } else {
        setErrors({ email: '', password: '' });
      }

      if (password !== repeatPassword) {
        setRepeatError('Passwords do not match');
      } else {
        setRepeatError('');
      }
    }
  }

  return (
    <div className='flex flex-col gap-4 items-center justify-center h-screen'>
      <h1 className='text-5xl'>Sign up</h1>
      <input
        type='text'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-64 px-4 py-2 rounded border'
      />
      {errors.email && <div className='w-64 text-center text-red-400'>{errors.email[0]}</div>}
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-64 px-4 py-2 rounded border'
      />
      {errors.password && <div className='w-64 text-center text-red-400'>{errors.password[0]}</div>}
      <input
        type='password'
        placeholder='Repeat password'
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        className='w-64 px-4 py-2 rounded border'
      />
      {repeatError && <div className='text-red-400'>{repeatError}</div>}
      <button className='w-64 px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600' onClick={handleRegister}>Sign up</button>
      <Link to='/login' className='text-gray-800 hover:text-gray-500 underline'>Log out</Link>
    </div>
  );
}

export default Register;