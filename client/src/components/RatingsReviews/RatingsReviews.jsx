import React from 'react';
import $ from 'jquery';
import ReviewItem from './ReviewItem.jsx';
import StarNumber from './StarNumber.jsx';
import StarList from './StarList.jsx';
import StarItem from './StarItem.jsx';
import ComfortSlider from './ComfortSlider.jsx';
import SizeSlider from './SizeSlider.jsx';
import ReviewList from './ReviewList.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      id: props.id,
      sort: 'newest',
      count: 0
    }
    // this.getReviewsHandler = this.getReviewsHandler.bind(this);
    this.getReviewsByIDHandler = this.getReviewsByIDHandler.bind(this);

  }

  // getReviewsHandler() {
  //   // var url = `/reviews/${this.state.id}`;
  //   var url = '/reviews';
  //   console.log('review product id is: ', this.state.id);
  //   // var url = `/reviews/${this.state.id}`;
  //   $.ajax({
  //     context: this,
  //     type: "GET",
  //     url: url,
  //     success: (reviews) => {
  //       console.log('review ajax success! reviews are: ', reviews);
  //       this.setState({
  //         reviews: reviews
  //       });
  //     },
  //     error: (error) => {
  //       console.log('error from get reviews request: ', error);
  //     }
  //   })
  //     .done(function () {
  //       console.log('get reviews request is done');
  //     });
  // }

  getReviewsByIDHandler(id) {
    // var url = `/reviews/${this.state.id}`;
    // product_id=64620
    var sort = this.state.sort;
    var id = this.state.id;
    var url = `/reviews/?sort=${sort}&product_id=${id}`;
    console.log('review product id is: ', this.state.id);
    // var url = `/reviews/${this.state.id}`;
    $.ajax({
      context: this,
      method: "GET",
      url: url,
      success: (data) => {
        // console.log('review ajax success! reviews are: ', reviews);
        this.setState({
          reviews: data.results,
          count: data.count
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
    console.log('this.state.reviews: ', this.state.reviews);
    console.log('this.state.count: ', this.state.count);
    var list = this.state.reviews;
    var count = this.state.count;
    var sort = this.state.sort;
    return (
      <div className="wrapper" id="flex-container">
        <h4 id='ratings-reviews' id="zero">Ratings and Reviews</h4>
        <h1>
          <StarNumber />
        </h1>
        <StarList />
        <SizeSlider />
        <ComfortSlider />
        <h3>{count} reviews, sorted by {sort}</h3>
        <ReviewList reviews={list} />
      </div>
    );
  }
}

export default RatingsReviews;