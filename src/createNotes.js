import React, { useState } from 'react';
import { addNotes } from './action/addNote';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateNotes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch=useDispatch();
  
  let sz=useSelector((state)=>state.notes.notes).length;
  // JSON.parse(localStorage.getItem('notes')).length;
  const generateIdSave=()=>{
    const newNote = {
        title,   // Note title
        content, // Note content
        id:sz+1,      // Unique ID
        createdAt: new Date().toISOString(), // Optional timestamp for creation time
      };

        dispatch(addNotes(newNote));
        setContent('');
        setTitle('');
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Note</h2>
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4 w-full h-48"
        />
        <button onClick={generateIdSave} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">
          Create
        </button>
      </div>
    </div>
  );
}
