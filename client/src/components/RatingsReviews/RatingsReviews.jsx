import React from 'react';
import $ from 'jquery';
import ReviewItem from './ReviewItem.jsx';
import StarNumber from './StarNumber.jsx';
import StarList from './StarList.jsx';
import StarItem from './StarItem.jsx';
import ComfortSlider from './ComfortSlider.jsx';
import SizeSlider from './SizeSlider.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: {},
      // id: props.id,
      id: 2,
      sort: 'newest'
    }
    this.getReviewsHandler = this.getReviewsHandler.bind(this);
    this.getReviewsByIDHandler = this.getReviewsByIDHandler.bind(this);

  }

  getReviewsHandler() {
    // var url = `/reviews/${this.state.id}`;
    var url = '/reviews';
    console.log('review product id is: ', this.state.id);
    // var url = `/reviews/${this.state.id}`;
    $.ajax({
      context: this,
      type: "GET",
      url: url,
      success: (reviews) => {
        console.log('review ajax success! reviews are: ', reviews);
        this.setState({
          reviews: reviews
        });
      },
      error: (error) => {
        console.log('error from get reviews request: ', error);
      }
    })
      .done(function () {
        console.log('get reviews request is done');
      });
  }

  getReviewsByIDHandler(id) {
    // var url = `/reviews/${this.state.id}`;
    // product_id=64620
    var url = `/reviews/?sort=newest&product_id=${this.state.id}`;
    console.log('review product id is: ', this.state.id);
    // var url = `/reviews/${this.state.id}`;
    $.ajax({
      context: this,
      method: "GET",
      url: url,
      success: (reviews) => {
        console.log('review ajax success! reviews are: ', reviews);
        this.setState({
          reviews: reviews
        });
      },
      error: (error) => {
        console.log('error from get reviews request: ', error);
      }
    })
      .done(function () {
        console.log('get reviews request is done');
      });
  }

componentDidMount() {
  this.getReviewsByIDHandler(this.state.id);
}

render() {
  console.log('this is this.state.reviews: ', this.state.reviews);
  return (
    <div>
      <h1 id='ratings-reviews'>RATINGS AND REVIEWS</h1>
      <StarNumber />
      <StarList />
      <SizeSlider />
      <ComfortSlider />
      <h3>248 reviews, sorted by relevance</h3>
      <ReviewItem reviews={this.state.reviews} />
    </div>
  );
}
}

export default RatingsReviews;