import React from 'react';
import images from './StockImages.jsx';
import AddtoOutfitCard from './AddtoOutfitCard.jsx'
import YourOutfitCard from './YourOutfitCard.jsx'

class YourOutfitRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      yourOutfit: []
    }
    this.handleAddOutfit = this.handleAddOutfit.bind(this);
    this.handleDeleteOutfit = this.handleDeleteOutfit.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  handleAddOutfit () {
    this.props.yourOutfitHandleClick();
    var yourOutfitArray = this.props.yourOutfitArray;
    this.setState({
      yourOutfit: yourOutfitArray
    }, () => {
      console.log('state updated in outfit component')
    })
  }

  handleDeleteOutfit(styleId) {
    var currentOutfitArray = this.state.yourOutfit;
    var deleteOutfitAtIndex = currentOutfitArray.findIndex(element => element.style_id === styleId);
    currentOutfitArray.splice(deleteOutfitAtIndex, 1);
    this.setState({
      yourOutfit: currentOutfitArray
    });
  }

  scroll(direction) {
    let far = $( '.related-product-container' ).width()/4*direction;
    let pos = $('.related-product-container').scrollLeft() + far;
    $('.related-product-container').animate( { scrollLeft: pos }, 1000)
  }

  render() {
    var DOMarray = '';
    if (this.props.yourOutfitArray.length > 0) {
      DOMarray = this.props.yourOutfitArray.map((product) => {
        return (
          <YourOutfitCard product = {product} handleDelete = {this.handleDeleteOutfit}/>
        )
      })
    }

    return (
      <div className = "your-outfit-container">
        <a className ='prev' onClick = {this.scroll.bind(null, -1)}>&#10094;</a>
        <div className = 'outfit-only-container'>
          <AddtoOutfitCard handleClick = {this.handleAddOutfit}/>
          {DOMarray}
        </div>
        <a className ='next' onClick = {this.scroll.bind(null, 1)}>&#10095;</a>
      </div>
    )
  }
}

export default YourOutfitRow;
