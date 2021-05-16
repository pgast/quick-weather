import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
// Action Dispatchers
import { updateForecasts, setLoading } from './Store/Actions/actions';
// Components
import LoadingView from './Components/LoadingView';
import WeatherInfoScreen from './Components/WeatherInfoScreen';

function formatWeatherData(fetchedData) {
  let forecast = [];
  let day = [];
  let currentDate = fetchedData.list[0].dt_txt.slice(0, 10);

  for(let i=0; i<fetchedData.list.length; i++) {
    let hourlyData = fetchedData.list[i];    
    if(currentDate !== hourlyData.dt_txt.slice(0, 10)|| i === fetchedData.list.length - 1) {
      forecast.push({
        hourlyForecasts: day,
        date: day[0].date.slice(0, 10),
        iconCode: hourlyData.weather[0].icon,
        description: hourlyData.weather[0].main,
      });
      day = [];
    }
    currentDate = hourlyData.dt_txt.slice(0, 10);

    if(currentDate === hourlyData.dt_txt.slice(0, 10)) {
      day.push({
        date: hourlyData.dt_txt,
        temp: {
          max: hourlyData.main.temp_max,
          min: hourlyData.main.temp_min,
          current: hourlyData.main.temp
        }
      })
    }
  }

  return { 
    isLoading: false,
    forecasts: forecast,
    location: fetchedData.city.name,
    country: fetchedData.city.country,
  }
}

const App = ({ updateForecastsDispatch, setLoading, isLoading }) => {
  const [error, setError] = useState(false); 

  function getWeatherData() {
    var appId = "061f24cf3cde2f60644a8240302983f2";

    fetch("http://ip-api.com/json/").then(function(response) {
      if (response.ok) return response.json();
      return Promise.reject(response);
    }).then(function (data) {
      return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${data.city},${data.countryCode.toLowerCase()}&units=metric&APPID=${appId}`);
    }).then(function (response) {
      if (response.ok) return response.json();
      return Promise.reject(response);
    }).then(function (userData) {
      updateForecastsDispatch(formatWeatherData(userData));
      setLoading();
    }).catch(function (error) {
      setError(true);
      setLoading();
    });
  }

  function renderView() {
    if(isLoading && !error) return <LoadingView />;

    if(error) {
      return <div className="ErrorView">
        <h4>Something went wrong</h4>
        <p>We are unable to get data at the moment, check your internet connection</p>
      </div>
    } else {
      return <WeatherInfoScreen />
    }
  }

  useEffect(() => { getWeatherData() }, []);

  return (
    <div className="App">
      {renderView()}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return { 
    setLoading: () => dispatch(setLoading()),
    updateForecastsDispatch: (data) => dispatch(updateForecasts(data)),
  };
};

const mapStateToProps = state => {
  return { 
    isLoading: state.isLoading
   };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(App);