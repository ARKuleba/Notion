export const getUser = ({logEmail, logPassword}) => async (dispatch) => {
    const query = new URLSearchParams({
        email: logEmail,
        password: logPassword,
      }).toString();
  
      const users = await fetch(`http://localhost:5001/users?${query}`)
      .then((r) => r.json())
      const user = users[0]
      if (user) {
        const currentDate = new Date();
        const stringDate = currentDate.toString();
        const userWithDate = {
            ...user,
            date: stringDate,
        };
        dispatch({type: "USER/SET", payload: userWithDate})
      } else {
        throw new Error('Invalid email or password')
      }
}