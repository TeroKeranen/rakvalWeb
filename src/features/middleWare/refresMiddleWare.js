
import { store } from "../../store";
import { refreshAccessToken } from "../../utils/calculateTokenExp";
import { getTokenExpiry } from "../../utils/calculateTokenExp";


const apiMiddleware = async (requestFunction) => {
    const { user } = store.getState().userState;

    const storedUser = localStorage.getItem('user');
    const localuser = storedUser ? JSON.parse(storedUser) : null;

    // const refreshToken = getState().userState.user.refreshToken;
    const refreshToken = localuser ? localuser.refreshToken : null;

    

    if (user && user.tokenExpiry) {
      const currentTime = new Date().getTime();
      // Tarkista, onko token vanhenemassa esim. seuraavan minuutin sisällä
      if (currentTime > user.tokenExpiry - 10000) {
        // Päivitä token
        

        await store.dispatch(refreshAccessToken(refreshToken));
      }
    }
  
    return requestFunction();
  };
  
  export default apiMiddleware;