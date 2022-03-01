import React from 'react';

const rowStyle = {
  display: 'flex'
};

const columnStyle = {
  flex: '33.33%',
  padding: '5px',
  border: '1px solid #555',
  width: '150'
};

const addToOutfit = '+'

const AddtoOutfitCard = (props) => {

    return (
      <div className = " your-outfit-row" style = {rowStyle} align = 'center'>
        <div className = "col-md-2" style = {columnStyle}>
          {/* <img src = {addSign} alt = "Sample Image" height = "150" width = '150' onClick = {(e) => {props.handleClick(e)}}/> */}
          <div className = "add-to-outfit-button" style = {columnStyle} onClick = {(e) => {props.handleClick(e)}} height = "150" width = '150'>{addToOutfit}</div>
        </div>
    </div>
    )

}

export default AddtoOutfitCard;