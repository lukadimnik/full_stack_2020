import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Searchfilter from "./components/Searchfilter";
import Weather from "./components/Weather";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  // const [expand, setExpand] = useState(false);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(filter)
  );

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  // const showMore = i => {
  //   console.log(i);
  //   let singleObject = filteredCountries[i];

  //   let countryLanguages = singleObject.languages.map((language, i) => (
  //     <li key={i}>{language.name}</li>
  //   ));

  //   return (
  //     <div>
  //       <h1>{singleObject.name}</h1>
  //       <p>Capital: {singleObject.capital}</p>
  //       <p>Population: {singleObject.population}</p>
  //       <h3>Languages</h3>
  //       <ul>{countryLanguages}</ul>
  //       <img
  //         className="country-flag"
  //         alt="country flag"
  //         src={singleObject.flag}
  //       />
  //       <Weather capital={singleObject.capital} />
  //     </div>
  //   );
  // };

  const rows = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter.</p>;
    } else if (filteredCountries.length === 1) {
      let singleObject = filteredCountries[0];

      let countryLanguages = singleObject.languages.map((language, i) => (
        <li key={i}>{language.name}</li>
      ));

      return (
        <div>
          <h1>{singleObject.name}</h1>
          <p>Capital: {singleObject.capital}</p>
          <p>Population: {singleObject.population}</p>
          <h3>Languages</h3>
          <ul>{countryLanguages}</ul>
          <img
            className="country-flag"
            alt="country flag"
            src={singleObject.flag}
          />
          <Weather capital={singleObject.capital} />
        </div>
      );
    } else {
      return filteredCountries.map((country, i) => (
        <div key={i}>
          <p>{country.name}</p>
          <button onClick={() => setFilter(country.name.toLowerCase())}>
            show more
          </button>
          {/* {expand && showMore(i)} */}
        </div>
      ));
    }
  };

  return (
    <div className="App">
      <Searchfilter
        filterValue={filter}
        handleFilterChange={handleFilterChange}
      />
      {rows()}
    </div>
  );
}

export default App;
