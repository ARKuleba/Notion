const DEFAULT_STATE = {
    data: [],
    loading: true,
    error: null
}

export const notesReducer = (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case "NOTES/LOADING":
            return {
                loading: true,
                error: null,
                data: [],
            }
        case "NOTES/SET":
            return {
                loading: false,
                error: null,
                data: action.payload,
            }
        case "NOTES/UPDATE":
            const updatedNote = action.payload;
            const updatedData = state.data.map((note) => {
              if (note.id === updatedNote.id) {
                return updatedNote;
              }
              return note;
            });
          
            return {
              ...state,
              data: updatedData,
            };
        case "NOTES/DELETE":
            const deletedNoteId = action.payload;
            const newData = state.data.filter((note) => note.id !== deletedNoteId);
                            
            return {
              ...state,
              data: newData,
            };
        case "NOTES/ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
                data: action.payload,
            }
        default:
            return state
    } 
}