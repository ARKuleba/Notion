import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/user/actions';

function Login() {
  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch()

  function handleLogin() {
    dispatch(getUser({logEmail, logPassword})).then(
      () => navigate('/layout/about', { replace: true }),
      (err) => setError(err?.toString())
    )
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-5xl">Log in</h1>
      <input
        className="w-64 px-4 py-2 rounded border"
        type="text"
        value={logEmail}
        onChange={(e) => setLogEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="w-64 px-4 py-2 rounded border"
        type="password"
        value={logPassword}
        onChange={(e) => setLogPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <div className="text-red-400">{error}</div>}
      <button
        onClick={handleLogin}
        className="w-64 px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Log in
      </button>
      <Link to='/' className='text-gray-800 hover:text-gray-500 underline'>Sign up</Link>
    </div>
  );
}

export default Login;