import { React, useState, useEffect } from 'react';
import apiService from '../services/api';

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState();
  const capital = country.capital;

  useEffect(() => {
      apiService
        .getWeather(capital)
        .then((res) => setWeather(res))
        .catch((error) => console.log(error.message));
  }, [capital]);

  return (
    <>
      {weather ? (
        <div>
          <h2>{country.name.common}</h2>
          <div>capital: {country.capital}</div>
          <div>area: {country.area}</div>
          <br />
          <b>Languages:</b>
          {Object.values(country.languages).map((lang) => (
            <ul key={lang}>
              <li>{lang}</li>
            </ul>
          ))}
          <img
            src={country.flags.svg}
            alt="flag"
            style={{ width: 300, lenght: 'auto' }}
          ></img>
          <h2>
            Weather in <span>{country.capital}</span>
          </h2>
           <div>
            temperature <span>{weather.main.temp}</span>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather-icon"
          ></img>
          <div>
            wind <span>{weather.wind.speed}</span>
          </div> 
        </div>
      ): null}
    </>
  );
};

export default CountryDetails;
