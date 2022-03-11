import React from 'react';
import {GoChevronLeft, GoChevronRight} from 'react-icons/go';
import images from './StockImages.jsx';
import RelatedProductCard from './ProductCard.jsx';
import $ from 'jquery';
import setRatingSummary from './HelperFunctions.js'

const photoUnavailable = 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'

class RelatedProductsRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      prevDisable: true,
      nextDisable: this.refs && this.refs.offsetWidth >= this.refs.scrollWidth ? true : false
     }
    // this.scroll = this.scroll.bind(this);
    this.relatedProductsRatingSummary = this.relatedProductsRatingSummary.bind(this);
    this.checkButtons = this.checkButtons.bind(this);
  }

  componentDidMount() {
    this.checkButtons(this.refs.offsetWidth, this.refs.scrollWidth);
  }

  checkButtons = (offsetWidthValue, scrollWidthValue) => {
    this.setState({
     prevDisable: this.refs.scrollLeft <= 0 ? true : false,
     nextDisable:
     this.refs.scrollLeft + offsetWidthValue >= scrollWidthValue ? true : false
    });
   };

  relatedProductsRatingSummary (relatedProducts) {
    for (var i = 0; i < relatedProducts.length; i++) {
      var num_Rating = setRatingSummary(relatedProducts[i].meta_ratings);
      relatedProducts[i]['num_Rating'] = num_Rating[0];
    }
    return relatedProducts;
  }

  render () {

    const {relatedProductsIds, parentProduct, handleProductChange, relatedProductsInfo, handleStateChange} = this.props;
    const offsetWidthValue = this.refs.offsetWidth,
          scrollWidthValue = this.refs.scrollWidth;

    var relatedProductsWithRatings = this.relatedProductsRatingSummary(relatedProductsInfo);

    if (this.props.initialized) {
      var DOMarray = relatedProductsWithRatings.map((relatedProduct) => {
        return (
            <RelatedProductCard parentProduct = {parentProduct} relatedProduct = {relatedProduct} currentPosition = {this.state.currentPosition} handleProductChange = {handleProductChange} handleStateChange = {handleStateChange} initialized = {this.props.initialized}/>
        );
      });
      return (
        <div className = 'related-products-container' ref = {(el) => {this.refs  = el; console.log('el', el);}}>
                <div className={`btn prev ${this.state.prevDisable ? "disable" : ""}`} disabled={this.state.prevDisable}
        onClick={() => {
          this.refs.scrollLeft -= offsetWidthValue / 2;
          this.checkButtons(offsetWidthValue, scrollWidthValue);
        }}>{'<'}</div>
          <div className = 'products-only-container' >
            {DOMarray}
          </div>
          <div className={`btn next ${this.state.nextDisable ? "disable" : ""}`} disabled={this.state.nextDisable}
            onClick={() => {
              this.refs.scrollLeft += offsetWidthValue / 2;
              this.checkButtons(offsetWidthValue, scrollWidthValue);
            }}>{'>'}</div>
        </div>
      )
    } else {
      return (
        <div id="loading">
          ⇆ Loading...
        </div>
       )
    }
  }
}

export default RelatedProductsRow;