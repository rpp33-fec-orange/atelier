import React from 'react';
import $ from 'jquery';
import YourOutfitRow from '.././RelatedProducts/YourOutfitRow.jsx'

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
      currentSku: props.productStylesById.results[0].skus[Object.keys(props.productStylesById.results[0].skus)[0]],
      skuCode: '',
      mainPhotoURL: props.productStylesById.results[0].photos[0].url,
      subPhotos: props.productStylesById.results[0].photos,
      cart: []
    }
    this.photoClick = this.photoClick.bind(this);
    this.styleChange = this.styleChange.bind(this);
    this.skuChange = this.skuChange.bind(this);
    this.postCart = this.postCart.bind(this);
    this.getCart = this.getCart.bind(this);
    this.favoriteClick = this.favoriteClick.bind(this);
  }

  photoClick(e) {
    this.setState({
      mainPhotoURL: e.target.src
    })
  }

  styleChange(e) {
    for (let i = 0; i < this.state.styles.length; i++) {
      if (this.state.styles[i].name === e.target.value) {
        let selectedStyle = this.state.styles[i];
        this.setState({
          currentStyle: selectedStyle,
          currentStyleSkus: selectedStyle.skus,
          mainPhotoURL: selectedStyle.photos[0].url,
          subPhotos: selectedStyle.photos
        }, () => {
          this.props.currentStyleHandler(this.state.currentStyle);
          // this.props.yourOutfitHandleClick();
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
          currentSku: selectedSku,
          skuCode: skuKeys[i]
        });
      }
    }
  }

  postCart() {
    let cartItem = {
      sku: this.state.skuCode,
      quantity: this.state.currentSku.quantity
    }
    this.state.cart.push(cartItem);
    // $.ajax({
    //   context: this,
    //   type: 'POST',
    //   url: '/cart',
    //   data: JSON.stringify({ cartItem }),
    //   contentType: 'application/json',
    //   success: function (successAjax) {
    //     console.log('Ajax POST Success!');
    //   },
    //   error: function (errorAjax) {
    //     console.log('Ajax POST Error!');
    //   },
    // })
  }

  getCart() {
    console.log('user cart: ', this.state.cart);
    // $.ajax({
    //   context: this,
    //   type: 'GET',
    //   url: '/cart',
    //   success: function (success) {
    //     console.log('getCart ajax GET success:');
    //     this.setState({
    //       cart: success,
    //     })
    //   },
    //   error: function (error) {
    //     console.log('getCart ajax GET error: ', error);
    //   },
    //   contentType: "application/json",
    // })
  }

  favoriteClick() {
    // this.props.currentStyleHandler(this.state.currentStyle);
    this.props.yourOutfitHandleClick(); //storage parameter???
  }

  componentDidMount() {
    this.props.currentStyleHandler(this.state.currentStyle);
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
    return (
      <div>
        <div id="photos">
          <img id="mainPhoto" src={mainPhotoURL} width="300" height="425"></img> <br></br>
          {subPhotos.map((photo) =>
            <img id="subPhoto" src={photo.url} width="75" height="105" onClick={this.photoClick}></img>
          )}
        </div>
        <div id="details">
          <div id="rating">{rating}</div>
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
          {currentSku.quantity ? <button id="postCart" onClick={this.postCart}>ADD TO CART</button> : <button id="outOfStock" disabled>Out of Stock</button>}
          <button id="favorite" onClick={this.favoriteClick}>☆</button><button id="getCart" onClick={this.getCart}>YOUR CART</button>
        </div >
      </div >
    )
  }
}

export default Styles;