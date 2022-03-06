import React from 'react';
import axios from 'axios';
import { RiInformationLine } from 'react-icons/ri';
import {AiOutlineStar} from 'react-icons/ai'
import RelatedProductModal from './RelatedProductModal.jsx';
import StarRating from './Ratings.jsx';

const photoUnavailable = 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'

class RelatedProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
    this.showModal = this.showModal.bind(this);
    // this.handleclick = this.handleclick.bind(this);
  }

  showModal(e) {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  // handleclick(newProductId) {
  //   console.log('all props in card', this.props)
  //   this.props.handleStateChange(newProductId);
  // }



  render() {
    const  { parentProduct, relatedProduct, currentPosition, handleProductChange } = this.props;
    // console.log('relatedProduct', relatedProduct)
    // console.log('parentProduct', parentProduct)
    return (
        <div className = "related-product-card" onClick = {() => {this.handleProductChange(relatedProduct.id)}}>
            <AiOutlineStar className = 'toggle-button' onClick = {(e) => {this.showModal()}}/>
            <RelatedProductModal parentProduct = {parentProduct} relatedProduct = {relatedProduct} onClose = {this.showModal} show = {this.state.showModal}/>
            <img className = 'related-product-image' src = {relatedProduct.photos[0].url || photoUnavailable} alt = {relatedProduct.name}/>
            <div className = 'related-product-category'>{relatedProduct.category}</div>
            <div className = 'related-product-name'>{relatedProduct.name}</div>
            <div className = 'related-product-price'>${relatedProduct.default_price}</div>
            <div className = 'related-product-rating'>
              <StarRating num = {relatedProduct.num_Rating}/>
            </div>
        </div>
    )
  }

}

export default RelatedProductCard;