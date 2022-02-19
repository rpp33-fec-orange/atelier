import React from 'react';

const Descriptions = (props) => (
  <div id="descriptions">
    {props.productById.slogan} <br></br>
    {props.productById.description}
  </div >
)

export default Descriptions;