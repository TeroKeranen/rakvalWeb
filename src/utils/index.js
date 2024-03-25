
import axios from "axios";
import { handleTokenExpiry } from "./calculateTokenExp";
import { store } from "../store";

const productionUrl = "https://rakval-1a943ba6019b.herokuapp.com"
// const productionUrl = "https://4b78-91-152-126-92.ngrok-free.app"

export const customFetch = axios.create({
    baseURL: productionUrl
})

