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
      rating: 0
    }
    this.productsHandler = this.productsHandler.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.getRating = this.getRating.bind(this);
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

  handleRating(string){
    console.log('star rating', string)
  }

  componentDidMount() {
    this.productsHandler();
  }

  componentWillMount() {
    this.getRating();
  }

  getRating(rating) {
    this.setState({
      rating: rating
    });
  }

  render() {
    if (this.state.initialized) {
      return (
        <div id="container">
          <ProductOverview id={this.state.id} rating={this.state.rating} />
          <RelatedProducts id={this.state.id}/>
          <QuestionsAnswers id={this.state.id} />
          <RatingsReviews id={this.state.id} handleRating = {this.handleRating} handleGetRating={this.getRating} />
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
