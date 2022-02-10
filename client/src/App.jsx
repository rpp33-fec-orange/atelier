import React from 'react';
// import ReactDOM from 'react-dom';
import ProductOverview from './components/ProductOverview/ProductOverview.jsx';
import RatingsReviews from './components/RatingsReviews/RatingsReviews.jsx';
import QuestionsAnswers from './components/QuestionsAnswers/QuestionsAnswers.jsx';
import RelatedItems from './components/RelatedItems/RelatedItems.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
  }

  render() {
    return (
      <div id="container">
        <h1>Atelier</h1>
        <ProductOverview foo="bar" />
        <RatingsReviews foo="bar" />
        <QuestionsAnswers foo="bar" />
        <RelatedItems foo="bar" />
      </div>
    )
  }
}

export default App;
