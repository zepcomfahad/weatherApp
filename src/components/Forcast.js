import React, { useState, useEffect } from 'react';
import WeekContainer from './WeekContainer';
import DayContainer from './DayContainer'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

const Forcast = () => {
   let [responseObj, setResponseObj] = useState({});
   let [fullData, setFullData] = useState([]);
   let [dailyData, setDailyData] = useState([]);
   let [city, setCity] = useState('');
   let [unit, setUnit] = useState('metric');
   let [error, setError] = useState(false);
   let [loading, setLoading] = useState(false);

   useEffect(() => {
      fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?units=${unit}&q=karachi`, {
         "method": "GET",
         "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_API_KEY
         }
      })
         .then(response => response.json())
         .then(response => {
            setFullData(response.list);
            const dailyData = response.list.filter(reading => reading.dt_txt.includes("18:00:00"))
            setDailyData(dailyData);
            setLoading(false);
         })
         .catch(err => {
            setError(true);
            setLoading(false);
            console.log(err.message);
         });

      fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=karachi`, {
         "method": "GET",
         "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_API_KEY
         }
      })
         .then(response => response.json())
         .then(response => {
            setResponseObj(response);
         })
         .catch(err => {
            setError(true);
            setLoading(false);
            console.log(err.message);
         });
   }, [])

   function getForecast(e) {
      e.preventDefault();
      if (city.length === 0) {
         return setError(true);
      }
      // Clear state in preparation for new data
      setError(false);
      setResponseObj({});
      setLoading(true);

      const uriEncodedCity = encodeURIComponent(city);
      fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?units=${unit}&q=${uriEncodedCity}`, {
         "method": "GET",
         "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_API_KEY
         }
      })
         .then(response => response.json())
         .then(response => {
            setFullData(response.list);
            console.log(response.list);
            const dailyData = response.list.filter(reading => reading.dt_txt.includes("18:00:00"))
            setDailyData(dailyData);
            setLoading(false);
         })
         .catch(err => {
            setError(true);
            setLoading(false);
            console.log(err.message);
         });
      fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
         "method": "GET",
         "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_API_KEY
         }
      })
         .then(response => response.json())
         .then(response => {
            setResponseObj(response);
         })
         .catch(err => {
            setError(true);
            setLoading(false);
            console.log(err.message);
         });
   }
   return (
      <div>
         {/* ======= Hero Section ======= */}
         <section id="hero" className="d-flex flex-column justify-content-center align-items-center">
            <div className="container text-center text-md-left" data-aos="fade-up">
               <form className="find-location" onSubmit={getForecast}>
                  <h2>React Weather App</h2>
                  <input type="text" placeholder="Find your location..." type="text"
                     placeholder="Enter City"
                     maxLength="50"
                     value={city}
                     onChange={(e) => setCity(e.target.value)} />
                  <button type="submit">Find</button>
               </form>

               {/* ======= Routing ======= */}
               <BrowserRouter>
                  <Switch>
                     <Route path="/" exact>
                        <WeekContainer responseObj={responseObj}
                           dailyData={dailyData}
                           fullData={fullData}
                           error={error}
                           loading={loading} />
                     </Route>
                     <Route path="/day">
                        {responseObj === "" ? <Redirect to="/" /> :
                           <DayContainer
                              responseObj={responseObj}
                              fullData={fullData}
                           />
                        }
                     </Route>
                  </Switch>
               </BrowserRouter>
               {/* End Routing */}
            </div>
         </section>
         {/* End Hero */}
      </div>
   )
}
export default Forcast;