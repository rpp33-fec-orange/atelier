import React from 'react';
import $ from 'jquery';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
  }

  productsHandler() {
    $.ajax({
      context: this,
      type: 'GET',
      url: '/products', //product id infor only
      success: function (success) {
        console.log('product overview ajax GET success: ', success[0]);
        this.setState({
          product: success[0],
        });
      },
      error: function (error) {
        console.log('product overview ajax GET error: ', error);
      },
      contentType: "application/json",
    })
  }

  productHandler() {

  }

  stylesHandler() {

  }

  componentDidMount() {
    this.productsHandler();
  }

  render() {
    return (
      <div id="details">
        <div id="rating">★★★★☆</div>
        <div id="category">{this.state.product.category}</div>
        <div id="name">{this.state.product.name}</div>
        <div id="price">{this.state.product.default_price}</div>
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