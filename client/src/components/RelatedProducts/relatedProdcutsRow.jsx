import React from 'react';
import {GoChevronLeft, GoChevronRight} from 'react-icons/go';
import images from './stockImages.jsx';
import RelatedProductCard from './ProductCard.jsx';

const photoUnavailable = 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'

const rowStyle = {
  display: 'flex'
};

const columnStyle = {
  flex: '33.33%',
  padding: '5px',
  border: '1px solid #555',
  width: '150'
};

class RelatedProductsRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0,
      currentPositionIndex: 0
    }

    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);

  }

  moveLeft() {

    const {currentPosition, currentPositionIndex} = this.state;

    const newPosition = currentPosition - 162;
    const nextPositionIndex = currentPositionIndex - 1;

    this.setState({
      currentPosition: newPosition,
      currentPositionIndex: nextPositionIndex
    });

  }

  moveRight() {

    const {currentPosition, currentPositionIndex} = this.state;

    const newPosition = currentPosition + 162;
    const nextPositionIndex = currentPositionIndex + 1;

    this.setState({
      currentPosition: newPosition,
      currentPositionIndex: nextPositionIndex
    });

  // handleModalClick(e) {

  //   this.setState({
  //     showModal: true
  //   })
  // }

  }



  render () {

    const {relatedProductsIds, parentProduct} = this.props;
    const {currentPosition, currentPositionIndex} = this.state;
    const moveLeftArrow = null;
    const moveRightArrow = null;

    if (currentPosition < 0) {

      console.log('left arrow', currentPosition)
      moveLeftArrow = (
        <div className = 'related-products-left-arrow' onClick = {this.moveLeft}>
          <GoChevronLeft className="related-arrow-icon" />
        </div>
      )
    }

    if (relatedProductsIds.length > 4 && currentPositionIndex < (relatedProductsIds.length - 4)) {
      console.log('right arrow', currentPosition)
      moveRightArrow = (
        <div className = 'related-products-right-arrow' onClick = {this.moveRight}>
          <GoChevronLeft className="related-arrow-icon" />
        </div>
      )
    }

    if (this.props.relatedProductsInfo === null) {
      return (
        <div id="loading">
          ⇆ Loading...
        </div>
       )
    } else {
      var DOMarray = this.props.relatedProductsInfo.map((relatedProduct) => {
        return (
            <RelatedProductCard parentProduct = {parentProduct} relatedProduct = {relatedProduct} currentPosition = {this.state.currentPosition}/>
        );
      });

      return (
        <div className = " related-products-row" style = {rowStyle}>
          {moveLeftArrow}
          {DOMarray}
          {moveRightArrow}
        </div>
      )
    }

  }
}

export default RelatedProductsRow;