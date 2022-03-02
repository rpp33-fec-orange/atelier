import React from 'react';
// import zoomIcon from './zoomIcon.png';

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStyle: props.currentStyle,
      mainPhotoURL: props.currentStyle.photos[0].url,
      subPhotos: props.currentStyle.photos,
      expand: false
    }
    this.photoClick = this.photoClick.bind(this);
    this.expandClick = this.expandClick.bind(this);
  }

  photoClick(e) {
    this.setState({
      mainPhotoURL: e.target.src
    })
  }

  expandClick(e) {
    if (!this.state.expand) {
      console.log('EXPANDED!')
      this.setState({
        expand: true
      })
    } else {
      console.log('COLLAPSED!')
      this.setState({
        expand: false
      })
    }
  }

  render() {
    let mainPhotoURL = this.state.mainPhotoURL;
    let subPhotos = this.state.subPhotos;
    if (!this.state.expand) {
      return (
        <div>
          <div class="styles-item-1-2">
            {subPhotos.map((photo) =>
              <img class="styles-item-1-2-1" id="subPhoto" src={photo.url} width="50" height="70" onClick={this.photoClick}></img>
            )}
          </div>
          <div class="styles-item-1-1">
            <img class="styles-item-1-1" id="mainPhoto" src={mainPhotoURL} width="360" height="480"></img>
            {/* <img id="zoom-icon" src={zoomIcon} width="20" height="20"></img> */}
            <div class="magnifying-glass" onClick={this.expandClick}>🔍</div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          HELLO WORLD!!!
          <div class="magnifying-glass" onClick={this.expandClick}>🔍</div>
        </div>
      )
    }

  }
}

export default Photos;