import React from 'react';
import './index.css';
import { connect } from 'react-redux';
// Components
import BarChart from '../BarChart';
import WeatherCards from '../WeatherCards';
import TemperatureCheckbox from '../TemperatureCheckbox';

const WeatherInfoScreen = ({ country, location }) => {
  return (
    <div className="weatherInfoScreen">
      <div className="locationBanner">
        <h4>{location} -</h4>
        <h4>{country}</h4>
      </div>
      <TemperatureCheckbox />
      <WeatherCards />
      <BarChart />
    </div>
  )
}

const mapStateToProps = state => {
  return { 
    country: state.country,
    location: state.location,
   };
};

export default connect(mapStateToProps, null)(WeatherInfoScreen);