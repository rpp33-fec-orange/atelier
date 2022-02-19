import React from 'react';

class Styles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productById: props.productById,
      productStylesById: props.productStylesById,
      styles: props.productStylesById.results,
      currentStyle: props.productStylesById.results[0]
    }
    // this.clickHandler = this.clickHandler.bind(this);
  }

  // clickHandler(e) {
  //   this.setState({
  //     main: '',    //main updated with the photo clicked
  //     others: ''   //all photos besides the one clicked
  //   })
  // }

  render() {
    let productById = this.state.productById;
    let productStylesById = this.state.productStylesById;
    return (
      <div>
        <div id="photos">
          <img id="mainPhoto" src={productStylesById.results[0].photos[0].url} width="300" height="425"></img> <br></br>
          {productStylesById.results[0].photos.map((photo) =>
            <img id="subPhoto" src={photo.url} width="75" height="100"></img>
          )}
        </div>
        <div id="details">
          <div id="rating">★★★★☆</div>
          <div id="category">{productById.category}</div>
          <div id="name">{productById.name}</div>
          <div id="price">{productById.default_price}</div>
          <div id="selector">Select Style/Size/Quantity</div>
          <select id="style">
            {productStylesById.results.map((singleData) =>
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
      </div >
    )
  }
}

export default Styles;