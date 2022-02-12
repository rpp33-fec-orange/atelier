import React from 'react';

const ProductOverview = (props) => (
  <div>
    <h4 id="productOverview">Product Overview</h4>
    <div id="logo">Logo<input id="search" placeholder="keyword"></input><button>Search</button></div>
    <div id="message">Valentine's Day Sale! ---Extra 40% off on select items--- Free shipping for orders over $50!</div>
    <div id="product">
      <div id="name">Men's Knitted Button-Up</div>
      <div id="category">Sweater & Outwear</div>
      <div id="rating">★★★★☆</div>
      <img id="image" src="https://cdn.shopify.com/s/files/1/0286/4077/2235/products/Knit-polo-sweater-The-Korean-Fashion_61ba38bf-7198-4f52-bca3-8b7ee082e567_1800x1800.jpg?v=1639580510" width="200" height="200"></img>
      <div id="price">$64.99</div>
      <div id="selector">Select Style ></div>
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
      <div id="description">
        Esconced yourself in the finest wool in all of Middle Earth, crafted with Elven Everlast threads with flax fiber from the Shire with a dash of gunpowder of Modor.<br></br>
        ✔ Range Free Unicorn Hair <br></br>
        ✔ Twice Reborn Phoenix Feather <br></br>
        ✔ Earth Core Crystalized Lava
      </div>
    </div>
  </div>
)

// class ProductOverview extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       product: {}
//     }
//   }

//   render() {
//     return (

//     )
//   }
// }

export default ProductOverview;