import React from 'react';

export const FullScreenLoader = (props) => {

  return (
    <div className="full-screen-loader">
      <div className="d-flex justify-content-center">
        <div className="spinner-grow loader" role="status">
          <span className="sr-only">Loading</span>
        </div>
      </div>
    </div>
  ); 
}

export default FullScreenLoader;