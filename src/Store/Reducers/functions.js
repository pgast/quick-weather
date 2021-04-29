// ADD TEMPERATURES PER DAY
const addTempsPerDay = dayForecasts => {
  for(let i=0; i<dayForecasts.length; i++) {
    let tempsMin = [];
    let tempsMax = [];
    let tempsAvg = [];

    dayForecasts[i].hourlyForecasts.forEach(el => {
      tempsMin.push(el.temp.min);
      tempsMax.push(el.temp.max);
      tempsAvg.push(el.temp.current);
    })

    dayForecasts[i].temps = {
      avg: Math.floor((tempsAvg.reduce((a, b) => a + b) / tempsAvg.length) * 10) / 10,
      min: Math.min(...tempsMin),
      max: Math.max(...tempsMax)
    }

    tempsMin = [];
    tempsMax = [];
    tempsAvg = [];
  };
  return dayForecasts;
}

// UPDATE FORECASTS
export const updateForecasts = (state, payload) => {
  return {
    ...state,
    isLoading: false,
    country: payload.payload.country,
    location: payload.payload.location,
    forecasts: addTempsPerDay(payload.payload.forecasts),
  }
}

// TOGGLE UNITS
export const toggleUnits = state => {
  let newUnits = state.units === 'c' ? 'f' : 'c';
  return {
    ...state,
    units: newUnits
  }
}

// TOGGLE CARDS
export const toggleCards = (state, payload) => {
  let newCardIndex = state.cardIndex;
  let newLimits = {...state.limits};

  if(payload.payload === 'next' && state.cardIndex !== 4) {
    newCardIndex++;
    if(newCardIndex === 4) newLimits = { start: 2, end: 5 };
    if(newCardIndex === newLimits.end && newCardIndex !== 4) {
      newLimits.start++;
      newLimits.end++;
    }
  }

  if(payload.payload === 'prev' && state.cardIndex !== 0) {
    newCardIndex--;
    if(newCardIndex === 0) newLimits = { start: 0, end: 3 };
    if(newCardIndex === newLimits.start-1 && newCardIndex !== 0) {
      newLimits.start--;
      newLimits.end--;
    }
  }

  return {
    ...state,
    limits: newLimits,
    cardIndex: newCardIndex,
  }
}