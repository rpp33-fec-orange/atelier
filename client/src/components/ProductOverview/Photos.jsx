import React from 'react';
import { BsArrowsAngleContract } from 'react-icons/Bs';
import { BsArrowsAngleExpand } from 'react-icons/Bs';
import { IoIosArrowDropright } from 'react-icons/Io';
import { IoIosArrowDropleft } from 'react-icons/Io';
import { IoIosArrowDown } from 'react-icons/Io';
import { IoIosArrowUp } from 'react-icons/Io';

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStyle: props.currentStyle,
      mainPhotoArray: props.currentStyle.photos,
      mainPhotoIndex: 0,
      mainPhotoURL: props.currentStyle.photos[0].url,
      subPhotosArray: props.currentStyle.photos,
      subPhotosSliceStartIndex: 0,
      subPhotosSliceEndIndex: 4,
      subPhotoSelectedId: 0,
      expanded: false,
      arrayLeftEnd: true,
      arrayRightEnd: false,
      arrayTopEnd: true,
      arrayBottomEnd: false
    }
    this.photoClick = this.photoClick.bind(this);
    this.leftClick = this.leftClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.upClick = this.upClick.bind(this);
    this.downClick = this.downClick.bind(this);
    this.expandClick = this.expandClick.bind(this);
    this.subPhotoSelectedInitial = this.subPhotoSelectedInitial.bind(this);
  }

  subPhotoSelectedInitial() {
    // initialize first sub photo with css border before user input
    document.getElementById(this.state.subPhotoSelectedId).classList.add('selected-photo');
  }

  photoClick(e) {
    // highlight selected sub photo with css border
    if (this.state.subPhotoSelectedId !== e.target.id) {
      document.getElementById(this.state.subPhotoSelectedId).classList.remove('selected-photo');
      this.state.subPhotoSelectedId = e.target.id;
      document.getElementById(e.target.id).classList.add('selected-photo');
    }

    // replacing main photo with selected sub photo
    for (let i = 0; i < this.state.mainPhotoArray.length; i++) {
      if (e.target.src === this.state.mainPhotoArray[i].url) {
        let clickedIndex = i;
        this.setState({
          mainPhotoIndex: clickedIndex
        })
        if (i === 0) {
          this.setState({
            arrayLeftEnd: true,
            arrayRightEnd: false
          })
        } else if (i === this.state.mainPhotoArray.length - 1) {
          this.setState({
            arrayLeftEnd: false,
            arrayRightEnd: true
          })
        } else {
          this.setState({
            arrayLeftEnd: false,
            arrayRightEnd: false
          })
        }
      }
    }
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
  }

  upClick() {
    let newStartIndex = this.state.subPhotosSliceStartIndex - 1;
    let newEndIndex = this.state.subPhotosSliceEndIndex - 1;
    if (newEndIndex < this.state.subPhotosArray.length && newStartIndex > 0) {
      this.setState({
        arrayTopEnd: false,
        arrayBottomEnd: false
      })
    }
    if (this.state.subPhotosSliceStartIndex === 0 || newStartIndex === 0) {
      this.setState({
        arrayTopEnd: true,
        arrayBottomEnd: false
      })
    }
    this.setState({
      subPhotosSliceStartIndex: newStartIndex,
      subPhotosSliceEndIndex: newEndIndex
    })
  }

  downClick() {
    let newStartIndex = this.state.subPhotosSliceStartIndex + 1;
    let newEndIndex = this.state.subPhotosSliceEndIndex + 1;
    if (newStartIndex > 0 && newEndIndex < this.state.subPhotosArray.length) {
      this.setState({
        arrayTopEnd: false,
        arrayBottomEnd: false
      })
    }
    if (this.state.subPhotosSliceEndIndex === this.state.subPhotosArray.length || newEndIndex === this.state.subPhotosArray.length) {
      this.setState({
        arrayTopEnd: false,
        arrayBottomEnd: true
      })
    }
    this.setState({
      subPhotosSliceStartIndex: newStartIndex,
      subPhotosSliceEndIndex: newEndIndex
    })
  }

  expandClick() {
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

  componentDidMount() {
    this.subPhotoSelectedInitial();
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
    this.subPhotoSelectedInitial();
  }

  render() {
    let mainPhotoArray = this.state.mainPhotoArray;
    let mainPhotoIndex = this.state.mainPhotoIndex;
    let mainPhotoURL = this.state.mainPhotoURL;
    let subPhotosArray = this.state.subPhotosArray;
    let subPhotosSliceStartIndex = this.state.subPhotosSliceStartIndex;
    let subPhotosSliceEndIndex = this.state.subPhotosSliceEndIndex;
    let arrayLeftEnd = this.state.arrayLeftEnd;
    let arrayRightEnd = this.state.arrayRightEnd;
    let arrayTopEnd = this.state.arrayTopEnd;
    let arrayBottomEnd = this.state.arrayBottomEnd;
    let expanded = this.state.expanded;
    if (!expanded) {
      return (
        <div>
          <div class="styles-item-1-2">
            {arrayTopEnd ? <div id="collapsed-up-end">end</div> : <IoIosArrowUp id="collapsed-up-arrow" onClick={this.upClick} />}
            {subPhotosArray.slice(subPhotosSliceStartIndex, subPhotosSliceEndIndex).map((photo, index) =>
              <img class="styles-item-1-2-1" id={index} src={photo.url} onClick={this.photoClick}></img>
            )}
            {arrayBottomEnd ? <div id="collapsed-down-end">end</div> : <IoIosArrowDown id="collapsed-down-arrow" onClick={this.downClick} />}
            <BsArrowsAngleExpand class="styles-item-1-1 collapsed-magnifying-glass" onClick={this.expandClick} />
          </div>
          <div class="styles-item-1-1">
            <img class="styles-item-1-1-1" id="mainPhoto" src={mainPhotoArray[mainPhotoIndex].url} width="360" height="480"></img>
            {arrayLeftEnd ? <div></div> : <IoIosArrowDropleft id="collapsed-left-arrow" onClick={this.leftClick} />}
            {arrayRightEnd ? <div></div> : <IoIosArrowDropright id="collapsed-right-arrow" onClick={this.rightClick} />}
          </div>
        </div>
      )
    } else {
      return (
        <div class="expanded-view">
          <div class="expanded-subPhoto">
            {arrayTopEnd ? <div id="collapsed-up-end">end</div> : <IoIosArrowUp id="collapsed-up-arrow" onClick={this.upClick} />}
            {subPhotosArray.slice(subPhotosSliceStartIndex, subPhotosSliceEndIndex).map((photo, index) =>
              <div>
                <img class="styles-item-1-2-1" id={index} src={photo.url} onClick={this.photoClick}></img>
              </div>
            )}
            {arrayBottomEnd ? <div id="collapsed-down-end">end</div> : <IoIosArrowDown id="collapsed-down-arrow" onClick={this.downClick} />}
          </div>
          <div class="expanded-mainPhoto-container">
            <img class="expanded-mainPhoto" src={mainPhotoArray[mainPhotoIndex].url} width="575" height="700"></img>
            <BsArrowsAngleContract class="expanded-magnifying-glass" onClick={this.expandClick} />
            {arrayLeftEnd ? <div></div> : <IoIosArrowDropleft id="expanded-left-arrow" onClick={this.leftClick} />}
            {arrayRightEnd ? <div></div> : <IoIosArrowDropright id="expanded-right-arrow" onClick={this.rightClick} />}
          </div>
        </div>
      )
    }
  }
}

export default Photos;