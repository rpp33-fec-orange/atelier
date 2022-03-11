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
    this.handleclick = this.handleclick.bind(this);
  }

  showModal(e) {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleclick(newProductId) {
    this.props.handleProductChange(newProductId);
  }



  render() {
    const  { parentProduct, relatedProduct, currentPosition, handleProductChange } = this.props;

    if (this.props.initialized) {
      return (
        <div className = "related-product-card">
            <AiOutlineStar className = 'toggle-button' onClick = {(e) => {this.showModal()}}/>
            <RelatedProductModal parentProduct = {parentProduct} relatedProduct = {relatedProduct} onClose = {this.showModal} show = {this.state.showModal} initialized = {this.props.initialized}/>
            <img className = 'related-product-image' src = {relatedProduct.photos[0].url || photoUnavailable} alt = {relatedProduct.name} onClick = {() => {this.handleclick(relatedProduct.id)}}/>
            <div className = 'related-product-category'>{relatedProduct.category}</div>
            <div className = 'related-product-name'>{relatedProduct.name}</div>
            <div className = 'related-product-price'>${relatedProduct.default_price}</div>
            <div className = 'related-product-rating'>
              <StarRating num = {relatedProduct.num_Rating}/>
            </div>
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

export default RelatedProductCard;





// import React from 'react';
// import axios from 'axios';
// import { RiInformationLine } from 'react-icons/ri';
// import {AiOutlineStar} from 'react-icons/ai'
// import RelatedProductModal from './RelatedProductModal.jsx';
// import StarRating from './Ratings.jsx';

// const photoUnavailable = 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'

// class RelatedProductCard extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showModal: false,
//       prevDisable: true,
//       nextDisable: this.refs && this.refs.offsetWidth >= this.refs.scrollWidth ? true : false
//     }
//     this.showModal = this.showModal.bind(this);
//     this.handleclick = this.handleclick.bind(this);
//     this.checkButtons = this.checkButtons.bind(this);
//   }

//   showModal(e) {
//     this.setState({
//       showModal: !this.state.showModal
//     })
//   }

//   handleclick(newProductId) {
//     this.props.handleProductChange(newProductId);
//   }

//   componentDidMount() {
//     this.checkButtons(this.refs.offsetWidth, this.refs.scrollWidth);
//   }

//   checkButtons = (offsetWidthValue, scrollWidthValue) => {
//     this.setState({
//      prevDisable: this.refs.scrollLeft <= 0 ? true : false,
//      nextDisable:
//      this.refs.scrollLeft + offsetWidthValue >= scrollWidthValue ? true : false
//     });
//    };

//   render() {
//     const  { parentProduct, relatedProduct, currentPosition, handleProductChange } = this.props;
//     const offsetWidthValue = this.refs.offsetWidth,
//           scrollWidthValue = this.refs.scrollWidth;

//     if (this.props.initialized) {
//       return (
//         <div className = 'products-only-container' ref = {(el) => {this.refs  = el; console.log('el', el);}}>
//         <div className={`${this.state.prevDisable ? "disable" : ""}`} disabled={this.state.prevDisable}
//         onClick={() => {
//           this.refs.scrollLeft -= offsetWidthValue / 2;
//           this.checkButtons(offsetWidthValue, scrollWidthValue);
//         }}>&#10094;</div>
//         <div className = "related-product-card">
//             <AiOutlineStar className = 'toggle-button' onClick = {(e) => {this.showModal()}}/>
//             <RelatedProductModal parentProduct = {parentProduct} relatedProduct = {relatedProduct} onClose = {this.showModal} show = {this.state.showModal} initialized = {this.props.initialized}/>
//             <img className = 'related-product-image' src = {relatedProduct.photos[0].url || photoUnavailable} alt = {relatedProduct.name} onClick = {() => {this.handleclick(relatedProduct.id)}}/>
//             <div className = 'related-product-category'>{relatedProduct.category}</div>
//             <div className = 'related-product-name'>{relatedProduct.name}</div>
//             <div className = 'related-product-price'>${relatedProduct.default_price}</div>
//             <div className = 'related-product-rating'>
//               <StarRating num = {relatedProduct.num_Rating}/>
//             </div>
//         </div>
//         <div className={`btn next ${this.state.nextDisable ? "disable" : ""}`} disabled={this.state.nextDisable}
//         onClick={() => {
//           this.refs.scrollLeft += offsetWidthValue / 2;
//           this.checkButtons(offsetWidthValue, scrollWidthValue);
//         }}>&#10095;</div>
//         </div>
//       )
//     } else {
//       return (
//         <div id="loading">
//           ⇆ Loading...
//         </div>
//        )
//     }
//   }

// }

// export default RelatedProductCard;