import React from 'react';
import { connect } from 'react-redux';
import './index.css';
// Components
import Card from '../Card';
// Action Dispatchers
import { toggleCards } from '../../Store/Actions/actions';

const WeatherCards = ({ 
  units,
  limits,
  forecasts, 
  cardIndex, 
  toggleCards, 
}) => {

  let visibleCards = [];

  forecasts.forEach((el, idx) => visibleCards.push(
    <Card 
      key={idx} 
      data={el}
      units={units} 
      isSelected={idx === cardIndex ? true : false} 
    />
  ));

  return (
    <div className="weatherCards">
      <div className="buttonRow">
        {cardIndex > 0 && (
          <div className="btn" onClick={() => toggleCards('prev')}>
            <i className="fas fa-chevron-left" />
            Previous Day
          </div>
        )}
        {cardIndex < 4 && (
          <>
          <div></div>
          <div className="btn" onClick={() => toggleCards('next')}>
            Next Day
            <i className="fas fa-chevron-right" />
          </div>
          </>
        )}
      </div>
      <div className="cardsRow">
        {visibleCards.slice(limits.start, limits.end)}
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return { 
    toggleCards: (direction) => dispatch(toggleCards(direction))
  };
};

const mapStateToProps = state => {
  return { 
    units: state.units,
    limits: state.limits,
    cardIndex: state.cardIndex,
    forecasts: state.forecasts,
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherCards);