import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoading, selectUser } from '../redux/user/selector';

function RequireAuth({children}) {

  const user = useSelector(selectUser)
  const loading = useSelector(selectLoading)

  if(loading) {
    <div>loading</div>
  }

  if(!user) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default RequireAuth