import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS
import styles from './maps.module.css'; // Import the CSS module

const Maps = () => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/countries')
      .then((response) => {
        setCountriesData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className={styles['map-container']}>
      <h2 className="text-2xl font-bold mb-4 text-center pb-6">Maps Screen</h2>
      <MapContainer center={[0, 0]} zoom={2} style={{ width: '100%', height: '600px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countriesData.map((country) => (
          <Marker
            key={country.countryInfo._id}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <div>
                <h2>{country.country}</h2>
                <p>Total Cases: {country.cases}</p>
                <p>Active Cases: {country.active}</p>
                <p>Recovered: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Maps;




