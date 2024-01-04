import React from 'react';
import { Link } from 'react-router-dom';

function FirstPage() {
  return (
    <div className='mt-40 text-center'>
      <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4'>Welcome to the notes</h1>
      <p className='text-lg sm:text-xl md:text-2xl'>Go to page{' '} <Link to='/layout/about' className="text-gray-600 hover:underline">About</Link></p>
    </div>
  );
}

export default FirstPage;