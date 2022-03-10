import React from 'react';
import $ from 'jquery';
import ReviewItem from './ReviewItem.jsx';
import StarNumber from './StarNumber.jsx';
import StarList from './StarList.jsx';
import StarItem from './StarItem.jsx';
import ComfortSlider from './ComfortSlider.jsx';
import SizeSlider from './SizeSlider.jsx';
import ReviewList from './ReviewList.jsx';
import Dashboard from './Dashboard.jsx';
import StarRating from './StarRating.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewReady: false,
      metaReady: false,
      reviews: [],
      meta: {},
      id: 0,
      sort: 'newest',
      count: 0,
      review_id: 0,
      meta_ratings: {},
      meta_recommended: {},
      meta_characteristics: {},
      newestReviews: [],
      helpfulReviews: [],
      relevantReviews: []
    }
    this.getReviewsByIDHandler = this.getReviewsByIDHandler.bind(this);
    this.getReviewsMetaHandler = this.getReviewsMetaHandler.bind(this);
    this.postReviewHandler = this.postReviewHandler.bind(this);
    this.putHelpfulHandler = this.putHelpfulHandler.bind(this);
  }

  componentDidMount() {
    // this.setState({
    //   id: this.props.id
    // });
    // var id = this.props.id;
    // const ajaxPromise = new Promise((resolve, reject) => {
    //   this.getReviewsByIDHandler(id);
    //   this.getReviewsMetaHandler(id);
    //   resolve('foo');
    //   reject('bar');
    // });

    // ajaxPromise.then((data) => {
    //   this.setState({
    //     reviewReady: true,
    //   });
    // })
    // .catch((error) => {
    //   console.log('ajax Promise error in ReviewsRatings.jsx is: ', error);
    // })
    var id = this.props.id;
    this.getReviewsByIDHandler(id, this.state.sort);
    this.getReviewsMetaHandler(id);

    // try {
    //   this.getReviewsMetaHandler(this.state.id);
    // } catch (error) {
    // }
  }

  getReviewsByIDHandler(id, sort) {
    // var url = `/reviews/${this.state.id}`;
    // product_id=64620
    // var sort = this.state.sort;
    var id = this.props.id;
    var url = `/reviews/?sort=${sort}&product_id=${id}`;
    // console.log('review product id is: ', this.state.id);
    // var url = `/reviews/${this.state.id}`;
    $.ajax({
      context: this,
      type: "GET",
      url: url,
      success: (data) => {
        // console.log('review ajax success! reviews are: ', reviews);
        this.setState({
          reviews: data.results,
          count: data.count,
          reviewReady: true
        });
      },
      error: (error) => {
        // console.log('error from get reviews request: ', error);
      }
    })
      .done(function () {
        // console.log('get reviews request is done');
      });
  }

  getReviewsMetaHandler(id) {
    // var url = `/reviews/${this.state.id}`;
    // product_id=64620
    // var sort = this.state.sort;
    var id = this.props.id;
    var url = `/reviews/meta?product_id=${id}`;
    // console.log('review product id in getReviewsMetaHandler is: ', this.state.id);
    // var url = `/reviews/${this.state.id}`;
    $.ajax({
      context: this,
      type: "GET",
      url: url,
      success: (data) => {
        // console.log('review meta ajax success! reviews are: ', data);
        this.setState({
          meta: data,
          meta_ratings: data.ratings,
          meta_recommended: data.recommended,
          meta_characteristics: data.characteristics,
          metaReady: true
          // count: data.count
        });
      },
      error: (error) => {
        // console.log('error from get reviews meta request: ', error);
      }
    })
      .done(function () {
        // console.log('get reviews meta request is done');
      });
  }

  postReviewHandler(product_id, rating, summary, body, recommend, name, email, photos, characteristics) {
    // var url = `/reviews/${this.state.id}`;
    // product_id=64620
    // var sort = this.state.sort;
    var id = this.state.id;
    var url = '/reviews';
    // console.log('review product id in postReview is: ', this.state.id);
    // var url = `/reviews/${this.state.id}`;
    $.ajax({
      context: this,
      type: "POST",
      url: url,
      data: {
        product_id: product_id,
        rating: rating,
        summary: summary,
        body: body,
        recommend: recommend,
        name: name,
        email: email,
        photos: photos,
        characteristics: characteristics
      },
      success: (data) => {
        // console.log('review POST ajax success!');
      },
      error: (error) => {
        // console.log('error from POST review request: ', error);
      }
    })
      .done(function () {
        // console.log('post reviews request is done');
      });
  }

  putHelpfulHandler() {
    // var url = `/reviews/${this.state.id}`;
    // product_id=64620
    // var sort = this.state.sort;
    var review_id = this.props.review_id;
    var url = `/reviews/${review_id}/helpful`;
    // console.log('review product id in getReviewsMetaHandler is: ', this.state.id);
    // var url = `/reviews/${this.state.id}`;
    $.ajax({
      context: this,
      type: "PUT",
      url: url,
      statusCode: {
        204: function () {
          console.log('client ajax mark review helpful success code 204!');
        }
      },
      success: (data) => {
        console.log('Review was found helpful ajax success!');
        // this.setState({
        //   meta: data
        // });
      },
      error: (error) => {
        console.log('Helpful ajax error from PUT review request: ', error);
      }
    })
      .done(function () {
        // console.log('PUT reviews request is done');
      });
  }

  render() {
    // console.log('this.state.reviews: ', this.state.reviews);
    // console.log('this.state.meta is: ', this.state.meta);
    var reviewReady = this.state.reviewReady;
    var metaReady = this.state.metaReady;
    var list = this.state.reviews;
    var count = this.state.count;
    var sort = this.state.sort;
    var meta_characteristics = this.state.meta_characteristics;
    var meta_recommended = this.state.meta_recommended;
    var meta_ratings = this.state.meta_ratings;
    console.log('meta_characteristics is: ', meta_characteristics);
    console.log('reviewReady is: ', reviewReady);
    console.log('metaReady is: ', metaReady);


    if (!(reviewReady && metaReady)) {
      return (
        <div>
          Loading Ratings and Reviews...
        </div>
      )
    }
    if(reviewReady && metaReady) {
      return (
        <div className="ratings-reviews" id="flex-container">
          <div className="rating-breakdown">
            <h3 id='ratings-reviews' id="zero">RATINGS AND REVIEWS</h3>
            <StarNumber recommended={meta_recommended} ratings={meta_ratings} handleRating={this.props.handleRating} handleGetRating={this.props.handleGetRating} />
            <StarList ratings={meta_ratings} />
            <SizeSlider size={meta_characteristics} />
            <ComfortSlider comfort={meta_characteristics} />
          </div>
          <div className="review-breakdown">
            <h3 className="review-header">{count} reviews, sorted by <div className="sort">{sort} &#9660;</div></h3>
            <ReviewList reviews={list} onMarkedHelpful={this.putHelpfulHandler} />
            {/* <Dashboard /> */}
          </div>
        </div>
      );
    }
  }
}

export default RatingsReviews;