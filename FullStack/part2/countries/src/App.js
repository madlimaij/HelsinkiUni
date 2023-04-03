import './App.css';
import { useState } from 'react';

import countriesService from './services/api';
import Country from './components/Country';

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (search) {
      countriesService.getCountries().then((res) => setCountries(res));
    }
  };
  const filt =
    countries && search
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(search)
        )
      : [];

  return (
    <div className="App">
      <label htmlFor="countrySearch">Find countries: </label>
      <input
        type="text"
        id="countrySearch"
        value={search}
        onChange={handleChange}
      />
<hr/>
      {filt.length < 11 ? (
        <>
          {filt.map((country, i) => (
            <Country country={country} single={filt.length === 1} key={i} />
          ))}
        </>
      ) : (
        <div>Too many matches, specify another filter</div>
      )}
    </div>
  );
}

export default App;
