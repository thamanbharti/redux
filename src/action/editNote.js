// import { type } from "express/lib/response";

export const editNote=(notes)=>{
     return {
        type:'notes/edit-notes',
        payload:notes
     }
}