import React from 'react';

const Photos = (props) => (
  <div id="photos">
    <img id="mainPhoto" src={props.productStylesById.results[0].photos[0].url} width="150" height="200"></img>
    {props.productStylesById.results.map((singleData) =>
        <option value={singleData.name}>{singleData.name}</option>
      )}
  </div >
)

// class Photos extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       product: {}
//     }
//   }

//   render() {
//     return (
//       <div id="photos">
//         <img id="mainPhoto" src="https://cdn.shopify.com/s/files/1/0286/4077/2235/products/Knit-polo-sweater-The-Korean-Fashion_61ba38bf-7198-4f52-bca3-8b7ee082e567_1800x1800.jpg?v=1639580510" width="300" height="300"></img>
//       </div >
//     )
//   }
// }

export default Photos;