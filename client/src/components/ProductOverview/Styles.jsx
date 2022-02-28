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
      skuId: '',
      sizeStatus: '',
      mainPhotoURL: props.productStylesById.results[0].photos[0].url,
      subPhotos: props.productStylesById.results[0].photos,
      quantitySelected: 0,
      quantitySelectedBool: false,
      quantityArray: [],
      cart: []
    }
    this.photoClick = this.photoClick.bind(this);
    this.styleChange = this.styleChange.bind(this);
    this.skuChange = this.skuChange.bind(this);
    this.postCart = this.postCart.bind(this);
    this.getCart = this.getCart.bind(this);
    this.outfitClick = this.outfitClick.bind(this);
    this.quantityChange = this.quantityChange.bind(this);
    this.reviewsClick = this.reviewsClick.bind(this);
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
          subPhotos: selectedStyle.photos,
          currentSku: '',
          skuId: '',
          quantityArray: [],
          quantitySelectedBool: false,
          sizeStatus: ''
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
          skuId: skuKeys[i],
          sizeStatus: e.target.value,
          quantitySeletedBool: false
        });
      }
    }
  }


  postCart() {
    let skuId = this.state.skuId;
    $.ajax({
      context: this,
      type: 'POST',
      url: '/cart',
      data: JSON.stringify({ skuId }),
      contentType: 'application/json',
      success: function (successAjax) {
        console.log('postCart ajax POST Success!');
      },
      error: function (errorAjax) {
        console.log('postCart ajax POST Error!');
      },
    })
  }

  getCart() {
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

  outfitClick() {

  }

  reviewsClick() {
    console.log('read all reviews clicked!')
    // let anchor = RatingsReviews;
    // anchor.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // let navigate = useNavigate();
    // const routeChange = () => {
    //   let path = '../RatingsReviews/RatingsReviews.jsx';
    //   navigate(path);
    // }
  }

  quantityChange(e) {
    this.setState({
      quantitySelected: e.target.value,
      quantitySelectedBool: true
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
    let sizeStatus = this.state.sizeStatus;
    let quantitySelectedBool = this.state.quantitySelectedBool;
    if (currentSku.quantity > 0) {
      for (let i = 1; i <= currentSku.quantity; i++) {
        quantityArray.push(i);
      }
    }
    return (
      <div class="styles-container" id="Styles">
        <div class="styles-item styles-item-1" id="photos">
          <div class="styles-item-1-2">
            {subPhotos.map((photo) =>
              <img class="styles-item-1-2-1" id="subPhoto" src={photo.url} width="50" height="70" onClick={this.photoClick}></img>
            )}
          </div>
          <div class="styles-item-1-1">
            <img id="mainPhoto" src={mainPhotoURL} width="360" height="480"></img> <br></br>
          </div>
        </div>
        <div class="styles-item styles-item-2" id="styles">
          <div class="styles-item-2-1" id="rating">{rating} <span class="styles-item-2-2" id="readAllReviewsButton" onClick={this.reviewsClick}>Read all reviews</span></div>
          <div class="styles-item-2-3" id="category">{productById.category}</div>
          <div class="styles-item-2-4" id="name">{productById.name}</div>
          <div class="styles-item-2-5" id="price">{productById.default_price}</div>
          <div class="styles-item-2-6">Style> {currentStyle.name}</div>
          <div class="styles-item-2-7" id="style">
            {styles.map((style) =>
              <img class="styles-item-2-7-1" id="styleThumbnail" name={style.name} src={style.photos[0].url} width="50" height="50" onClick={this.styleChange}></img>
            )}
          </div>
          <div class="styles-item-2-container">
            <select class="styles-item-2-8" value={sizeStatus} id="size" onChange={this.skuChange} >
              <option value="nullSize">Select Size</option>
              {Object.keys(currentStyleSkus).map((sku) =>
                <option value={currentStyleSkus[sku].size} >{currentStyleSkus[sku].size}</option>
              )}
            </select>
            <select class="styles-item-2-9" id="quantity" onChange={this.quantityChange}>
              < option value="nullQuantity" >-</option>
              {quantityArray && quantityArray.map((quantityItem) =>
                <option value={quantityItem} >{quantityItem}</option>
              )}
            </select>
            {quantitySelectedBool ? <button class="styles-item-2-10" id="postCart" onClick={this.postCart}>ADD TO CART +</button> : <button class="styles-item-2-10" id="outOfStock" disabled>ADD TO CART +</button>}
            <button class="styles-item-2-11" id="favorite" onClick={this.outfitClick}>☆</button><button class="styles-item-2-12" id="getCart" onClick={this.getCart}>CART</button>
          </div>
        </div >
      </div >
    )
  }
}

export default Styles;