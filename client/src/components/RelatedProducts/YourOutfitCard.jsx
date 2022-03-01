import React from 'react';
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

class YourOutfitCard extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      showModal: false
    }

    // this.handleProductClick = this.handleProductClick.bind(this);
    // this.handleModalClick = this.handleModalClick.bind(this);

  }

  render() {

    const  { product } = this.props;

    // console.log('product', product)

    return (
      <div className = "col-md-2" style = {columnStyle}>
        {/* <div className="your-outfit-card" align = 'right'> */}
          <img className = 'your-outfit-image' src = {product.photos[0].url || photoUnavailable} alt = {product.name} height = "150" width = '150'/>
          {/* <div className = 'your-outfit-star' onClick={this.handleModalClick}></div> */}
          {/* <div className = 'your-outfit-category'>{product.category}</div> */}
          <div className = 'your-outfit-name'>{product.name}</div>
          <div className = 'your-outfit-price'>${product.original_price}</div>
        {/* </div> */}
        <div className = 'your-outfit-rating'>★★★★☆</div>
      </div>
    )
  }

}

export default YourOutfitCard;