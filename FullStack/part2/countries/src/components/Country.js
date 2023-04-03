import React from 'react';
import { useState } from 'react';
import CountryDetails from './CountryDetails';

const Country = ({ country, single }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);
  };
  return (
    <>
      {!single && (
        <div>
          {country.name.common} <button onClick={handleClick}>Details</button>
        </div>
      )}
      {(showDetails || single) && <CountryDetails country={country} />}
    </>
  );
};

export default Country;
