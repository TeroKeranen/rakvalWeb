
import {jwtDecode} from 'jwt-decode';
// import { refreshAccessToken } from '../features/auth/authSlice';

import { customFetch } from './index';
import { loginUser, logoutUser, updateAccessToken } from '../features/auth/authSlice';

export function getTokenExpiry(token) {
    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp) {
            return decodedToken.exp * 1000;
        }
        return null;
    } catch (error) {
        console.error('Virhe dekoodattaessa tokenia:', error);
        return null;
    }
}

export async function handleTokenExpiry(dispatch, actionCreator, getState) {
    const token = getState().userState.user.token;
    const tokenExpiry = getState().userState.user.tokenExpiry;

    // Tarkista onko token vanhentunut
    if (Date.now() > tokenExpiry) {
        const refreshAction = await dispatch(refreshAccessToken());
        if (refreshAccessToken.fulfilled.match(refreshAction)) {
            // Token on uusittu, suorita alkuperäinen toiminto uudelleen
            return dispatch(actionCreator()).unwrap();
        } else {
            // Tokenin uusiminen epäonnistui
            throw new Error('Unable to refresh token - 5');
        }
    }

    // Jos token ei ole vanhentunut, palauta null
    return null;
}


export const refreshAccessToken = (refreshToken) => async (dispatch) => {
    console.log("ajetaan refreshToken")
    try {
      const response = await customFetch.post('/refresh', { token: refreshToken });
      const newAccessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;
      console.log("refresAccestoken", newAccessToken);
      const newTokenExpiry = getTokenExpiry(newAccessToken); // Olettaen, että sinulla on funktio, joka laskee tokenin vanhentumisajan
      console.log("SUORITETAAN LOGINuSER");

      dispatch(updateAccessToken({
        accessToken: newAccessToken,
        refreshToken:newRefreshToken,
        tokenExpiry: newTokenExpiry
      }));
  
    } catch (error) {
      dispatch(logoutUser());
      // Siirrä käyttäjä kirjautumissivulle tai näytä virheilmoitus
    }
  };