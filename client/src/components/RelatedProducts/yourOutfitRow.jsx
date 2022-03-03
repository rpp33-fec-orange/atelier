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
    const yourOutfitArray = this.props.yourOutfitArray;
    this.setState({
      yourOutfit: yourOutfitArray
    })
  }

  handleDeleteOutfit(styleId) {
    console.log('styleId', styleId)
    var updatedOutfitArray;
    const yourOutfitArray = JSON.parse(JSON.stringify(this.state.yourOutfit));

    console.log('before', yourOutfitArray)

    for (var i = 0; i< yourOutfitArray.length; i++) {
      if (yourOutfitArray[i].style_id === styleId) {
        console.log('before', yourOutfitArray)
        console.log('id match', yourOutfitArray[i].style_id)
        updatedOutfitArray = yourOutfitArray.slice(i, 1)
        console.log('after', updatedOutfitArray)
      }
    }

    this.setState({
      yourOutfit: updatedOutfitArray
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