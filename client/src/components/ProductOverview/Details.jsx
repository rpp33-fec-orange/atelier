import React from 'react';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
  }

  render() {
    return (
      <div id="details">
        <div id="name">Men's Knitted Button-Up</div>
        <div id="category">Sweater & Outwear</div>
        <div id="rating">★★★★☆</div>
        <div id="price">$64.99</div>
        <div id="selector">Select Style/Size/Quantity</div>
        <select id="style">
          <option value="gray">Heather Gray</option>
          <option value="black">Graphite Black</option>
          <option value="white">Moonlight White</option>
        </select>
        <select id="size">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="extra-large">Extra Large</option>
        </select>
        <select id="quantity">
          <option value="one">1</option>
          <option value="two">2</option>
          <option value="three">3</option>
          <option value="four">4</option>
        </select><br></br>
        <button id="add">ADD TO CART</button><button id="favorte">☆</button>
      </div >
    )
  }
}

export default Details;