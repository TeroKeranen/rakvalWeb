
import axios from "axios";

const productionUrl = "https://rakval-1a943ba6019b.herokuapp.com"

export const customFetch = axios.create({
    baseURL: productionUrl
})