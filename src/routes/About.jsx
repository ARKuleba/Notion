import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectLoading, selectUser } from '../redux/user/selector';

function About() {

  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading)

  if(loading) {
    <div>Loading...</div>
  }

  const currentDate = new Date(user.date);
  const day = currentDate.toLocaleString('en-US', { day: '2-digit' });
  const month = (currentDate.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 });
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 });
  const minutes = currentDate.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 });
  const seconds = currentDate.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2 });

  return (
    <div className='flex flex-col mt-20'>
      <h1 className='prose font-semibold text-6xl md-20 text-center'>About me</h1>
      <div className='flex mx-auto gap-1 text-lg mt-40'>
        <p>Email: </p>
        <p className='text-gray-500'>{user.email}</p>
      </div>
      <div className='flex mx-auto gap-1 text-lg'>
        <p>Date sign up: </p>
        <p className='text-gray-500'>{day}.{month}.{year} {hours}:{minutes}:{seconds}</p>
      </div>
      <Link className='w-64 h-10 mx-auto mt-40' to='/layout/notes'>
        <button className='text-white bg-blue-500 rounded hover:bg-blue-600 font-bold w-64 h-10 mx-auto'>
          Go to Notes
        </button>
      </Link>
    </div>
  );
}

export default About;