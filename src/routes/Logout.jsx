import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const dispatch = useDispatch()

  function handleLogout() {
    dispatch({type: "USER/SET", payload: null})
    navigate('/login', { replace: true });
  }

  return (
    <div className="flex flex-col items-center h-screen mt-56">
      <h1 className="text-4xl mb-8 font-semibold">
        Do you want to log out of your account?
      </h1>
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="w-64 px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Log out
        </button>
      ) : (
        <div>
          <p>Are you sure you want to log out?</p>
          <div className="flex justify-center mt-2">
            <button
              onClick={handleLogout}
              className="w-32 px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="w-32 px-4 py-2 ml-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logout;