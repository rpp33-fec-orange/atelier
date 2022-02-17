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
      reviews: []
    }
    this.reviewHandler = this.reviewHandler.bind(this);
  }

  reviewHandler() {
    var url = '/'
   $.ajax({
     method: "GET",
     url: url,
     success: (reviews) => {
      this.setState({
        reviews: reviews
      });
     },
     error: (err) => {
      console.log('error from get request');
     }
   })
   .done(function() {
    console.log('get request is done');
   });
  }

  render() {
    return (
      <div>
        <h1 id='ratings-reviews'>RATINGS AND REVIEWS</h1>
        <StarNumber />
        <StarList />
        <SizeSlider />
        <ComfortSlider />
        <h3>248 reviews, sorted by relevance</h3>
        {/* <div> Review #1 </div>
      <div> Review #2 </div> */}
        <ReviewItem />
      </div>
    );
  }
}

export default RatingsReviews;