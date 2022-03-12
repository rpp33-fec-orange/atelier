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
      productName: '',
      initialized: false,
      rating: 0,
      currentStyle: null,
      yourOutfitArray: []
    }
    this.productsHandler = this.productsHandler.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.getRating = this.getRating.bind(this);
    this.currentStyleHandler = this.currentStyleHandler.bind(this);
    this.yourOutfitHandleClick = this.yourOutfitHandleClick.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.recordInteractions = this.recordInteractions.bind(this);
  }

  productsHandler() {
    $.ajax({
      context: this,
      type: 'GET',
      url: '/products',
      success: function (success) {
        // console.log('app ajax GET success');
        this.setState({
          id: success[0].id,
          productName: success[0].name,
          initialized: true
        });
      },
      error: function (error) {
        console.log('app ajax GET error: ', error);
      },
      contentType: "application/json",
    })
  }

  handleRating(string) {
    console.log('star rating', string)
  }

  componentDidMount() {
    this.productsHandler();
    window.addEventListener('popstate', (e) => {
      // var state = e.state;
      if (e.state !== null) {
        this.setState({ ...this.state, id: e.state })
      }
    });
  }

  componentWillMount() {
    this.getRating();
  }

  getRating(rating) {
    this.setState({
      rating: rating
    });
  }

  currentStyleHandler(selectedStyle) {
    this.setState({
      currentStyle: selectedStyle
    }, () => {
      console.log('currentStyle changed')
    })
  }

  yourOutfitHandleClick() {
    console.log('currentStyle', this.state.currentStyle)
    var currentStyle = this.state.currentStyle;
    currentStyle['num_Rating'] = this.state.rating;
    var yourOutfit = this.state.yourOutfitArray;
    const styleExists = yourOutfit.findIndex(element => element.style_id === currentStyle.style_id)
    if (styleExists === -1) {
      yourOutfit.push(currentStyle);
    }
    this.setState({
      yourOutfitArray: yourOutfit
    }, () => {
      console.log('outfit updated')
    })
  }

  handleProductChange(product) {
    this.setState({ ...this.state, id: product.id, productName: product.name }, () => { console.log('product id updated',product.name ) })
  }

  recordInteractions(interactionsObject) {

    $.ajax({
      type: 'POST',
      url: `/interactions`,
      data: interactionsObject,
      success : () => {
        console.log('Interactions POST request successful')
      },
      error: (err) => {
        console.log('err', err)
      }
    })
  }

  render() {

    if (this.state.initialized) {
      history.pushState(`${this.state.id}`, '', `/${this.state.id}`);
      return (
        <div id="container">
          <ProductOverview id={this.state.id} rating={this.state.rating} currentStyleHandler={this.currentStyleHandler} yourOutfitHandleClick={this.yourOutfitHandleClick} interactions = {this.recordInteractions}/>
          <RelatedProducts id={this.state.id} yourOutfitArray={this.state.yourOutfitArray} yourOutfitHandleClick={this.yourOutfitHandleClick} handleProductChange={this.handleProductChange} interactions = {this.recordInteractions}/>
          <QuestionsAnswers id={this.state.id} productName={this.state.productName} interactions={this.recordInteractions}/>
          <RatingsReviews id={this.state.id} handleRating={this.handleRating} handleGetRating={this.getRating} interactions = {this.recordInteractions}/>
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
