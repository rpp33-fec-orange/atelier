import React from 'react';

const Info = (props) => (
  <div>
    <div data-testid="info" id="info">
      {props.productById.slogan}<br></br>
      {props.productById.description}
    </div>
    <div id="features">
      {props.productById.features.map((singleData) =>
        <div>
          ✔ {singleData.feature}: {singleData.value}
        </div>
      )}
    </div >
  </div >
)

export default Info;