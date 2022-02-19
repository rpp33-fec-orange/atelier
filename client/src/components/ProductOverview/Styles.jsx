import React from 'react';

class Styles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productById: props.productById,
      productStylesById: props.productStylesById,
      styles: props.productStylesById.results,
      currentStyle: props.productStylesById.results[0],
      currentStyleSkus: props.productStylesById.results[0].skus,
      currentSku: props.productStylesById.results[0].skus[Object.keys(props.productStylesById.results[0].skus)[0]]
    }
    // this.clickHandler = this.clickHandler.bind(this);
  }

  // photoClickHandler(e) {
  //   this.setState({
  //     mainPhoto: '',    //main updated with the photo clicked
  //     subPhotos: ''   //all photos besides the one clicked
  //   })
  // }

  // styleClicKHandler(e) {
  //   this.setState({
  //     currentStyle: ''
  //   })
  // }

  render() {
    console.log('currents style skus: ', (this.state.currentSku));
    let productById = this.state.productById;
    let productStylesById = this.state.productStylesById;
    let styles = this.state.styles;
    let currentStyle = this.state.currentStyle;
    return (
      <div>
        <div id="photos">
          <img id="mainPhoto" src={currentStyle.photos[0].url} width="300" height="425"></img> <br></br>
          {currentStyle.photos.map((photo) =>
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
            {styles.map((style) =>
              <option>{style.name}</option>
            )}
          </select>
          <select id="size">
            {Object.keys(this.state.currentStyleSkus).map((sku) =>
              <option>{this.state.currentStyleSkus[sku].size}</option>
            )}
          </select>
          <select id="quantity">
            <option>{this.state.currentSku.quantity}</option>
          </select><br></br>
          <button id="add">ADD TO CART</button><button id="favorte">☆</button>
        </div >
      </div >
    )
  }
}

export default Styles;