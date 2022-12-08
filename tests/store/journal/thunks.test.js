import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

describe('Pruebas en journal thunks', () => {
  
  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(()=> jest.clearAllMocks());

  test('startNewNote debe crear una nueva nota en blanco', async () => {
    const uid = 'TEST-UID';
    getState.mockReturnValue({auth:{uid}});//return value es sync, resolved value es async
    await startNewNote()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
      title:'', 
      body:'', 
      date: expect.any(Number), 
      id: expect.any(String)
    }));
    expect(dispatch).toHaveBeenCalledWith(setActiveNote({
      title:'', 
      body:'', 
      date: expect.any(Number), 
      id: expect.any(String)
    }));
    //Borrar de firebase
    
  });
});