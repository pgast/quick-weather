import React from 'react';
import { connect } from 'react-redux';
import './index.css';

const BarChart = ({ 
  units, 
  forecasts, 
  cardIndex, 
  isLoading, 
}) => {

  const tempOutput = (temp) => {
    if(units === 'f') return `${Math.floor((temp * 1.8) + 32)}°F`;
    return `${Math.floor(temp)}°C`;
  }

  return (
    <div className="barChart">
      <h4>Hourly Forecast</h4>
      <div className="hourlyTempsRow">
        {isLoading === false && (
          forecasts[cardIndex].hourlyForecasts.map((el, idx) => (
            <div key={idx} className="hourlyForecast">
              <h4>{tempOutput(el.temp.current)}</h4>
              <h4>{el.date.slice(11, 16)}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return { 
    units: state.units,
    forecasts: state.forecasts,
    cardIndex: state.cardIndex,
    isLoading: state.isLoading,
   };
};

export default connect(mapStateToProps, null)(BarChart);