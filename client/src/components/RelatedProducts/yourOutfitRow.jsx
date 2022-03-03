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
    this.handleAddOutfit = this.handleAddOutfit.bind(this);
    this.handleDeleteOutfit = this.handleDeleteOutfit.bind(this);
  }

  handleAddOutfit () {
    this.props.yourOutfitHandleClick();
    console.log('add outfit button was clicked. state updated in App.jsx')
    var yourOutfitArray = this.props.yourOutfitArray;
    console.log('outfit array props recevied at component ')
    this.setState({
      yourOutfit: yourOutfitArray
    }, () => {
      console.log('state updated in outfit component')
    })
  }

  handleDeleteOutfit(styleId) {

    var yourOutfitArray = this.state.yourOutfit;

    var deleteOutfitAtIndex = yourOutfitArray.findIndex(element => element.style_id === styleId);

    yourOutfitArray.splice(deleteOutfitAtIndex, 1);

    this.setState({
      yourOutfit: yourOutfitArray
    })

  }

  render() {

    const {yourOutfit} = this.state;
    var DOMarray = '';
    if (yourOutfit.length > 0) {
      DOMarray = yourOutfit.map((product) => {
        return (
          <YourOutfitCard product = {product} handleDelete = {this.handleDeleteOutfit}/>
        )
      })
    }

    return (
      <div className = " your-outfit-row" style = {rowStyle} align = 'left'>
        <AddtoOutfitCard handleClick = {this.handleAddOutfit}/>
        {DOMarray}
      </div>
    )
  }
}

export default YourOutfitRow;