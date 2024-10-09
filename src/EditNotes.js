import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editNote } from './action/editNote';

export default function EditNotes() {
    const [filtered, setNotes] = useState(null); // Initialize as null to represent no note found
    const [edit, setEdit] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();
    // const allNotes = useSelector((state) => state.notes.notes);

    const allNotes = useSelector((state) =>state.notes.notes);
useEffect(()=>{
    for(let i=0;i<allNotes.length;i++){
        if(allNotes[i].id==id){
           setNotes(allNotes[i]);
           return ;
        }
     }
},[]) 

    const handleEditToggle = () => {
        setEdit((prevEdit) => !prevEdit);
    };

    const handleContentChange = (e) => {
        setNotes((prev) => ({ ...prev, content: e.target.value }));
    };

    const handleSave = () => {
        dispatch(editNote(filtered));
        setEdit(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-4 ">
            {filtered === null ? ( // Check if the note is found
                <p className="text-red-500">No note found with that ID. Please create some!</p>
            ) : (
                <div key={filtered.id} className="border border-gray-300 p-4 rounded shadow-md bg-white">
                    <h3 className="font-semibold text-xl mb-2">{filtered.title}</h3>
                    <button 
                        className={`bg-${edit ? 'green' : 'blue'}-500 text-white font-medium p-2 float-right rounded-lg`}
                        onClick={handleEditToggle}
                    >
                        {edit ? 'Cancel' : 'Edit'}
                    </button>

                    {edit ? (
                        <div className="mt-4">
                            <textarea 
                                value={filtered.content} 
                                onChange={handleContentChange}
                                className='h-[200px] w-full border p-2 rounded'
                            />
                            <button 
                                className="bg-blue-500 text-white font-medium mt-2 p-2 rounded"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <pre className="bg-gray-100 p-2 rounded">
                            <code>{filtered.content}</code>
                        </pre>
                    )}
                    <p className="text-gray-500 text-sm mt-2">{filtered.createdAt}</p>
                </div>
            )}
        </div>
    );
}
