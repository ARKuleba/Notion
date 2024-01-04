import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Note from '../components/Note';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../redux/user/selector';
import { selectNotes, selectNotesError } from '../redux/notes/selectors';
import { getNotes } from '../redux/notes/actions';

function Notes() {  
  const authorId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes(authorId));
  }, [dispatch, authorId]);

  const notes = useSelector(selectNotes);
  const error = useSelector(selectNotesError);

  const newNotes = notes.sort((a, b) => new Date(b.date) - new Date(a.date))

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }
  
  return (
    <div className='flex flex-col'>
      <h1 className='prose font-semibold text-6xl mt-10 text-center'>Notes</h1>
      <Link className='w-64 h-10 mx-auto mt-10 mb-2' to='/layout/addNote'>
        <button className='text-white bg-blue-500 rounded hover:bg-blue-600 font-bold w-64 h-10 mx-auto mb-2'>
          Add new note
        </button>
      </Link>
      <div>
        {newNotes.map((note) => (
          <Note key={note.id} id={note.id} name={note.nameText} date={note.date} />
        ))}
      </div>
    </div>
  );
}

export default Notes;