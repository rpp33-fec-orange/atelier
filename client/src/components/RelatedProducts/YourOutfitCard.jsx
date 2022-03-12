import React from 'react';
import { RiInformationLine } from 'react-icons/ri';
import StarRating from './Ratings.jsx';
import { AiOutlineCloseCircle } from 'react-icons/ai'

const photoUnavailable = 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'

class YourOutfitCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const  { product, handleDelete} = this.props;
    return (
      <div className = "your-outfit-card">
        <AiOutlineCloseCircle className = 'toggle-button' onClick = {() => {this.props.handleDelete()}}/>
        <img className = 'your-outfit-image' src = {product.photos[0].url || photoUnavailable} alt = {product.name}/>
        <div className = 'your-outfit-category'>{product.category}</div>
        <div className = 'your-outfit-name'>{product.name}</div>
        <div className = 'your-outfit-price'>${product.original_price}</div>
        <div className = 'your-outfit-rating'>
          <StarRating num = {product.num_Rating}/>
        </div>
      </div>
    )
  }

}

export default YourOutfitCard;