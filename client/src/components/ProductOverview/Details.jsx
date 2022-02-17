import React from 'react';
import $ from 'jquery';

//Object.keys(props.productStylesById.results.skus).map

const Details = (props) => (
  <div id="details">
    <div id="rating">★★★★☆</div>
    <div id="category">{props.productById.category}</div>
    <div id="name">{props.productById.name}</div>
    <div id="price">{props.productById.default_price}</div>
    <div id="selector">Select Style/Size/Quantity</div>
    <select id="style">
      {props.productStylesById.results.map((singleData) =>
        <option value={singleData.name}>{singleData.name}</option>
      )}
    </select>
    <select id="size">
      <option value="xs">XS</option>
      <option value="s">S</option>
      <option value="m">M</option>
      <option value="l">L</option>
    </select>
    <select id="quantity">
      <option value="one">1</option>
      <option value="two">2</option>
      <option value="three">3</option>
      <option value="four">4</option>
      <option value="four">5</option>
    </select><br></br>
    <button id="add">ADD TO CART</button><button id="favorte">☆</button>
  </div >
)

// class Details extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       product: {}
//     }
//   }

//   render() {
//     return (
//       <div id="details">
//         <div id="rating">★★★★☆</div>
//         <div id="category">{this.state.product.category}</div>
//         <div id="name">{this.state.product.name}</div>
//         <div id="price">{this.state.product.default_price}</div>
//         <div id="selector">Select Style/Size/Quantity</div>
//         <select id="style">
//           <option value="gray">Heather Gray</option>
//           <option value="black">Graphite Black</option>
//           <option value="white">Moonlight White</option>
//         </select>
//         <select id="size">
//           <option value="small">Small</option>
//           <option value="medium">Medium</option>
//           <option value="large">Large</option>
//           <option value="extra-large">Extra Large</option>
//         </select>
//         <select id="quantity">
//           <option value="one">1</option>
//           <option value="two">2</option>
//           <option value="three">3</option>
//           <option value="four">4</option>
//         </select><br></br>
//         <button id="add">ADD TO CART</button><button id="favorte">☆</button>
//       </div >
//     )
//   }
// }

export default Details;