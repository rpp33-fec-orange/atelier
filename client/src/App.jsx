import React from 'react';
import ProductOverview from './components/ProductOverview/index.jsx';
import RatingsReviews from './components/RatingsReviews/RatingsReviews.jsx';
import QuestionsAnswers from './components/QuestionsAnswers/index.jsx';
import RelatedProducts from './components/RelatedProducts/index.jsx';

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
        <RelatedProducts foo="bar" />
        <QuestionsAnswers foo="bar" />
        <RatingsReviews foo="bar" />
      </div>
    )
  }
}

export default App;
