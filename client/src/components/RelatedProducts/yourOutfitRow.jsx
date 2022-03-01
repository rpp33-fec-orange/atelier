import React from 'react';
import images from './stockImages.jsx';
import AddtoOutfitCard from './AddtoOutfitCard.jsx'
import YourOutfitCard from './YourOutfitCard.jsx'

const rowStyle = {
  display: 'flex'
};

const columnStyle = {
  flex: '33.33%',
  padding: '5px',
  border: '1px solid #555'
};



class YourOutfitRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      yourOutfit: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {

    this.props.yourOutfitHandleClick();

    var yourOutfitArray = this.props.yourOutfitArray;

    this.setState({
      yourOutfit: yourOutfitArray
    })

    // console.log('currentStyle', this.props.currentStyle)
    // // alert('success');

    // var currentStyle =  this.props.currentStyle;

    // if (currentStyle) {

    //   var currentStyleId = currentStyle.style_id;
    //   var yourOutfitArray = this.state.yourOutfit;

    //   if (this.state.yourOutfit.length !== 0) {
    //     for (var i = 0; i < yourOutfitArray.length; i++) {
    //       if (yourOutfitArray[i].style_id === currentStyleId) {
    //         break;
    //       } else {
    //         yourOutfitArray.push(currentStyle);
    //       }
    //     }
    //   } else {
    //     yourOutfitArray.push(currentStyle);
    //   }

    //   this.setState({
    //     yourOutfit: yourOutfitArray
    //   }, () => {
    //     console.log('array updated', this.state.yourOutfit)
    //   })

    // }
  }

  render() {

    const {yourOutfit} = this.state;

    var DOMarray = '';


    if (yourOutfit.length > 0) {
      DOMarray = yourOutfit.map((product) => {
        return (
          <YourOutfitCard product = {product}/>
        )
      })
    }

    return (
      <div>
        <AddtoOutfitCard handleClick = {this.handleClick}/>
        {DOMarray}
      </div>
    )

  }
}

export default YourOutfitRow;