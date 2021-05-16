import * as actionTypes from '../Actions/actionTypes';
import {
  setLoading,
  toggleCards,
  toggleUnits,
  updateForecasts,
} from './functions';

const { UPDATE_FORECASTS, TOGGLE_UNITS, TOGGLE_CARDS, SET_LOADING } = actionTypes;

const initialState = {
  units: 'c',
  cardIndex: 0,
  forecasts: [],
  isLoading: true,
  country: undefined,
  location: undefined,
  selectedDay: undefined,
  limits: { start: 0, end: 3},
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_LOADING: return setLoading(state);
    case TOGGLE_UNITS: return toggleUnits(state);
    case TOGGLE_CARDS: return toggleCards(state, action);
    case UPDATE_FORECASTS: return updateForecasts(state, action);
    default: return state;
  }
}

export default reducer;