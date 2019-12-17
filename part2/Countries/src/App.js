import React, { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [countries, setCountries] = useState([]),
    [filterCountry, setFilterCountry] = useState(""),
    flagStyling = {
      height: "100px",
      width: "200px",
      border: "2px solid black"
    }

    

  const hook = () => {
    axios
      .get("https://restcountries.eu/rest/v2")
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const showCountry = (e) => {
    setFilterCountry(e.target.value)
  }

  const list = countries
    .filter(country => filterCountry === "" || country.name.toLowerCase().includes(filterCountry) || country.name.includes(filterCountry))
    .map(country => <li key={country.name}>{country.name}<button value={country.name} onClick={showCountry} type="button">show</button></li>)

  const searchCountry = (e) => {
    setFilterCountry(e.target.value)
  }

  const detailedCountry = (e) => {
    const list = countries
      .filter(country => filterCountry === "" ||
        country.name.toLowerCase().includes(filterCountry) ||
        country.name.includes(filterCountry))
          .map((country, i) => <div key={i}>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <div>
              <ul>
                <h3>Languages</h3>
                {country.languages.map(language => <li key={language.name}>{language.name}</li> )}
              </ul>
            </div>
            <img src={country.flag} alt="" style={flagStyling}/>

          </div>
          )
          return list
  }

  return (
    <div>
      Search: <input value={filterCountry} onChange={searchCountry}></input>
      <br />
      {list.length > 10 ? "Narrow down your search" : list.length === 1 ? detailedCountry() : <ul>{list}</ul>}
    </div>
  )
}

export default App