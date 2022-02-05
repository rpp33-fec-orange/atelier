import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview.jsx';
import RatingsReviews from './components/RatingsReviews.jsx';
import QuestionsAnswers from './components/QuestionsAnswers.jsx';
import RelatedItemsComparison from './components/RelatedItemsComparison.jsx';

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
        <Overview />
        <RatingsReviews />
        <QuestionsAnswers />
        <RelatedItemsComparison />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));