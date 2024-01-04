import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import RequireAuth from '../components/RequireAuth';
import { useSelector } from 'react-redux';
import { selectLoading, selectUser } from '../redux/user/selector';

function Layout() {
  const user = useSelector(selectUser)
  const loading = useSelector(selectLoading)

  if(loading) {
    <div>Loading...</div>
  }

  return (
    <RequireAuth>
      <div className="mx-auto w-3/4 text-center">
        <header>
          <p className='prose text-lg'>Hello, {user.email}</p>
          <div className='text-gray-500 font-medium flex gap-4 w-1/2 justify-end text-xl'>
            <NavLink className={({ isActive }) => (isActive ? "text-black hover:text-gray-700" : "hover:text-gray-400")} to='/layout/about'>About</NavLink>
            <NavLink className={({ isActive }) => (isActive ? "text-black hover:text-gray-700" : "hover:text-gray-400")} to='/layout/notes'>Notes</NavLink>
            <NavLink className={({ isActive }) => (isActive ? "text-black hover:text-gray-700" : "hover:text-gray-400")} to='/layout/logout'>Log out</NavLink>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </RequireAuth>
  );
}

export default Layout;