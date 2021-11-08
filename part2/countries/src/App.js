import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowCountry = ({ country }) => {
  const [weatherDetails, setWeatherDetails] = useState({});

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((response) => {
        console.log(response.data);
        const { temperature, weather_icons, wind_speed, wind_dir } =
          response.data.current;
        setWeatherDetails({
          temperature,
          weather_icons,
          wind_speed,
          wind_dir,
        });
      });
  }, [api_key, country.capital]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag"></img>
      <h2>Weather at {country.capital}</h2>
      <p>
        <b>temperature</b>: {weatherDetails.temperature} Celcius
      </p>
      <img src={weatherDetails.weather_icons} alt="weather icon"></img>
      <p>
        <b>wind:</b> {weatherDetails.wind_speed} mph direction{" "}
        {weatherDetails.wind_dir}
      </p>
    </div>
  );
};

const ListCountries = ({ query }) => {
  const [country, setCountry] = useState({});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (query !== "") {
      axios
        .get(`https://restcountries.com/v3.1/name/${query}`)
        .then((response) => {
          setCountries(response.data);
        });
    }
  });

  const handleShow = (country) => {
    setCountry(country);
  };

  return (
    <div>
      {countries.length > 10 && <p>too many matches, specify another filter</p>}
      {countries.length < 10 &&
        countries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleShow(country)}>show</button>
          </div>
        ))}
      {country.languages !== undefined && <ShowCountry country={country} />}
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <div>
        find countries <input onChange={handleChange} value={query}></input>
      </div>
      <ListCountries query={query} />
    </div>
  );
};
export default App;
