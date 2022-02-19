import React from 'react';

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.productStylesById
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    this.setState({
      main: '',    //main updated with the photo clicked
      others: ''   //all photos besides the one clicked
    })
  }

  render() {
    return (
      <div id="photos">
        <img id="mainPhoto" src={this.state.product.results[0].photos[0].url} width="175" height="250"></img> <br></br>
        {this.state.product.results[0].photos.map((photo) =>
          <img id="subPhoto" src={photo.url} width="75" height="100"></img>
        )}
      </div >
    )
  }
}

export default Photos;

// const Photos = (props) => (
//   <div id="photos">
//     <img id="mainPhoto" src={props.productStylesById.results[0].photos[0].url} width="150" height="200"></img>

//   </div >
// )