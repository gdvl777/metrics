import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateCountries, updateCountryData } from '../redux/actions/countriesActions';
import '../styles/Countries.css';

function Countries() {
  const { continent } = useParams();
  const [countries, setCountries] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/region/${continent}`);
        if (response.data) {
          setCountries(response.data);
          dispatch(updateCountries(response.data)); 
        }
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    }

    fetchCountries();
  }, [continent, dispatch]);

  if (!Array.isArray(countries)) {
    return (
      <div>
        <h1>{`Error: ${continent} It is not a valid continent.`}</h1>
      </div>
    );
  }

  const handleCountryClick = async (country) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${country.cca2}`);
      if (response.data) {
        dispatch(updateCountryData(response.data)); 
      } else {
        console.log('No se devolvieron datos válidos del país en la API');
      }
    } catch (error) {
      console.log('Error al obtener los datos del país:', error);
    }
  };

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  return (
    <div>
      <h1>{capitalizeFirstLetter(continent)}</h1>
      <div className="countries-grid">
        {countries.map((country) => (
          <Link
            to={{
              pathname: `/country/${country.name.common}`,
              state: { countryData: country },
            }}
            key={country.cca2}
          >
            <div
              className="country-item"
              onClick={() => handleCountryClick(country)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleCountryClick(country);
              }}
              tabIndex="0"
              role="button"
            >
              <img src={country.flags.png} alt={country.name.common} />
              <p>{country.name.common}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Countries;
