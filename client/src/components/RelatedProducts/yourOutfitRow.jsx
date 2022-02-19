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


  //   <div className = " related-products-row" style = {rowStyle}>
  //     <div className = "col-md-2" style = {columnStyle}>
  //       <img src = {images.yourOutfitImages[0]} alt = "Sample Image" height = "150" />
  //       <div id = 'category'>Men's Clothing</div>
  //       <div id = 'product-description'>Sweatshirt</div>
  //       <div id = 'price'>$19.99</div>
  //       <div id = 'rating'>★★★★☆</div>
  //     </div>
  //     <div className = "col-md-2" style = {columnStyle}>
  //       <img src = {images.yourOutfitImages[1]} alt = "Sample Image" height = "150" />
  //       <div id = 'category'>Men's Clothing</div>
  //       <div id = 'product-description'>Grey T-shirt</div>
  //       <div id = 'price'>$25.99</div>
  //       <div id = 'rating'>★★★★☆</div>
  //     </div>
  //     <div className = "col-md-2" style = {columnStyle}>
  //       <img src = {images.yourOutfitImages[2]} alt = "Sample Image" height = "150" />
  //       <div id = 'category'>Men's Clothing</div>
  //       <div id = 'product-description'>Black T-shirt</div>
  //       <div id = 'price'>$22.99</div>
  //       <div id = 'rating'>★★★★☆</div>
  //     </div>
  //     <div className = "col-md-2" style = {columnStyle}>
  //       <img src = {images.yourOutfitImages[3]} alt = "Sample Image" height = "150" />
  //       <div id = 'category'>Men's Clothing</div>
  //       <div id = 'product-description'>Green T-shirt</div>
  //       <div id = 'price'>$30.99</div>
  //       <div id = 'rating'>★★★★☆</div>
  //     </div>
  //   </div>
  // )


}

export default YourOutfitRow;