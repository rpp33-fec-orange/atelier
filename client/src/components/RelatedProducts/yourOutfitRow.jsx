import React from 'react';
import images from './stockImages.jsx';

const rowStyle = {
  display: 'flex'
};

const columnStyle = {
  flex: '33.33%',
  padding: '5px',
  border: '1px solid #555'
};



const YourOutfitRow = () => {
  return (

    <div className = " related-products-row" style = {rowStyle} align = 'center'>
      <div className = "col-md-2" style = {columnStyle}>
        <img src = 'https://www.freeiconspng.com/thumbs/plus-icon/plus-icon-black-2.png' alt = "Sample Image" height = "150" width = '150'/>
      </div>
      <div className = "col-md-2" style = {columnStyle}>
      </div>
      <div className = "col-md-2" style = {columnStyle}>
      </div>
      <div className = "col-md-2" style = {columnStyle}>
      </div>
    </div>
  )
}

export default YourOutfitRow;