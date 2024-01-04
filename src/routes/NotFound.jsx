import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../redux/user/selector';

function NotFound() {

  const user = useSelector(selectUser)

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-4">Error 404</h1>
      <p className="text-4xl mb-2">Page not found</p>
      <p className="text-2xl">
        Go to page{' '}
        {
          (user) ? 
            <Link className="text-gray-600 hover:underline" to="/layout/about">About</Link> 
          : <Link className="text-gray-600 hover:underline" to="/login">Login</Link> 
        }
        
      </p>
    </div>
  );
}

export default NotFound;