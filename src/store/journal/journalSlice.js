import { createSlice } from '@reduxjs/toolkit';
//reducers no deben de disparar funciones externas
export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    savedMessage: '',
    notes: [],
    active: null,
    // active: {
    //   id: 'ABC123',
    //   title: '',
    //   body: '',
    //   date: 1234567,
    //   imageUrls: [],
    // }
  },
  reducers: {//tiene que ser todo sincrónico
    savingNewNote: (state) =>{
      state.isSaving= true;
    },
    addNewEmptyNote: (state, action ) => {
      state.notes.push(action.payload);//el payload lleva la nota nueva
      state.isSaving = false;
    },
    setActiveNote: (state, action ) => {
      state.active = action.payload;
      state.savedMessage= '';
    },
    setNotes: (state, action ) => {
      state.notes= action.payload;
    },
    setSaving: (state) => {
      state.isSaving= true;
      state.savedMessage= '';
    },
    updateNote: (state, action ) => {
      state.isSaving = false;
      state.notes = state.notes.map(note =>{
        if(note.id === action.payload.id){
          return action.payload;
        }
        return note;
      });
      state.savedMessage = 'Nota actualizada correctamente';
    },
    setPhotosToActiveNote: (state, action) =>{
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving= false;
    },
    clearNoteLogout: (state) =>{
      state.isSaving = false;
      state.savedMessage= '';
      state.notes = [];
      state.active= null;
    },
    deleteNoteById: (state, action ) => {
      state.active= null;
      state.notes= state.notes.filter(note=> note.id !== action.payload);
    },
  }
});

export const { 
  savingNewNote,
  addNewEmptyNote, 
  setActiveNote, 
  setNotes, 
  setSaving, 
  updateNote, 
  setPhotosToActiveNote,
  clearNoteLogout,
  deleteNoteById 
} = journalSlice.actions;