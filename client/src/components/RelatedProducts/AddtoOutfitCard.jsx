import React from 'react';

const addToOutfit = 'https://www.pngall.com/wp-content/uploads/10/Plus-Symbol-Vector-PNG-Picture.png' || 'https://images.cdn1.stockunlimited.net/preview1300/plus-sign_1647891.jpg'

const AddtoOutfitCard = (props) => {

    return (
        <div className = "your-outfit-card">
          <img className = 'add-button-image' src = {addToOutfit} alt = "Sample Image" onClick = {(e) => {props.handleClick(e)}}/>
          <div className = 'add-button-text'>Add to Outfit</div>
        </div>
    )
}

export default AddtoOutfitCard;