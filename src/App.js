import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './App.css';
// Action Dispatchers
import { updateForecasts } from './Store/Actions/actions';
// Components
import LoadingView from './Components/LoadingView';
import WeatherInfoScreen from './Components/WeatherInfoScreen';

const App = (props) => {
  const fetchWeatherData = async () => {
    const userLocation = await axios.get("http://ip-api.com/json/");
    const appId = "061f24cf3cde2f60644a8240302983f2";
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${userLocation.data.city},${userLocation.data.countryCode.toLowerCase()}&units=metric&APPID=${appId}`);    
      
    let forecast = [];
    let day = [];
    let currentDate = response.data.list[0].dt_txt.slice(0, 10);

    for(let i=0; i<response.data.list.length; i++) {
      let hourlyData = response.data.list[i];    
  
      if(currentDate !== hourlyData.dt_txt.slice(0, 10)|| i === response.data.list.length - 1) {
        forecast.push({
          description: hourlyData.weather[0].main,
          date: day[0].date.slice(0, 10),
          hourlyForecasts: day,
          iconCode: hourlyData.weather[0].icon
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
      location: userLocation.data.city,
      country: userLocation.data.country,
      forecasts: forecast,
      isLoading: false
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherData();
      props.updateForecastsDispatch(data);
    }
    fetchData();
  }, [props.updateForecastsDispatch]);

  return (
    <div className="App">
      {props.isLoading ? <LoadingView /> : <WeatherInfoScreen />} 
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return { 
    updateForecastsDispatch: (data) => dispatch(updateForecasts(data)),
  };
};

const mapStateToProps = state => {
  return { 
    country: state.country,
    location: state.location,
    isLoading: state.isLoading,
    forecasts: state.forecasts,
    units: state.units,
   };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(App);