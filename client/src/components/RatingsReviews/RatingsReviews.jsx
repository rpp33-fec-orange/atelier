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
      id: props.id,
      sort: 'newest'
    }
    this.reviewHandler = this.reviewHandler.bind(this);
  }

  reviewHandler() {
    // var url = `/reviews/${this.state.id}`;
    // var url = '/reviews/';
    console.log('review product id is: ', this.state.id);
    var url = `/reviews/${this.state.id}`;
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
      console.log('error from get request: ', error);
     }
   })
   .done(function() {
    console.log('get request is done');
   });
  }

  componentDidMount() {
    this.reviewHandler();
  }

  render() {
    console.log('id in product review is: ', this.state.id);
    console.log('this is this.state.reviews: ', this.state.reviews);
    return (
      <div>
        <h1 id='ratings-reviews'>RATINGS AND REVIEWS</h1>
        <StarNumber />
        <StarList />
        <SizeSlider />
        <ComfortSlider />
        <h3>248 reviews, sorted by relevance</h3>
        <ReviewItem reviews={this.state.reviews}/>
      </div>
    );
  }
}

export default RatingsReviews;