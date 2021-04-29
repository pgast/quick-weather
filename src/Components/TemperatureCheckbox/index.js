import React from 'react';
import { connect } from 'react-redux';
import './index.css';
// Action Dispatchers
import { toggleUnits } from '../../Store/Actions/actions';

const TemperatureCheckbox = ({units, toggleUnits}) => {
  return (
    <div className="temperatureCheckbox">
      <div
        onClick={() => toggleUnits()}
        className={units === 'c' ? "unitBtn unitBtn--selected" : "unitBtn"}
      >
        <h4>
          Celsius
        </h4>
      </div>
      <div
        onClick={() => toggleUnits()}
        className={units === 'f' ? "unitBtn unitBtn--selected" : "unitBtn"}
      >
        <h4>
          Fahrenheit
        </h4>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return { 
    toggleUnits: () => dispatch(toggleUnits())
  };
};

const mapStateToProps = state => {
  return { 
    units: state.units,
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemperatureCheckbox);