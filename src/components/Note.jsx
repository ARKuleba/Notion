import React from 'react';
import pencil from '../../img/pencil.svg';
import trash from '../../img/trash.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../redux/notes/actions';

function Note({ name, date, id }) {
  const currentDate = new Date(date);
  const day = currentDate.toLocaleString('en-US', { day: '2-digit' });
  const month = (currentDate.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 });
  const year = currentDate.getFullYear();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function goToNoteInfo() {
    navigate(`/layout/noteInfo/${id}`);
  }

  function handleEditNote(event) {
    event.stopPropagation();
    navigate(`/layout/editNote/${id}`);
  }

  function handleDeleteNote(event) {
    event.stopPropagation();

    dispatch(deleteNote(id));
    navigate('/layout/notes', { replace: true });
  }

  return (
    <div onClick={goToNoteInfo} className='flex justify-between items-center bg-gray-300 mt-2 w-3/4 mx-auto rounded cursor-pointer hover:bg-gray-200 transition-transform duration-100 hover:scale-105'>
      <div className='flex gap-4 pl-4 w-3/5 text-lg'>
        <p className={`flex justify-start ${name.length > 30 ? 'w-3/5' : ''} overflow-hidden overflow-ellipsis`}>{name}</p>
        <p className='text-gray-500 text-lg'>{day}.{month}.{year}</p>
      </div>
      <div className='note-actions flex'>
        <img onClick={handleEditNote} className='transition-transform duration-500 hover:scale-110' src={pencil} alt='Edit' />
        <img onClick={handleDeleteNote} className='transition-transform duration-500 hover:scale-110' src={trash} alt='Delete' />
      </div>
    </div>
  );
}

export default Note;