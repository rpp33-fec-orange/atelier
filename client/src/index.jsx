import React from 'react';
import ReactDOM from 'react-dom';
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

  // server aja

  render() {
    return (
      <div id="container">
        <h1>Atelier</h1>
        <ProductOverview />
        <RatingsReviews />
        <QuestionsAnswers />
        <RelatedItems />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));