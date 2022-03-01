import React from 'react';
import axios from 'axios';
import { RiInformationLine } from 'react-icons/ri';
import RelatedProductModal from './RelatedProductModal.jsx';

const rowStyle = {
  display: 'flex'
};

const columnStyle = {
  flex: '33.33%',
  padding: '5px',
  border: '1px solid #555',
  width: '150'
};

const photoUnavailable = 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'

class RelatedProductCard extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      showModal: false
    }

    // this.handleProductClick = this.handleProductClick.bind(this);
    // this.handleModalClick = this.handleModalClick.bind(this);

  }

  // style={{ transform: `translateX(${currentPosition}px)` }}

  showModal(e) {

    this.setState({
      showModal: !this.state.showModal
    })

  }

  render() {

    const  { parentProduct, relatedProduct, currentPosition } = this.props;

    // console.log('product', product)

    return (
      <div className = "col-md-2" style = {columnStyle}>
        <div className="related-product-card" align = 'right'>
          <button className = 'toggle-button' onClick = {(e) => {this.showModal(e)}} align = 'right'></button>
          <RelatedProductModal parentProduct = {parentProduct} relatedProduct = {relatedProduct} onClose = {this.showModal} show = {this.state.showModal}/>
          {/* <RiInformationLine /> */}
          </div>
          <img className = 'related-product-image' src = {relatedProduct.photos[0].url || photoUnavailable} alt = {relatedProduct.name} height = "150" width = '150'/>
          <div className = "related-modal-star" onClick={this.handleModalClick}></div>
            <div className = 'related-product-category'>{relatedProduct.category}</div>
            <div className = 'related-product-product-name'>{relatedProduct.name}</div>
            <div className = 'related-product-product-price'>${relatedProduct.default_price}</div>
            <div className = 'related-product-product-rating'>★★★★☆</div>
        </div>
    )
  }

}

export default RelatedProductCard;