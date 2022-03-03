import React from 'react';
// import zoomIcon from './zoomIcon.png';

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStyle: props.currentStyle,
      mainPhotoArray: props.currentStyle.photos,
      mainPhotoIndex: 0,
      mainPhotoURL: props.currentStyle.photos[0].url,
      subPhotos: props.currentStyle.photos,
      expanded: false,
      arrayLeftEnd: false,
      arrayRightEnd: false
    }
    this.photoClick = this.photoClick.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.expandClick = this.expandClick.bind(this);
  }

  photoClick(e) {
    this.setState({
      mainPhotoURL: e.target.src
    })
  }

  leftClick() {
    let newIndex = this.state.mainPhotoIndex - 1;
    if (newIndex > -1) {
      this.setState({
        arrayLeftEnd: false,
        mainPhotoIndex: newIndex
      });
    } else {
      this.setState({
        arrayLeftEnd: true,
      });
    }
    console.log('left, index', this.state.mainPhotoIndex)
  }

  rightClick() {
    let newIndex = this.state.mainPhotoIndex + 1;
    if (newIndex < this.state.mainPhotoArray.length) {
      this.setState({
        arrayRightEnd: false,
        mainPhotoIndex: newIndex
      });
    } else {
      this.setState({
        arrayRightEnd: true
      });
    }
    console.log('right, index', this.state.mainPhotoIndex);
  }

  expandClick(e) {
    if (!this.state.expanded) {
      this.setState({
        expanded: true
      })
    } else {
      this.setState({
        expanded: false
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentStyle !== prevProps.currentStyle) {
      this.setState({
        currentStyle: this.props.currentStyle,
        mainPhotoURL: this.props.currentStyle.photos[0].url,
        subPhotos: this.props.currentStyle.photos,
        mainPhotoArray: this.props.currentStyle.photos
      })
    }
  }

  render() {
    let mainPhotoArray = this.state.mainPhotoArray;
    let mainPhotoIndex = this.state.mainPhotoIndex;
    let mainPhotoURL = this.state.mainPhotoURL;
    let subPhotos = this.state.subPhotos;
    console.log('main photo index: ', mainPhotoIndex, 'left end: ', this.state.arrayLeftEnd, 'right end: ', this.state.arrayRightEnd);
    if (!this.state.expanded) {
      return (
        <div>
          <div class="styles-item-1-2">
            {subPhotos.map((photo) =>
              <img class="styles-item-1-2-1" id="subPhoto" src={photo.url} width="50" height="70" onClick={this.photoClick}></img>
            )}
            <div class="styles-item-1-1 collapsed-magnifying-glass" onClick={this.expandClick}>🔍</div>
          </div>
          <div class="styles-item-1-1">
            <img class="styles-item-1-1" id="mainPhoto" src={mainPhotoArray[mainPhotoIndex].url} width="360" height="480"></img>
            {/* <img id="zoom-icon" src={zoomIcon} width="20" height="20"></img> */}
            <div id="left-arrow" onClick={this.leftClick}>←left</div>
            <div id="right-arrow" onClick={this.rightClick}>right→</div>
          </div>
        </div>
      )
    } else {
      return (
        <div class="expanded-view">
          <div class="expanded-subPhoto">
            {subPhotos.map((photo) =>
              <div>
                <img class="styles-item-1-2-1" id="subPhoto" src={photo.url} width="50" height="70" onClick={this.photoClick}></img>
              </div>
            )}
          </div>
          <img class="expanded-mainPhoto" src={mainPhotoURL} width="575" height="700"></img>
          <div class="expanded-magnifying-glass" onClick={this.expandClick}>🔍</div>
        </div>
      )
    }

  }
}

export default Photos;