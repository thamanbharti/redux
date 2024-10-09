export const addNotes=(note)=>{
      return {
        type:'notes/create-notes',
        payload:note
      }
}