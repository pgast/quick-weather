import * as actionTypes from '../Actions/actionTypes';
import {
  toggleCards,
  toggleUnits,
  updateForecasts,
} from './functions';

const { UPDATE_FORECASTS, TOGGLE_UNITS, TOGGLE_CARDS } = actionTypes;

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
    case TOGGLE_UNITS: return toggleUnits(state);
    case TOGGLE_CARDS: return toggleCards(state, action);
    case UPDATE_FORECASTS: return updateForecasts(state, action);
    default: return state;
  }
}

export default reducer;