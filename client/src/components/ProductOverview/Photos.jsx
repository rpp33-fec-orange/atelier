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
      subPhotosArray: props.currentStyle.photos,
      expanded: false,
      arrayLeftEnd: true,
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
    if (this.state.mainPhotoIndex === 0 || newIndex === 0) {
      this.setState({
        arrayLeftEnd: true,
        arrayRightEnd: false,
        mainPhotoIndex: newIndex
      });
    } else {
      this.setState({
        arrayLeftEnd: false,
        arrayRightEnd: false,
        mainPhotoIndex: newIndex
      });
    }
    console.log('left, index', this.state.mainPhotoIndex)
  }

  rightClick() {
    let newIndex = this.state.mainPhotoIndex + 1;
    if (this.state.mainPhotoIndex === this.state.mainPhotoArray.length - 1 || newIndex === this.state.mainPhotoArray.length - 1) {
      this.setState({
        arrayRightEnd: true,
        arrayLeftEnd: false,
        mainPhotoIndex: newIndex
      });
    } else {
      this.setState({
        arrayRightEnd: false,
        arrayLeftEnd: false,
        mainPhotoIndex: newIndex
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
        subPhotosArray: this.props.currentStyle.photos,
        mainPhotoArray: this.props.currentStyle.photos
      })
    }
  }

  render() {
    let mainPhotoArray = this.state.mainPhotoArray;
    let mainPhotoIndex = this.state.mainPhotoIndex;
    let mainPhotoURL = this.state.mainPhotoURL;
    let subPhotosArray = this.state.subPhotosArray;
    let arrayLeftEnd = this.state.arrayLeftEnd;
    let arrayRightEnd = this.state.arrayRightEnd;
    let expanded = this.state.expanded;
    if (!expanded) {
      return (
        <div>
          <div class="styles-item-1-2">
            {subPhotosArray.map((photo) =>
              <img class="styles-item-1-2-1" src={photo.url} width="50" height="70" onClick={this.photoClick}></img>
            )}
            <div class="styles-item-1-1 collapsed-magnifying-glass" onClick={this.expandClick}>🔍</div>
            {/* <img class="styles-item-1-1 collapsed-magnifying-glass" src={zoomIcon} onclick={this.expandClick}></img> */}
          </div>
          <div class="styles-item-1-1">
            <img class="styles-item-1-1-1" id="mainPhoto" src={mainPhotoArray[mainPhotoIndex].url} width="360" height="480"></img>
            {arrayLeftEnd ? <div></div> : <div id="collapsed-left-arrow" onClick={this.leftClick}>≪</div>}
            {arrayRightEnd ? <div></div> : <div id="collapsed-right-arrow" onClick={this.rightClick}>≫</div>}
          </div>
        </div>
      )
    } else {
      return (
        <div class="expanded-view">
          <div class="expanded-subPhoto">
            {subPhotosArray.map((photo) =>
              <div>
                <img class="styles-item-1-2-1" src={photo.url} width="50" height="70" onClick={this.photoClick}></img>
              </div>
            )}
          </div>
          <img class="expanded-mainPhoto" src={mainPhotoArray[mainPhotoIndex].url} width="575" height="700"></img>
          <div class="expanded-magnifying-glass" onClick={this.expandClick}>🔍</div>
          {/* <img class="expanded-magnifying-glass" src={zoomIcon} onclick={this.expandClick}></img> */}
          {arrayLeftEnd ? <div></div> : <div id="expanded-left-arrow" onClick={this.leftClick}>≪</div>}
          {arrayRightEnd ? <div></div> : <div id="expanded-right-arrow" onClick={this.rightClick}>≫</div>}
        </div>
      )
    }

  }
}

export default Photos;