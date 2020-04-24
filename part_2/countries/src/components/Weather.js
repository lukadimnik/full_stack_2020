import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = props => {
  const [weather, setWeather] = useState({
    main: {
      temp: ""
    },
    weather: [{ description: "" }],
    wind: { speed: "", deg: "" }
  });
  const [icon, setIcon] = useState("");

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${props.capital}&appid=${api_key}`
      )
      .then(response => {
        setWeather(response.data);
        setIcon(
          "http://openweathermap.org/img/w/" +
            response.data.weather[0].icon +
            ".png"
        );
        console.log("response.data.current", response.data);
      });
  }, []);
  console.log("weather", weather);
  return (
    <div>
      <h3>Weather in {`${props.capital}`}</h3>
      <p>
        <strong>Temperature: </strong>
        {Math.round(((weather.main.temp - 273.15) * 100) / 100)} °C
      </p>
      <div>
        <img src={icon} alt="weather icon" />
      </div>
      <p>
        <strong>Description: </strong>
        {weather.weather[0].description}
      </p>

      <p>
        <strong>Wind: </strong>
        {weather.wind.speed} m/s
      </p>
    </div>
  );
};

export default Weather;
