import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import CreateNotes from ''; // Import the CreateNotes component

function App() {
  const allNotes = useSelector((state) => state.notes.notes);
  // console.log(allNotes)
  return (
    <div className="flex justify-center items-center mt-6 ">
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-4 mb-4">
          <input
            className="border border-gray-300 rounded-lg p-2 w-[400px]"
            placeholder="Search"
          />
          <Link to={'/createNotes'}>
            <button className="bg-blue-500 text-white p-2 rounded-lg">Create My Notes</button>
          </Link>
          
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
          <div className="space-y-4">
            {allNotes.length === 0 ? (
              <p>No notes available. Please create some!</p>
            ) : (
              allNotes.map((note) => (
                <div key={note.id} className="border border-gray-300 p-4 rounded">

                  <h3 className="font-semibold">{note.title}

                  <Link to={`/editNotes/${note.id}`}>
            <button className="bg-blue-500 text-white font-medium p-2 float-right rounded-lg">Edit</button>
          </Link>
                  </h3>
                  
                  <pre className="bg-gray-100 p-2 rounded">
                    <code>{note.content}</code>
                  </pre>
                  <p className="text-gray-500 text-sm">{note.createdAt}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
