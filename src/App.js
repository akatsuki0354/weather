import React, { useState, useEffect } from 'react';
import '../src/App.css'

function App() {
  const [temp, setTemp] = useState(0);
  const [Country, setCountry] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Country.trim() === '') {
      alert('Please enter a valid Country name');
      return;
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=6ba551e0ee3a40229dd80510250801&q=${Country}&aqi=no`;

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
      <div className='' >
        <form onSubmit={handleSubmit}>
          <input
            class="form-control mt-5 "
            type="text"
            placeholder='Country'
            value={Country}
            onChange={(e) => setCountry(e.target.value)} />
          <div className='d-grid'>
            <button type="submit" className='btn btn-success w-full mt-3' >Get Weather</button>
          </div>
        </form>
        <br />
        <div>
          <h2 className='text-muted'>Temperature: {temp} &#8451;</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
