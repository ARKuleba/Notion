import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import pencil from '../../img/pencil.svg';
import trash from '../../img/trash.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotes, selectNotesLoading } from '../redux/notes/selectors';
import { deleteNote } from '../redux/notes/actions';

function NoteInfo() {
  const loading = useSelector(selectNotesLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const notes = useSelector(selectNotes);

  if (loading) {
    return <div>Loading...</div>;
  }

  const noteIndex = notes.findIndex((note) => note.id === parseInt(id));
  const nameText = notes[noteIndex].nameText;
  const noteText = notes[noteIndex].noteText;

  function handleDeleteNote() {
    dispatch(deleteNote(parseInt(id)));
    navigate('/layout/notes', { replace: true });
  }

  return (
    <div>
      <div className='flex mt-10 items-center justify-between mx-auto w-3/4'>
        <button
          onClick={() => window.history.back()}
          className='text-white bg-blue-500 rounded hover:bg-blue-600 font-bold w-20 h-10'
        >
          back
        </button>
        <h1 className='prose font-semibold text-5xl md-20 mx-auto text-center w-96 overflow-hidden overflow-ellipsis'>
          {nameText}
        </h1>
        <div className='flex'>
          <Link to={`/layout/editNote/${id}`}>
            <img className='transition-transform duration-500 hover:scale-110' src={pencil} alt='' />
          </Link>
          <img
            onClick={handleDeleteNote}
            className='transition-transform duration-500 hover:scale-110 cursor-pointer'
            src={trash}
            alt='Delete'
          />
        </div>
      </div>
      <div className='mx-auto w-3/4 mt-10'>
        <textarea
          value={noteText}
          readOnly
          placeholder='Note text...'
          className='w-full h-96 text-2xl pl-4 bg-gray-300 placeholder-gray-500 pt-2 mb-4'
        />
      </div>
    </div>
  );
}

export default NoteInfo;