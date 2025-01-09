import React, { useState, useEffect } from 'react';
import CloudIcon from '@mui/icons-material/Cloud';
import AirIcon from '@mui/icons-material/Air';
import NightlightIcon from '@mui/icons-material/Nightlight';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import PublicIcon from '@mui/icons-material/Public';
import '../src/App.css'

function App() {
  const [max_temp, setMax_Temp] = useState(null);
  const [temp, setTemp] = useState('');
  const [min_temp, setMin_Temp] = useState('');
  const [sunrise, setSunRise] = useState('');
  const [sunset, setSunSet] = useState('');
  const [conditions, setCondition] = useState('');
  const [name, setname] = useState('');
  const [Invalid_City, setInvalid_City] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [local_Time, setLocal_Time] = useState("");
  const [moon_Phase, setMoon_Phase] = useState("");
  const [maxwind_kph, setMaxwind_kph] = useState("");
  const [wind_kph, setWind_kph] = useState("");
  //const [moonrise, setMoonrise] = useState("");
  // const [moonset, setMoonset] = useState("");






  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name.trim() === '') {
      setInvalid_City("Please enter a valid name or City")
      return;
    } else {
      setInvalid_City("");
    }
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${name}&days=1&aqi=no&alerts=no`;


    //const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${name}&days=1&aqi=no&alerts=no`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setLon(data.location.lon);
      setLat(data.location.lat);
      //setMoonrise(data.forecast.forecastday[0].astro.moonrise);
      //setMoonset(data.forecast.forecastday[0].astro.moonset);
      setMoon_Phase(data.forecast.forecastday[0].astro.moon_phase);
      setLocal_Time(data.location.localtime);
      setWind_kph(data.current.wind_kph);
      setMaxwind_kph(data.forecast.forecastday[0].day.maxwind_kph);
      setTemp(data.current.temp_c)
      setSunRise(data.forecast.forecastday[0].astro.sunrise)
      setSunSet(data.forecast.forecastday[0].astro.sunset)
      setCondition(data.current.condition.text)
      setMax_Temp(data.forecast.forecastday[0].day.maxtemp_c);
      setMin_Temp(data.forecast.forecastday[0].day.mintemp_c);
      setRegion(data.location.region)
      setCountry(data.location.country)
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      alert('Failed to fetch weather data. Please try again.');
    }
  };

  useEffect(() => {
    fetch("https://api.weatherapi.com/v1/forecast.json?key=6ba551e0ee3a40229dd80510250801&q=${name}&days=1&aqi=no&alerts=no")
      .then(response => response.json())
      .then(json => console.log(json))
  }, []);
  return (
    <div className="App  bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
      <div className='lg:h-screen'>
        <div className='pt-5 pb-5'>
          <center>
            <h1 className='text-5xl mb-2 font-semibold'>Weather App</h1>
            <p >
              <CloudIcon /> API by WeatherApi
            </p>

          </center>
        </div>
        <div className='container'>
          <div className='lg:flex lg:justify-around'>
            <form onSubmit={handleSubmit}>
              <center className='text text-danger'>
                <input
                  class="form-control mt-3 lg:w-64 "
                  type="text"
                  placeholder='region or city'
                  value={name}
                  onChange={(e) => setname(e.target.value)} />


                <p>{Invalid_City}</p>
              </center>
              <div className='button'>
                <button type="submit" className='btn w-64 btn-success mt-2 ' >Get Weather</button>
              </div>

              <div>
                {max_temp === null ? (
                  <div> <center><p className='text-2xl font-semibold'></p></center></div>
                ) : (
                  <div className='text  text-lg'>
                    <center className='mt-3'>
                      <p className='text-3xl mb-3'><NightsStayIcon /> {moon_Phase}</p>
                      <p>{local_Time}</p>
                    </center>
                    <center>
                      <div className='flex justify-around md:space-x-20 mt-3'>
                        <div>
                          <p><PublicIcon /> Lat : {lat}</p>
                          {/* <p><NightlightIcon/> Moonrise : {moonrise}</p>*/}
                          <p><AirIcon /> wind_kph : {wind_kph}</p>
                        </div>
                        <div>
                          <p><PublicIcon /> Lon : {lon}</p>
                          {/* <p><NightlightIcon/> Moonset : {moonset}</p> */}
                          <p><AirIcon /> maxwind_kph : {maxwind_kph}</p>
                        </div>
                      </div>
                    </center>

                  </div>
                )}
              </div>
            </form>
            <div className="mt-3 ">
              {max_temp === null ? (
                <div> <center><p className='text-2xl font-semibold'>WEATHER UPDATE</p></center></div>
              ) : (

                <div>
                  <center>
                    <h4 className='md:text-xl lg:text-3xl text-lg mb-2'>{country}, {region}</h4>
                    <h1 className='md:text-2xl lg:text-4xl text-xl mb-2'> {temp} &#8451;</h1>
                    <h5 className='md:text-xl lg:text-2xl text-center mb-2'><CloudIcon /> {conditions}</h5>
                  </center>
                  <div className='condtion_and_tem mt-10 gap-5 md:gap-10 lg:space-x-10'>
                    <div>
                      <center>
                        <p className='text-xl'>Highest : {max_temp} &#8451;</p>
                        <p className='lg:text-2xl text-lg mt-3 font-semibold'>Sunrise</p>
                        <img src="https://img.icons8.com/external-tulpahn-outline-color-tulpahn/64/000000/external-sunrise-weather-tulpahn-outline-color-tulpahn.png" className='mt-3 mb-3' alt="sunrise" />
                        <p className='lg:text-2xl text-lg font-semibold'>{sunrise}</p>
                      </center>
                    </div>
                    <div>
                      <center>
                        <p className='text-xl'>Lowest : {min_temp} &#8451;</p>
                        <p className='lg:text-2xl text-lg mt-3 font-semibold'>Sunset </p>
                        <img className='mt-3 mb-3' src="https://img.icons8.com/external-tulpahn-outline-color-tulpahn/64/000000/external-sunrise-weather-tulpahn-outline-color-tulpahn-1.png" alt="" />
                        <p className='lg:text-2xl text-lg font-semibold'>{sunset}</p>
                      </center>
                    </div>
                  </div>
                  <div>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
