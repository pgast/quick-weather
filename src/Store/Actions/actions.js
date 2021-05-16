import * as actionTypes from './actionTypes';
const { UPDATE_FORECASTS, TOGGLE_UNITS, TOGGLE_CARDS, SET_LOADING } = actionTypes;

// TOGGLE UNITS
export const toggleUnits = () => {
  return { type: TOGGLE_UNITS };
}

// FETCH FORECASTS
export const updateForecasts = (data) => {
  return { type: UPDATE_FORECASTS, payload: data };
}

// TOGGLE PAGE
export const toggleCards = (direction) => {
  return { type: TOGGLE_CARDS, payload: direction };
}

// SET LOADING
export const setLoading = () => {
  return { type: SET_LOADING };
}