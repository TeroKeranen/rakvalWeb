
import { store } from "../../store";
import { refreshAccessToken } from "../../utils/calculateTokenExp";
import { getTokenExpiry } from "../../utils/calculateTokenExp";


const apiMiddleware = async (requestFunction) => {
    const { user } = store.getState().userState;
    
    if (user && user.tokenExpiry) {
      const currentTime = new Date().getTime();
      // Tarkista, onko token vanhenemassa esim. seuraavan minuutin sisällä
      if (currentTime > user.tokenExpiry - 10000) {
        // Päivitä token
        console.log("suoritetaan refreshaccesstoken")
        console.log("refreshTOken", user.refreshToken)
        await store.dispatch(refreshAccessToken(user.refreshToken));
      }
    }
  
    return requestFunction();
  };
  
  export default apiMiddleware;