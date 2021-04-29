import React from 'react';
import './index.css';

const LoadingView = () => {
  return (
    <div className="loadingView">
      <div>
        <i className="fas fa-spinner rotate linear infinite" />
      </div>
      <h4>Fetching weather data</h4>
    </div>
  )
}

export default LoadingView;