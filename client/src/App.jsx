import React from 'react';
import $ from 'jquery';
import ProductOverview from './components/ProductOverview/index.jsx';
import RatingsReviews from './components/RatingsReviews/RatingsReviews.jsx';
import QuestionsAnswers from './components/QuestionsAnswers/index.jsx';
import RelatedProducts from './components/RelatedProducts/index.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      initialized: false,
      currentStyle: null,
      yourOutfitArray: []
    }
    this.productsHandler = this.productsHandler.bind(this);
    this.currentStyleHandler = this.currentStyleHandler.bind(this);
    this.yourOutfitHandleClick = this.yourOutfitHandleClick.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
  }

  productsHandler() {
    $.ajax({
      context: this,
      type: 'GET',
      url: '/products',
      success: function (success) {
        console.log('app ajax GET success');
        this.setState({
          id: success[0].id,
          initialized: true
        });
      },
      error: function (error) {
        console.log('app ajax GET error: ', error);
      },
      contentType: "application/json",
    })
  }

  currentStyleHandler(selectedStyle) {
      this.setState({
        currentStyle: selectedStyle
      })
  }

  yourOutfitHandleClick () {

    console.log('currentStyle', this.state.currentStyle)
    var currentStyle =  this.state.currentStyle;

    if (currentStyle) {
      var currentStyleId = currentStyle.style_id;
      var yourOutfit = JSON.parse(JSON.stringify(this.state.yourOutfitArray));

      if (yourOutfit.length !== 0) {
        for (var i = 0; i < yourOutfit.length; i++) {
          if (yourOutfit[i].style_id === currentStyleId) {
            continue;
          } else {
            yourOutfit.push(currentStyle);
          }
        }
      } else {
        yourOutfit.push(currentStyle);
      }

      this.setState({
        yourOutfitArray: yourOutfit
      }, () => {
        console.log('array updated', this.state.yourOutfitArray)
      })
    }
  }

  handleProductChange(productId) {

    console.log('id in app', productId)
    this.setState({
      id: productId
    }, () => {
      console.log('updated state', this.state.id)
    })
  }

  componentDidMount() {
    this.productsHandler();
  }

  render() {

    if (this.state.initialized) {
      return (
        <div id="container">
          <ProductOverview id={this.state.id} currentStyleHandler = {this.currentStyleHandler} yourOutfitHandleClick = {this.yourOutfitHandleClick}/>
          <RelatedProducts id={this.state.id} yourOutfitArray = {this.state.yourOutfitArray} yourOutfitHandleClick = {this.yourOutfitHandleClick} handleProductChange = {this.handleProductChange}/>
          <QuestionsAnswers id={this.state.id} />
          <RatingsReviews id={this.state.id}/>
        </div>
      )
    } else {
      return (
        <div id="loading">
          ⇆ Loading...
        </div>
      )
    }
  }
}

export default App;

