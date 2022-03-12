import React from 'react';
import images from './StockImages.jsx';
import AddtoOutfitCard from './AddtoOutfitCard.jsx'
import YourOutfitCard from './YourOutfitCard.jsx'

class YourOutfitRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      yourOutfit: [],
      prevDisable: true,
      nextDisable: this.refs && this.refs.offsetWidth >= this.refs.scrollWidth ? true : false
    }
    this.handleAddOutfit = this.handleAddOutfit.bind(this);
    this.handleDeleteOutfit = this.handleDeleteOutfit.bind(this);
    this.checkButtons = this.checkButtons.bind(this);
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

  componentDidMount() {
    this.checkButtons(this.refs.offsetWidth, this.refs.scrollWidth);
  }

  checkButtons = (offsetWidthValue, scrollWidthValue) => {
    this.setState({
     prevDisable: this.refs.scrollLeft <= 0 ? true : false,
     nextDisable:
     this.refs.scrollLeft + offsetWidthValue >= scrollWidthValue ? true : false
    });
   };

  render() {

    const offsetWidthValue = this.refs.offsetWidth,
    scrollWidthValue = this.refs.scrollWidth;

    var DOMarray = '';
    if (this.props.yourOutfitArray.length > 0) {
      DOMarray = this.props.yourOutfitArray.map((product) => {
        return (
          <YourOutfitCard product = {product} handleDelete = {this.handleDeleteOutfit}/>
        )
      })
    }

    return (
        <div className = "your-outfit-container" ref = {(el) => {this.refs  = el;}}>
          <div className = 'addOutfit-card'>
            <AddtoOutfitCard handleClick = {this.handleAddOutfit}/>
          </div>
          <div className={`btn addOutfit prev ${this.state.prevDisable ? "disable" : ""}`} disabled={this.state.prevDisable}
            onClick={() => {
              this.refs.scrollLeft -= offsetWidthValue / 2;
              this.checkButtons(offsetWidthValue, scrollWidthValue);
            }}>&#10094;
          </div>
          <div className = 'outfit-only-container'>
          {DOMarray}
          </div>
          <div className={`btn addOutfit next ${this.state.nextDisable ? "disable" : ""}`} disabled={this.state.nextDisable}
            onClick={() => {
              this.refs.scrollLeft += offsetWidthValue / 2;
              this.checkButtons(offsetWidthValue, scrollWidthValue);
            }}>&#10095;
          </div>
        </div>
    )
  }
}

export default YourOutfitRow;
