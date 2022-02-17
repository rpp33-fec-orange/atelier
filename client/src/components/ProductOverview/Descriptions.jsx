import React from 'react';

const Descriptions = (props) => (

  <div id="descriptions">
    <h4>{props.productById.slogan}</h4>
    {props.productById.description}
  </div >
)

export default Descriptions;