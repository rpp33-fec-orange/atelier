import React from 'react';

const Descriptions = (props) => (
  <div>
    <div id="descriptions">
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

export default Descriptions;