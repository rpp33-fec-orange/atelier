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
      currentSku: props.productStylesById.results[0].skus[Object.keys(props.productStylesById.results[0].skus)[0]],
      mainPhotoURL: props.productStylesById.results[0].photos[0].url,
      subPhotos: props.productStylesById.results[0].photos
    }
    this.photoClick = this.photoClick.bind(this);
    this.styleChange = this.styleChange.bind(this);
    this.skuChange = this.skuChange.bind(this);
    this.cartClick = this.cartClick.bind(this);
    this.favoriteClick = this.favoriteClick.bind(this);
  }

  photoClick(e) {
    console.log('target data', e.target)
    this.setState({
      mainPhotoURL: e.target.src,    //main updated with the photo clicked
    })
  }

  styleChange(e) {
    for (let i = 0; i < this.state.styles.length; i++) {
      if (this.state.styles[i].name === e.target.value) {
        let selectedStyle = this.state.styles[i];
        this.setState({
          currentStyle: selectedStyle,
          currentStyleSkus: selectedStyle.skus,
          mainPhotoURL: selectedStyle.photos[0],
          subPhotos: selectedStyle.photos
        });
      }
    }
  }

  skuChange(e) {
    let skuKeys = Object.keys(this.state.currentStyleSkus);
    for (let i = 0; i < skuKeys.length; i++) {
      if (this.state.currentStyleSkus[skuKeys[i]].size === e.target.value) {
        let selectedSku = this.state.currentStyleSkus[skuKeys[i]];
        this.setState({
          currentSku: selectedSku
        });
      }
    }
  }

  cartClick() {

  }

  favoriteClick() {

  }

  render() {
    let productById = this.state.productById;
    let productStylesById = this.state.productStylesById;
    let styles = this.state.styles;
    let currentStyle = this.state.currentStyle;
    let currentStyleSkus = this.state.currentStyleSkus;
    let currentSku = this.state.currentSku;
    let mainPhotoURL = this.state.mainPhotoURL;
    let subPhotos = this.state.subPhotos;
    console.log('productStylesById: ', productStylesById);
    return (
      <div>
        <div id="photos">
          <img id="mainPhoto" src={mainPhotoURL} width="300" height="425"></img> <br></br>
          {subPhotos.map((photo) =>
            <img id="subPhoto" src={photo.url} width="75" height="105" onClick={this.photoClick}></img>
          )}
        </div>
        <div id="details">
          <div id="rating">★★★★☆</div>
          <div id="category">{productById.category}</div>
          <div id="name">{productById.name}</div>
          <div id="price">{productById.default_price}</div>
          <div id="selector">Select Style/Size/Quantity</div>
          <select name="Style" id="style" onChange={this.styleChange}>
            <option value="nullStyle">Style</option>
            {styles.map((style) =>
              <option value={style.name}>{style.name}</option>
            )}
          </select>
          <select name="Size" id="size" onChange={this.skuChange}>
            <option value="nullSize">Size</option>
            {Object.keys(currentStyleSkus).map((sku) =>
              <option value={currentStyleSkus[sku].size}>{currentStyleSkus[sku].size}</option>
            )}
          </select>
          <select name="Quantity" id="quantity">
            <option value="nullQuantity">Quantity</option>
            <option value={currentSku.quantity}>{currentSku.quantity}</option>
          </select><br></br>
          <button id="add" onClick={this.cartClick}>ADD TO CART</button><button id="favorte" onClick={this.favoriteClick}>☆</button>
        </div >
      </div >
    )
  }
}

export default Styles;