import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../redux/user/selector';
import { selectNotes, selectNotesLoading } from '../redux/notes/selectors';

function AddNote() {
  const [nameText, setNameText] = useState('');
  const [noteText, setNoteText] = useState('');

  const authorId = useSelector(selectUserId)
  const loading = useSelector(selectNotesLoading)

  const notes = useSelector(selectNotes)

  const dispatch = useDispatch()

  if (loading) {
    return <div>Loading...</div>;
  }

  const navigate = useNavigate();

  function handleSaveNote() {
    const currentDate = new Date();
    const newDate = currentDate.toString();
    const id = Math.floor(Math.random() * Date.now());
    const noteData = {
      id,
      userId: authorId,
      nameText,
      noteText,
      date: newDate,
    };

    fetch('http://localhost:5001/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    })
      .then((response) => {
        if (response.ok) {
          dispatch({ type: "NOTES/SET", payload: [...notes, noteData] });
          navigate('/layout/notes', { replace: true });
        } else {
          console.log('error');
        }
      })
    
  }

  return (
    <div>
      <div className='flex mt-10 items-center justify-start mx-auto w-3/4'>
        <Link className='w-20 h-10' to='/layout/notes'>
          <button className='text-white bg-blue-500 rounded hover:bg-blue-600 font-bold w-20 h-10 mx-auto'>
            back
          </button>
        </Link>
        <h1 className='prose font-semibold text-5xl md-20 mx-auto pr-20'>Create new note</h1>
      </div>
      <div className='flex flex-col gap-4 mx-auto w-3/4 mt-4'>
        <input
          type='text'
          value={nameText}
          onChange={(e) => setNameText(e.target.value)}
          placeholder='Name'
          className='h-12 text-2xl pl-4 bg-gray-300 placeholder-gray-500'
        />
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder='Note text...'
          className='h-80 text-2xl pl-4 bg-gray-300 placeholder-gray-500 pt-2 mb-4'
        />
      </div>
      <button
        onClick={handleSaveNote}
        className='text-white text-2xl bg-blue-500 rounded hover:bg-blue-600 font-bold w-72 h-12 mx-auto'
      >
        Save
      </button>
    </div>
  );
}

export default AddNote;