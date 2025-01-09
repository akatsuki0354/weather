import React, { useState, useEffect } from 'react';
import CloudIcon from '@mui/icons-material/Cloud';
import '../src/App.css'

function App() {
  const [temp, setTemp] = useState(null);
  const [Country, setCountry] = useState('');
  const [InvalidCity, setInvalidCity] = useState("");




  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Country.trim() === '') {
      setInvalidCity("Please enter a valid Country or City")
      return;
    } else {
      setInvalidCity("");
    }
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=philippines&aqi=no`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setTemp(data.current.temp_c);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      alert('Failed to fetch weather data. Please try again.');
    }
  };
  return (
    <div className="App">
      <div>
        <div className='text-muted'>
          <center className='mt-5'>
            <h1>Weather App</h1>
            <p >
              <CloudIcon /> API by WeatherApi
            </p>
            <div>

            </div>
          </center>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            class="form-control mt-5 "
            type="text"
            placeholder='Country or city'
            value={Country}
            onChange={(e) => setCountry(e.target.value)} />
          <center className='text text-danger'>
            <p>{InvalidCity}</p>
          </center>
          <div className='d-grid'>
            <button type="submit" className='btn btn-success w-full mt-3' >Get Weather</button>
          </div>
        </form>
        <div className="mt-3 text-muted">
          {temp === null ? (
            <div><p>Enter a valid Country or city to get the weather</p></div>
          ) : (
            <div><h2>Temperature: {temp} &#8451;</h2></div>
          )}
        </div>
      </div>

      <div className='crdts text-muted'>
        © Franco Gregorio 2023. All Rights reserved.
      </div>
    </div>
  );
}

export default App;
