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
    <div className="App text-white">
      <div>
        <div className='container pt-5 pb-5'>
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
              <center>
                <div
                  class="mt-3 relative sm:w-[480px] w-[300px] bg-gray-100 rounded-2xl shadow-md p-1.5 transition-all duration-150 ease-in-out hover:scale-105 hover:shadow-lg"
                >
                  <div
                    class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"
                  >
                    <svg
                      class="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                   value={name}
                   onChange={(e) => setname(e.target.value)} 
                    type="text"
                    class="w-full pl-8 py-3  text-base text-gray-700 bg-transparent rounded-lg focus:outline-none"
                    placeholder="Search A City or Country"
                  />
                  <button
                    class="absolute right-1 top-1 bottom-1 px-6 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600"
                  type="submit"
                  >
                    Search
                  </button>
                </div>
                <p className='text-red-900/75 text-lg'>{Invalid_City}</p>
              </center>
              <div>
                {max_temp === null ? (
                  <div> <center><p className='text-2xl font-semibold'></p></center></div>
                ) : (
                  <div className='text bg-gray-700/50 shadow-sm p-5 pt-3 rounded mt-5 text-lg'>
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

                <div className="mt-3 bg-gray-700/50 shadow-sm p-5 pt-3 rounded ">
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
