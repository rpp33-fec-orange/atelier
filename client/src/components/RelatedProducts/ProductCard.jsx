import React from 'react';
import axios from 'axios';
import { RiInformationLine } from 'react-icons/ri';

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

    }

    this.handleProductClick = this.handleProductClick.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);

  }

  handleProductClick() {

  }

  handleModalClick() {

  }

  render() {

    const  { product } = this.props;
    console.log('product', product)

    return (
      <div className = "col-md-2" style = {columnStyle}  align = 'center'>
        <div className="related-product-card">
          <div className="related-modal-star" onClick={this.handleModalClick} role="link" tabIndex={0} align = 'right'>
          <RiInformationLine />
          </div>
          <img className = 'related-product-image' src = {product.photos[0].url || photoUnavailable} alt = {product.name} height = "150" width = '150'/>
          <div className = "related-modal-star" onClick={this.handleModalClick}>
            <div className = 'related-product-category'>{product.category}</div>
            <div className = 'related-product-product-name'>{product.name}</div>
            <div className = 'related-product-product-price'>${product.default_price}</div>
          </div>
          <div className = 'related-product-product-rating'>★★★★☆</div>
        </div>
      </div>
    )
  }

}

export default RelatedProductCard;