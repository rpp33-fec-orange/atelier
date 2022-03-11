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
      sort: '',
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
    this.sortReviews = this.sortReviews.bind(this);
    this.setReviews = this.setReviews.bind(this);
  }

  componentDidMount() {
    var id = this.props.id;
    this.setState({
      id: id
    });
    this.getReviewsByIDHandler(id, 'newest');
    this.getReviewsByIDHandler(id, 'helpful');
    this.getReviewsByIDHandler(id, 'relevant');
    this.getReviewsMetaHandler(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      var id = this.props.id;
      this.setState({
        id: id
      });
      this.getReviewsByIDHandler(id, 'newest');
      this.getReviewsByIDHandler(id, 'helpful');
      this.getReviewsByIDHandler(id, 'relevant');
      this.getReviewsMetaHandler(id);
    }
  }

  setSort(sort) {
    this.setState({
      sort: sort
    });
  }

  getReviewsByIDHandler(id, sort) {
    // var url = `/reviews/${this.state.id}`;
    // product_id=64620
    // var sort = this.state.sort;
    var count = 10;
    var id = this.props.id;
    var url = `/reviews/?sort=${sort}&count=${count}&product_id=${id}`;
    console.log('ajax url is: ', url);
    // console.log('review product id is: ', this.state.id);
    // var url = `/reviews/${this.state.id}`;
    $.ajax({
      context: this,
      type: "GET",
      url: url,
      success: (data) => {
        console.log('review ajax success! data.results is: ', data.results);
        if (sort === 'newest') {
          this.setState({
            // reviews: data.results,
            count: data.count,
            reviewReady: true,
            newestReviews: data.results
          });
        } else if (sort === 'helpful') {
          this.setState({
            // reviews: data.results,
            count: data.count,
            reviewReady: true,
            helpfulReviews: data.results
          });
        } else if (sort === 'relevant') {
          this.setState({
            reviews: data.results,
            count: data.count,
            reviewReady: true,
            relevantReviews: data.results
          });
        }
        //  else {
        //   this.setState({
        //     reviews: data.results,
        //     count: data.count,
        //     reviewReady: true,
        //   });
        // }
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

  putHelpfulHandler(id) {
    var review_id = id;
    console.log('review_id inside RatingsReviews.jsx: ', review_id);
    var url = `/reviews/${review_id}/helpful`;
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
      },
      error: (error) => {
        console.log('Helpful ajax error from PUT review request: ', error);
      }
    })
      .done(function () {
        // console.log('PUT reviews request is done');
      });
  }

  putReportedHandler(id) {
    var review_id = id;
    console.log('review_id inside putReportedHandler: ', review_id);
    var url = `/reviews/${review_id}/report`;
    $.ajax({
      context: this,
      type: "PUT",
      url: url,
      statusCode: {
        204: function () {
          console.log('client ajax mark review reported success code 204!');
        }
      },
      success: (data) => {
        console.log('Review was reported ajax success!');
      },
      error: (error) => {
        console.log('Reported Review ajax error from PUT review request: ', error);
      }
    })
      .done(function () {
        // console.log('PUT reviews request is done');
      });
  }

  sortReviews(e) {
    // var select = document.getElementById('dropdown-sort');
    // var value = select.options[select.selectIndex].value;
    // console.log('dropdown-sort is: ', value);
    var sortValue = e.target.value;
    console.log('this is sortValue: ', sortValue);
    this.setState({
      sort: sortValue
    }, this.setReviews);
  }

  setReviews() {
    var newestReviews = this.state.newestReviews;
    var helpfulReviews = this.state.helpfulReviews;
    var relevantReviews = this.state.relevantReviews;
    if (this.state.sort === 'newest') {
      this.setState({
        reviews: newestReviews
      });
    } else if (this.state.sort === 'helpful') {
      this.setState({
        reviews: helpfulReviews
      });
    } else if (this.state.sort === 'relevant') {
      this.setState({
        reviews: relevantReviews
      });
    }
  }

  render() {
    // console.log('this.state.reviews: ', this.state.reviews);
    // console.log('this.state.meta is: ', this.state.meta);
    var reviewReady = this.state.reviewReady;
    var metaReady = this.state.metaReady;
    // var list = this.state.reviews;
    var sort = this.state.sort;
    var list = this.state.reviews;
    // var list = [];
    // if (sort === 'newest') {
    //   list = this.state.newestReviews;
    // } else if (sort === 'helpful') {
    //   list = this.state.newestReviews;
    // } else if (sort === 'relevant') {
    //   list = this.state.relevantReviews;
    // } else {
    //   list = this.state.newestReviews;
    // }
    var count = this.state.count;
    var meta_characteristics = this.state.meta_characteristics;
    var meta_recommended = this.state.meta_recommended;
    var meta_ratings = this.state.meta_ratings;
    console.log('meta_characteristics is: ', meta_characteristics);
    console.log('reviewReady is: ', reviewReady);
    console.log('metaReady is: ', metaReady);
    console.log('this.state.newestReviews: ', this.state.newestReviews);
    console.log('this.state.helpfulReviews: ', this.state.helpfulReviews);
    console.log('this.state.relevantReviews: ', this.state.relevantReviews);
    console.log('list becomes ', list);


    if (!(reviewReady && metaReady)) {
      return (
        <div>
          Loading Ratings and Reviews...
        </div>
      )
    }
    if (reviewReady && metaReady) {
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
            <div className="review-header">{count} reviews, sorted by
              <select className="dropdown-sort" id="dropdown-sort" onChange={this.sortReviews} >
                <option value="newest">newest</option>
                <option value="helpful">helpful</option>
                <option value="relevant">relevant</option>
              </select>
            </div>
            <ReviewList reviews={list} onMarkedHelpful={this.putHelpfulHandler} onMarkedReported={this.putReportedHandler} />
            {/* <Dashboard /> */}
          </div>
        </div>
      );
    }
  }
}

export default RatingsReviews;