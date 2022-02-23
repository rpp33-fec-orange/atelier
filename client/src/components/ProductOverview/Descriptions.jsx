import React from 'react';

const Descriptions = (props) => (
  <div>
    <div data-testid ="descriptions" id="descriptions">
      Slogan and Descriptions
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