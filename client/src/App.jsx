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
      initialized: false
    }
    this.productsHandler = this.productsHandler.bind(this);
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

  componentDidMount() {
    this.productsHandler();
  }

  render() {
    if (this.state.initialized) {
      return (
        <div id="container">
          <ProductOverview id={this.state.id} />
          <RelatedProducts id={this.state.id}/>
          <QuestionsAnswers />
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
