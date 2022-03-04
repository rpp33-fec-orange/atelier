import React from 'react';

const rowStyle = {
  // display: 'flex'
};

const columnStyle = {
  // flex: '33.33%',
  // padding: '5px',
  // border: '1px solid #555',
  // width: '150'
};

const addToOutfit = 'https://images.cdn1.stockunlimited.net/preview1300/plus-sign_1647891.jpg'

const AddtoOutfitCard = (props) => {

    return (
        <div className = "your-outfit-card">
          <img src = {addToOutfit} alt = "Sample Image" height = "150" width = '150' onClick = {(e) => {props.handleClick(e)}}/>
          <div className = "add-to-outfit-button" onClick = {(e) => {props.handleClick(e)}} height = "150" width = '150'></div>
        </div>
    )

}

export default AddtoOutfitCard;