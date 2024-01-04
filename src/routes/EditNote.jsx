import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotes, selectNotesLoading } from '../redux/notes/selectors';
import { editNote } from '../redux/notes/actions';

function EditNote() {

  const notes = useSelector(selectNotes)
  const loading = useSelector(selectNotesLoading)

  if(loading) {
    return <div>Loading...</div>
  }

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userNotes = notes

  const noteIndex = userNotes.findIndex((note) => note.id === parseInt(id));

  const [nameText, setNameText] = useState(
    noteIndex !== -1 ? userNotes[noteIndex].nameText : ''
  );
  const [noteText, setNoteText] = useState(
    noteIndex !== -1 ? userNotes[noteIndex].noteText : ''
  );

  const handleSave = () => {
    const updatedNote = {
      id: parseInt(id),
      userId: userNotes[noteIndex].userId,
      nameText: nameText,
      noteText: noteText,
      date: userNotes[noteIndex].date
    };
  
    dispatch(editNote(parseInt(id), updatedNote));
    navigate('/layout/notes', { replace: true });
  };

  return (
    <div>
      <div className='flex mt-10 items-center justify-start mx-auto w-3/4'>
        <button onClick={()=> window.history.back()} className='text-white bg-blue-500 rounded hover:bg-blue-600 font-bold w-20 h-10'>
          back
        </button>
        <h1 className='prose font-semibold text-5xl md-20 mx-auto pr-20'>
          Edit note
        </h1>
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
        className='text-white text-2xl bg-blue-500 rounded hover:bg-blue-600 font-bold w-72 h-12 mx-auto'
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}

export default EditNote;