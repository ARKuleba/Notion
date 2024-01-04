export const getNotes = (authorId) => async (dispatch) => {
  try {
    dispatch({ type: "NOTES/LOADING" });
    const notes = await fetch(`http://localhost:5001/notes?userId=${authorId}`).then((r) => r.json());
    dispatch({ type: "NOTES/SET", payload: notes });
  } catch (err) {
    dispatch({ type: "NOTES/ERROR", payload: err.toString() });
  }
};

export const deleteNote = (noteId) => async (dispatch) => {
  try {
    await fetch(`http://localhost:5001/notes/${noteId}`, {
      method: "DELETE",
    });

    dispatch({type: "NOTES/DELETE", payload: noteId});
  } catch (error) {
    console.error("Ошибка при удалении заметки:", error);
  }
};

export const editNote = (noteId, updatedNote) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:5001/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    });

    if (response.ok) {
      dispatch({ type: "NOTES/UPDATE", payload: updatedNote });
    } else {
      throw new Error("Ошибка при обновлении заметки");
    }
  } catch (error) {
    console.error("Ошибка при обновлении заметки:", error);
  }
};