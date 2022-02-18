import React from 'react';

const Features = (props) => (
  <div id="features">
    {props.productById.features.map((singleData) =>
      <div>
        ✔ {singleData.feature}: {singleData.value}
      </div>
    )}
  </div >
)

export default Features;