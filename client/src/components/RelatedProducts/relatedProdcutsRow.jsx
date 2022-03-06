import React from 'react';
import {GoChevronLeft, GoChevronRight} from 'react-icons/go';
import images from './stockImages.jsx';
import RelatedProductCard from './ProductCard.jsx';
import $ from 'jquery';
import setRatingSummary from './HelperFunctions.js'

const photoUnavailable = 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'

class RelatedProductsRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0,
      currentPositionIndex: 0
    }
    this.scroll = this.scroll.bind(this);
    this.relatedProductsRatingSummary = this.relatedProductsRatingSummary.bind(this)
  }

  scroll(direction) {
    let far = $( '.related-product-container' ).width()/4*direction;
    let pos = $('.related-product-container').scrollLeft() + far;
    $('.related-product-container').animate( { scrollLeft: pos }, 1000)
  }

  relatedProductsRatingSummary (relatedProducts) {
    for (var i = 0; i < relatedProducts.length; i++) {
      var num_Rating = setRatingSummary(relatedProducts[i].meta_ratings);
      relatedProducts[i]['num_Rating'] = num_Rating[0];
    }
    return relatedProducts;
  }

  render () {

    const {relatedProductsIds, parentProduct, handleProductChange, relatedProductsInfo, handleStateChange} = this.props;

    var relatedProductsWithRatings = this.relatedProductsRatingSummary(relatedProductsInfo);

    if (this.props.relatedProductsInfo === null) {
      return (
        <div id="loading">
          ⇆ Loading...
        </div>
       )
    } else {
      var DOMarray = relatedProductsWithRatings.map((relatedProduct) => {
        return (
            <RelatedProductCard parentProduct = {parentProduct} relatedProduct = {relatedProduct} currentPosition = {this.state.currentPosition} handleProductChange = {handleProductChange} handleStateChange = {handleStateChange}/>
        );
      });

      return (
        <div className = 'related-products-container'>
          <a className ='prev' onClick = {this.scroll.bind(null, -1)}>&#10094;</a>
          <div className = 'products-only-container'>
            {DOMarray}
          </div>
          <a className ='next' onClick = {this.scroll.bind(null, 1)}>&#10095;</a>
        </div>
      )
    }
  }
}

export default RelatedProductsRow;