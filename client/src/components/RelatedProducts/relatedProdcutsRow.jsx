import React from 'react';
import {GoChevronLeft, GoChevronRight} from 'react-icons/go';
import images from './stockImages.jsx';
import RelatedProductCard from './ProductCard.jsx';
import $ from 'jquery';

const photoUnavailable = 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'

const rowStyle = {
  // display: 'flex'
};

const columnStyle = {
  // flex: '33.33%',
  // padding: '5px',
  // border: '1px solid #555',
  // width: '150'
};

class RelatedProductsRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0,
      currentPositionIndex: 0
    }
    this.scroll = this.scroll.bind(this);
  }

  scroll(direction) {
    let far = $( '.related-product-container' ).width()/4*direction;
    let pos = $('.related-product-container').scrollLeft() + far;
    $('.related-product-container').animate( { scrollLeft: pos }, 1000)
  }

  render () {
    const {relatedProductsIds, parentProduct, handleProductChange} = this.props;

    if (this.props.relatedProductsInfo === null) {
      return (
        <div id="loading">
          ⇆ Loading...
        </div>
       )
    } else {
      var DOMarray = this.props.relatedProductsInfo.map((relatedProduct) => {
        return (
            <RelatedProductCard parentProduct = {parentProduct} relatedProduct = {relatedProduct} currentPosition = {this.state.currentPosition} handleProductChange = {handleProductChange}/>
        );
      });

      return (
        <div className = "wrapper">
          <div className = 'related-product-container'>
            <a className ='prev' onClick = {this.scroll.bind(null, -1)}>&#10094;</a>
            {DOMarray}
            <a className ='next' onClick = {this.scroll.bind(null, 1)}>&#10095;</a>
          </div>
        </div>
      )
    }
  }
}

export default RelatedProductsRow;