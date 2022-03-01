import React from 'react';

const Info = (props) => (
  <div class="info-container" id="Info">
    <div class="info-item info-item-1">
      <div id="slogan">{props.productById.slogan}.</div>
      <div id="description">{props.productById.description}</div>
    </div>
    <div class="info-item info-item-2" id="features">
      {props.productById.features.map((singleData) =>
        <div>
          ✔ {singleData.feature}: {singleData.value}
        </div>
      )}
    </div >
  </div >
)

export default Info;