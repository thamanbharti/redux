const initialState = {
  notes: JSON.parse(localStorage.getItem('notes')) || [],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'notes/create-notes': {
          const newNote = action.payload;
          const updatedNotes = [...state.notes, newNote];
          
          // Save updated notes to localStorage
          localStorage.setItem('notes', JSON.stringify(updatedNotes));

          return {
              ...state,
              notes: updatedNotes,
          };
      }
      case 'notes/edit-notes': {
          const updatedNote = action.payload; // Get the updated note from the action
          const updatedNotes = state.notes.map(note => 
              note.id === updatedNote.id ? updatedNote : note // Update the specific note
          );

          // Save updated notes to localStorage
          localStorage.setItem('notes', JSON.stringify(updatedNotes));

          return {
              ...state,
              notes: updatedNotes,
          };
      }
      default:
          return state;
  }
};

export default notesReducer;
