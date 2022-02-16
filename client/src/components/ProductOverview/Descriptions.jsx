import React from 'react';

const Descriptions = (props) => (

  <div id="descriptions">
    <h4>{props.product.slogan}</h4>
    {props.product.description}
  </div >
)

export default Descriptions;