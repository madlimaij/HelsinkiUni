import axios from "axios";
const endPointCountries = "https://restcountries.com/v3.1/all"
const endPointWeather = "https://api.openweathermap.org"

const api_key = process.env.REACT_APP_API_KEY


const getCountries = () => {
        const request = axios.get(endPointCountries);
        return request.then((response) => response.data);
}

const getWeather = (capital) => {
    const request = axios.get(`${endPointWeather}/data/2.5/weather?q=${capital}&APPID=${api_key}&units=metric`);
    return request.then((response) => response.data);
}
  
export default {getCountries, getWeather}