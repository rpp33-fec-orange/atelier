import React from 'react';
import $ from 'jquery';
import Rating from './Rating.jsx';
import Photos from './Photos.jsx';

class Styles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productById: props.productById,
      rating: '★★★★☆',
      productStylesById: props.productStylesById,
      styles: props.productStylesById.results,
      styleSelectedId: ((0 + 1) * 10),
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
    this.styleChange = this.styleChange.bind(this);
    this.skuChange = this.skuChange.bind(this);
    this.postCart = this.postCart.bind(this);
    this.getCart = this.getCart.bind(this);
    this.outfitClick = this.outfitClick.bind(this);
    this.quantityChange = this.quantityChange.bind(this);
    this.reviewsClick = this.reviewsClick.bind(this);
    this.styleSelectedInitial = this.styleSelectedInitial.bind(this);
    this.showCart = this.showCart.bind(this);
  }

  styleSelectedInitial() {
    document.getElementById(this.state.styleSelectedId).classList.add('selected-style-border');
  }

  styleChange(e) {
    if (this.state.styleSelectedId !== e.target.id) {
      document.getElementById(this.state.styleSelectedId).classList.remove('selected-style-border');
      this.state.styleSelectedId = e.target.id;
      document.getElementById(e.target.id).classList.add('selected-style-border');
    }

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
        }, () => {
          this.props.currentStyleHandler(this.state.currentStyle);
        });
      }
    }
  }

  skuChange(e) {
    let skuKeys = Object.keys(this.state.currentStyleSkus);
    if (e.target.value === 'SELECT SIZE') {
      this.setState({
        currentSku: '',
        skuId: '',
        sizeStatus: '',
        quantitySelectedBool: false
      });
      alert('Please select a size.')
    } else {
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
        // console.log('postCart ajax POST Success!');
      },
      error: function (error) {
        console.log('postCart ajax POST error!', error);
      },
    })
    alert('Added item to cart.');
  }

  getCart() {
    $.ajax({
      context: this,
      type: 'GET',
      url: '/cart',
      success: function (success) {
        // console.log('getCart ajax GET success');
        this.setState({
          cart: success,
        }, () => {
          this.showCart();
        })
        console.log('CART', this.state.cart);
      },
      error: function (error) {
        console.log('getCart ajax GET error: ', error);
      },
      contentType: "application/json",
    })

  }

  showCart() {
    alert(JSON.stringify(this.state.cart));
  }

  outfitClick() {
    this.props.yourOutfitHandleClick();
  }

  reviewsClick() {
    window.scrollTo({
      top: 2000,
      left: 0,
      behavior: 'smooth'
    });
  }

  quantityChange(e) {
    if (e.target.value === '-') {
      this.setState({
        quantitySelected: 0,
        quantitySelectedBool: false
      });
      alert('Please select a quantity.')
    } else {
      this.setState({
        quantitySelected: e.target.value,
        quantitySelectedBool: true
      })
    }
  }

  componentDidMount() {
    this.props.currentStyleHandler(this.state.currentStyle);
    this.styleSelectedInitial();
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
      <div>
        <div class="styles-container" id="Styles">
          <div class="styles-item styles-item-1" id="photos">
            <Photos currentStyle={currentStyle} />
          </div>
          <div class="styles-item styles-item-2" id="styles">
            <div class="styles-item-2-1-container">
              <div class="styles-item-2-1">
                <Rating num={this.props.rating} />
                {/* {rating} */}
              </div>
              <div class="styles-item-2-2" id="read-all-reviews-button" onClick={this.reviewsClick}>Read all reviews</div>
            </div>
            <div class="styles-item-2-3" id="category">{productById.category}</div>
            <div class="styles-item-2-4" id="name">{productById.name}</div>
            <div class="styles-item-2-5" id="price">${productById.default_price}</div>
            <div class="styles-item-2-6-container">
              <div class="styles-item-2-6-1">Style></div>
              <div class="styles-item-2-6-2">{currentStyle.name}</div>
            </div>
            <div class="styles-item-2-7-container" id="style">
              {styles.map((style, index) =>
                <div class="styles-item-2-7-1">
                  <img class="style-thumbnail" id={(index + 1) * 10} name={style.name} src={style.photos[0].url} width="50" height="50" onClick={this.styleChange}></img>
                  <div class="styles-popup">{style.name}</div>
                </div>
              )}
            </div>
            <div class="styles-item-2-8-container">
              <select class="styles-item-2-8" value={sizeStatus} id="size-selector" onChange={this.skuChange} >
                <option class="styles-item-2-8-1" value="SELECT SIZE">SELECT SIZE</option>
                {Object.keys(currentStyleSkus).map((sku) =>
                  <option id="size-option" value={currentStyleSkus[sku].size} >{currentStyleSkus[sku].size}</option>
                )}
              </select>
              <select class="styles-item-2-9" id="quantity-selector" onChange={this.quantityChange}>
                < option value="-" >-</option>
                {quantityArray && quantityArray.map((quantityItem) =>
                  <option value={quantityItem} >{quantityItem}</option>
                )}
              </select>
              <button class="styles-item-2-12" id="getCart-button" onClick={this.getCart}>CART</button>
              {quantitySelectedBool ? <button class="styles-item-2-10" id="postCart-button" onClick={this.postCart}>ADD TO CART +</button> : <button class="styles-item-2-13" id="defaultCart-button" disabled>ADD TO CART +</button>}
              <button class="styles-item-2-11" id="save-outfit-button" onClick={this.outfitClick}>SAVE OUTFIT</button>
            </div>
          </div >
        </div >
      </div>
    )
  }
}

export default Styles;
