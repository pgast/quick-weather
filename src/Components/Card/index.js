import React from 'react';
import './index.css';

const Card = ({ data, isSelected, units }) => {
  const tempOutput = (temp) => {
    if(units === 'f') return `${Math.floor((temp * 1.8) + 32)}°F`;
    return `${Math.floor(temp)}°C`;
  }

  const setIcon = (iconCode) => {
    switch (iconCode) {
      case '01d': return "fa fa-sun";
      case '01n': return "fa fa-moon";
      case '02d': return "fa fa-cloud";
      case '02n': return "fa fa-cloud";
      case '03d': return "fa fa-cloud";
      case '03n': return "fa fa-cloud";
      case '04d': return "fa fa-cloud";
      case '04n': return "fa fa-cloud";
      case '09d': return "fa fa-tint";
      case '09n': return "fa fa-tint";
      case '10d': return "fa fa-tint";
      case '10n': return "fa fa-tint";
      case '11d': return "fa fa-bolt";
      case '11n': return "fa fa-bolt";
      case '50d': return "fa fa-align-justify";
      case '50n': return "fa fa-align-justify";
      default: return "fa fa-sun-o"
    }
  }

  const months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  }

  const dateFormat = (date) => {
    let day = date.slice(8,10);
    day = day[0] === '0' ? day[1] : day;
    return `${day} ${months[date.slice(5,7)]}`;
  }

  return (
    <div className={isSelected ? "card card--selected" : "card"} >
      <div className="mainInfo">
        <div className="highlight">
          <h4>{tempOutput(data.temps.avg)}</h4>
          <h4>{data.description}</h4>
        </div>
        <div>
          <i className={setIcon(data.iconCode)} />
        </div>
      </div>
      <div className="tempRows">
        <div className="tempVal">
          <h4>{tempOutput(data.temps.max)}</h4>
          <h4>Max</h4>
        </div>
        <div className="tempVal">
          <h4>{tempOutput(data.temps.min)}</h4>
          <h4>Min</h4>
        </div>
      </div>
      <div className="dayDate">
        <h4>{dateFormat(data.date)}</h4>
      </div>
    </div>
  )
}

export default Card;