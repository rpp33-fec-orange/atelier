import React from 'react';
import axios from 'axios';
import { RiInformationLine } from 'react-icons/ri';
import RelatedProductModal from './RelatedProductModal.jsx';

const rowStyle = {
  // display: 'flex'
};

const columnStyle = {
  // flex: '33.33%',
  // padding: '5px',
  // border: '1px solid #555',
  // width: '150'
};

const photoUnavailable = 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'

class RelatedProductCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
    this.showModal = this.showModal.bind(this);
  }

  showModal(e) {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render() {
    const  { parentProduct, relatedProduct, currentPosition, handleProductChange } = this.props;
    // console.log('relatedProduct', relatedProduct)
    // console.log('parentProduct', parentProduct)
    return (
        <div className = "related-product-card" /*style = {columnStyle}*/ onClick = {() => {handleProductChange(relatedProduct.id)}}>
          {/* <div className="related-product-card" align = 'right' > */}
            <RiInformationLine className = 'toggle-button' onClick = {(e) => {this.showModal(e)}} align = 'right'/>
            <RelatedProductModal parentProduct = {parentProduct} relatedProduct = {relatedProduct} onClose = {this.showModal} show = {this.state.showModal}/>
            {/* </div> */}
            <img className = 'related-product-image' src = {relatedProduct.photos[0].url || photoUnavailable} alt = {relatedProduct.name} height = "150" width = '150'/>
            <div className = 'related-product-category'>{relatedProduct.category}</div>
            <div className = 'related-product-name'>{relatedProduct.name}</div>
            <div className = 'related-product-price'>${relatedProduct.default_price}</div>
            <div className = 'related-product-rating'>★★★★☆</div>
        </div>
    )
  }

}

export default RelatedProductCard;