import React from 'react';
import $ from 'jquery';

class Styles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productById: props.productById,
      rating: '★★★★☆',
      productStylesById: props.productStylesById,
      styles: props.productStylesById.results,
      currentStyle: props.productStylesById.results[0],
      currentStyleSkus: props.productStylesById.results[0].skus,
      currentSku: '',
      skuCode: '',
      mainPhotoURL: props.productStylesById.results[0].photos[0].url,
      subPhotos: props.productStylesById.results[0].photos,
      quantitySelected: 0,
      quantityArray: [],
      cart: []
    }
    this.photoClick = this.photoClick.bind(this);
    this.styleChange = this.styleChange.bind(this);
    this.skuChange = this.skuChange.bind(this);
    this.postCart = this.postCart.bind(this);
    this.getCart = this.getCart.bind(this);
    this.favoriteClick = this.favoriteClick.bind(this);
    this.quantityChange = this.quantityChange.bind(this);
    this.readReviews = this.readReviews.bind(this);
  }

  photoClick(e) {
    this.setState({
      mainPhotoURL: e.target.src
    })
  }

  styleChange(e) {
    for (let i = 0; i < this.state.styles.length; i++) {
      if (this.state.styles[i].name === e.target.name) {
        let selectedStyle = this.state.styles[i];
        this.setState({
          currentStyle: selectedStyle,
          currentStyleSkus: selectedStyle.skus,
          mainPhotoURL: selectedStyle.photos[0].url,
          subPhotos: selectedStyle.photos
        });
      }
    }
  }

  skuChange(e) {
    let skuKeys = Object.keys(this.state.currentStyleSkus);
    for (let i = 0; i < skuKeys.length; i++) {
      if (e.target.value === this.state.currentStyleSkus[skuKeys[i]].size) {
        let selectedSku = this.state.currentStyleSkus[skuKeys[i]];
        this.setState({
          currentSku: selectedSku,
          skuCode: skuKeys[i]
        });
      }
    }
    if (e.target.value === 'Select Size') {
      this.setState({
        currentSku: '',
        skuCode: '',
        quantityArray: []
      })
    }
  }

  postCart() {
    let cartItem = {
      sku: this.state.skuCode,
      quantity: this.state.quantitySelected
    };
    this.state.cart.push(cartItem);
    $.ajax({
      context: this,
      type: 'POST',
      url: '/cart',
      data: JSON.stringify({ cartItem }),
      contentType: 'application/json',
      success: function (successAjax) {
        console.log('Ajax POST Success!');
      },
      error: function (errorAjax) {
        console.log('Ajax POST Error!');
      },
    })
  }

  getCart() {
    console.log('html cart: ', this.state.cart);
    $.ajax({
      context: this,
      type: 'GET',
      url: '/cart',
      success: function (success) {
        console.log('getCart ajax GET success: ', success);
        this.setState({
          cart: success,
        })
      },
      error: function (error) {
        console.log('getCart ajax GET error: ', error);
      },
      contentType: "application/json",
    })
    console.log('api cart: ', this.state.cart);
  }

  favoriteClick() {

  }

  readReviews() {

  }

  quantityChange(e) {
    this.setState({
      quantitySelected: e.target.value
    })
  }

  render() {
    let productById = this.state.productById;
    let productStylesById = this.state.productStylesById;
    let rating = this.state.rating;
    let styles = this.state.styles;
    let currentStyle = this.state.currentStyle;
    let currentStyleSkus = this.state.currentStyleSkus;
    let currentSku = this.state.currentSku;
    let mainPhotoURL = this.state.mainPhotoURL;
    let subPhotos = this.state.subPhotos;
    let quantityArray = this.state.quantityArray;
    quantityArray = [];
    if (currentSku.quantity > 0) {
      for (let i = 1; i <= currentSku.quantity; i++) {
        quantityArray.push(i);
      }
    }
    return (
      <div id="Styles">
        <div id="photos">
          <img id="mainPhoto" src={mainPhotoURL} width="300" height="390"></img> <br></br>
          {subPhotos.map((photo) =>
            <img id="subPhoto" src={photo.url} width="75" height="105" onClick={this.photoClick}></img>
          )}
        </div>
        <div id="styles">
          <div id="rating">{rating} <button onClick={this.readReviews}>Read Reviews</button></div>
          <div id="category">{productById.category}</div>
          <div id="name">{productById.name}</div>
          <div id="price">{productById.default_price}</div>
          <div >Style> {currentStyle.name}</div>
          <div id="style">
            {styles.map((style) =>
              <img id="styleThumbnail" name={style.name} src={style.photos[0].url} width="40" height="40" onClick={this.styleChange}></img>
            )}
          </div>
          <div>
            <select id="size" onChange={this.skuChange} >
              <option value="nullSize">Select Size</option>
              {Object.keys(currentStyleSkus).map((sku) =>
                <option value={currentStyleSkus[sku].size} >{currentStyleSkus[sku].size}</option>
              )}
            </select>
            <select id="quantity" onChange={this.quantityChange}>
              {quantityArray && quantityArray.map((quantityItem) =>
                <option value={quantityItem} >{quantityItem}</option>
              )}
              {/* {if(!quantityArray) {< option value="nullQuantity" >-</option>}} */}
            </select>
          </div>
          {currentSku.quantity ? <button id="postCart" onClick={this.postCart}>ADD TO CART</button> : <button id="outOfStock" disabled>ADD TO CART</button>}
          <button id="favorite" onClick={this.favoriteClick}>☆</button><button id="getCart" onClick={this.getCart}>YOUR CART</button>
        </div >
      </div >
    )
  }
}

export default Styles;