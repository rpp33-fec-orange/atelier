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
import ProductBreakdown from './ProductBreakdown.jsx';
import axios from 'axios';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousFilter: '',
      one_star_reviews: [],
      two_star_reviews: [],
      three_star_reviews: [],
      four_star_reviews: [],
      five_star_reviews: [],
      filter_one: false,
      filter_two: false,
      filter_three: false,
      filter_four: false,
      filter_five: false,
      reviewReady: false,
      metaReady: false,
      reviews: [],
      meta: {},
      id: 0,
      sort: 'relevance',
      count: 0,
      review_id: 0,
      meta_ratings: {},
      meta_recommended: {},
      meta_characteristics: {},
      newestReviews: [],
      helpfulReviews: [],
      relevantReviews: [],
      write_rating: 0,
      write_recommended: false,
      write_characteristic_size: 0,
      write_characteristic_width: 0,
      write_characteristic_comfort: 0,
      write_characteristic_fit: 0,
      write_characteristic_length: 0,
      write_characteristic_quality: 0,
      write_review_summary: '',
      write_review_body: '',
      // write_review_photos: ['https://d23.com/app/uploads/2019/06/1180w-600h_061819_tarzan-20th-anniversary.jpg', 'https://assets.mycast.io/characters/belle-1479930-normal.jpg?1613055129'],
      write_review_photos: [],
      photoCount: 0,
      selectedFile: null,
      image: null,
      write_name: '',
      write_email: '',
      size_key: 0,
      width_key: 0,
      comfort_key: 0,
      quality_key: 0,
      length_key: 0,
      fit_key: 0,
      show_more_reviews: false
    }
    this.getReviewsByIDHandler = this.getReviewsByIDHandler.bind(this);
    this.getReviewsMetaHandler = this.getReviewsMetaHandler.bind(this);
    this.postReviewHandler = this.postReviewHandler.bind(this);
    this.putHelpfulHandler = this.putHelpfulHandler.bind(this);
    this.sortReviews = this.sortReviews.bind(this);
    this.setReviews = this.setReviews.bind(this);
    this.sortStarReviews = this.sortStarReviews.bind(this);
    this.setStarReviews = this.setStarReviews.bind(this);
    this.recordInteraction = this.recordInteraction.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.reviewCount = this.reviewCount.bind(this);
    this.showFilterInfo = this.showFilterInfo.bind(this);
    this.removeAllFilters = this.removeAllFilters.bind(this);
    this.alterShowMore = this.alterShowMore.bind(this);

    this.writeRating = this.writeRating.bind(this);
    this.writeRecommended = this.writeRecommended.bind(this);
    this.writeSize = this.writeSize.bind(this);
    this.writeWidth = this.writeWidth.bind(this);
    this.writeComfort = this.writeComfort.bind(this);
    this.writeQuality = this.writeQuality.bind(this);
    this.writeLength = this.writeLength.bind(this);
    this.writeFit = this.writeFit.bind(this);
    this.writeReviewSummary = this.writeReviewSummary.bind(this);
    this.writeReviewBody = this.writeReviewBody.bind(this);
    this.writeUploadPhotos = this.writeUploadPhotos.bind(this);
    this.writeSubmitPhotos = this.writeSubmitPhotos.bind(this);
    this.showUploadedPhotos = this.showUploadedPhotos.bind(this);
    this.writeNickname = this.writeNickname.bind(this);
    this.writeEmail = this.writeEmail.bind(this);

  }

  alterShowMore() {
    var showMore = !this.state.show_more_reviews;
    this.setState({
      show_more_reviews: showMore
    })
    console.log('show_more_reviews at home becomes: ', this.state.show_)
  }

  removeAllFilters() {
    this.setState({
      filter_one: false,
      filter_two: false,
      filter_three: false,
      filter_four: false,
      filter_five: false,
    }, this.setStarReviews);
    this.alterShowMore();
  }

  showFilterInfo() {
    var filters = [];
    if (this.state.filter_one) {
      filters.push('one star ');
    }
    if (this.state.filter_two) {
      filters.push('two stars ');
    }
    if (this.state.filter_three) {
      filters.push('three stars ');
    }
    if (this.state.filter_four) {
      filters.push('four stars ');
    }
    if (this.state.filter_five) {
      filters.push('five stars ');
    }

    if (filters.length === 0) {
      return (
        <div>Filters: none</div>
      )
    } else {
      return (
        <div>Filters: {filters}</div>
      )
    }
  }

  reviewCount() {
    return (
      <div className="star-list-count" id="star-list-count">
        <table className="table-rr">
          <tbody>
            <tr>
              <td class="count-rr" data-value='filter_five' onClick={this.setFilter}>{this.state.five_star_reviews.length} reviews</td>
            </tr>
            <tr>
              <td class="count-rr" data-value='filter_four' onClick={this.setFilter}>{this.state.four_star_reviews.length} reviews</td>
            </tr>
            <tr>
              <td class="count-rr" data-value='filter_three' onClick={this.setFilter}>{this.state.three_star_reviews.length} reviews</td>
            </tr>
            <tr>
              <td class="count-rr" data-value='filter_two' onClick={this.setFilter}>{this.state.two_star_reviews.length} reviews</td>
            </tr>
            <tr>
              <td class="count-rr" data-value='filter_one' onClick={this.setFilter}>{this.state.one_star_reviews.length} reviews</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  setStarReviews() {
    var filteredReviews = [];   // check if any filter is on, which means we empty the reviews array
    if (this.state.filter_one ||
      this.state.filter_two ||
      this.state.filter_three ||
      this.state.filter_four ||
      this.state.filter_five
    ) {
      if (this.state.filter_one) {  // if filter one star is on, put all 1 star reviews in reviews array
        for (var i = 0; i < this.state.one_star_reviews.length; i++) {
          filteredReviews.push((this.state.one_star_reviews[i]));
        }
      }
      if (this.state.filter_two) {  // if filter one star is on, put all 1 star reviews in reviews array
        for (var j = 0; j < this.state.two_star_reviews.length; j++) {
          filteredReviews.push((this.state.two_star_reviews[j]));
        }
      }
      if (this.state.filter_three) {  // if filter one star is on, put all 1 star reviews in reviews array
        for (var k = 0; k < this.state.three_star_reviews.length; k++) {
          filteredReviews.push((this.state.three_star_reviews[k]));
        }
      }
      if (this.state.filter_four) {  // if filter one star is on, put all 1 star reviews in reviews array
        for (var i = 0; i < this.state.four_star_reviews.length; i++) {
          filteredReviews.push((this.state.four_star_reviews[i]));
        }
      }
      if (this.state.filter_five) {  // if filter one star is on, put all 1 star reviews in reviews array
        for (var i = 0; i < this.state.five_star_reviews.length; i++) {
          filteredReviews.push((this.state.five_star_reviews[i]));
        }
      }
      this.setState({
        reviews: filteredReviews
      })

    }
    if (this.state.filter_one === false &&
      this.state.filter_two === false &&
      this.state.filter_three === false &&
      this.state.filter_four === false &&
      this.state.filter_five === false
    ) {
      this.setReviews();
    }
  }

  setFilter(e) {
    var currentFilter = e.target.getAttribute('data-value');  // this is my current filter obtained from user click, i.e. filter_one
    if (currentFilter === 'filter_one') {
      var updatedFilter = !this.state.filter_one;
      this.setState({
        filter_one: updatedFilter
      }, this.setStarReviews)
    }
    else if (currentFilter === 'filter_two') {
      var updatedFilter = !this.state.filter_two;
      this.setState({
        filter_two: updatedFilter
      }, this.setStarReviews)
    }
    else if (currentFilter === 'filter_three') {
      var updatedFilter = !this.state.filter_three;
      this.setState({
        filter_three: updatedFilter
      }, this.setStarReviews)
    }
    else if (currentFilter === 'filter_four') {
      var updatedFilter = !this.state.filter_four;
      this.setState({
        filter_four: updatedFilter
      }, this.setStarReviews)
    }
    else if (currentFilter === 'filter_five') {
      var updatedFilter = !this.state.filter_five;
      this.setState({
        filter_five: updatedFilter
      }, this.setStarReviews)
    }
  }

  writeRating(e) {
    var write_rating = parseInt(e.target.getAttribute('data-value'));
    this.setState({
      write_rating: write_rating
    })
  }

  writeRecommended(e) {
    var value = null;
    if (e.target.value === 'yes') {
      value = true;
    } else {
      value = false;
    }
    this.setState({
      write_recommended: value
    });
  }

  writeSize(e) {
    this.setState({
      write_recharacteristic_size: e.target.value
    });
  }

  writeWidth(e) {
    this.setState({
      write_characteristic_width: e.target.value
    });
  }
  writeComfort(e) {
    this.setState({
      write_characteristic_comfort: e.target.value
    });
  }
  writeQuality(e) {
    this.setState({
      write_characteristic_quality: e.target.value
    });
  }
  writeLength(e) {
    this.setState({
      write_characteristic_length: e.target.value
    });
  }
  writeFit(e) {
    this.setState({
      write_characteristic_fit: e.target.value
    });
  }
  writeReviewSummary(e) {
    this.setState({
      write_review_summary: e.target.value
    });
  }
  writeReviewBody(e) {
    this.setState({
      write_review_body: e.target.value
    });
  }
  writeUploadPhotos() {
    // var currentPhotos = this.state.write_review_photos;
    // var photoLink = e.target.value;
    // currentPhotos.push(photoLink);
    // console.log('photo link should be: ', photoLink);
    // this.setState({
    //   write_review_photos: currentPhotos
    // });

    // this.setState({
    //   selectedFile: e.target.files[0]
    // });
    // const files = this.myFiles.files
    // const accept = ["image/png"];
    // if (accept.indexOf(files[0].mediaType) > -1) {
    //   this.setState({
    //     image: files[0].getAsDataURL()
    //   });
    // }
  }

  writeSubmitPhotos() {
    // submit photos logic here
    // const formData = new FormData();
    // formData.append(
    //   "myFile",
    //   this.state.selectedFile,
    //   this.state.selectedFile.name
    // );

    // console.log('details of the uploaded file: ', this.state.selectedFile);
    // axios.post("api/uploadfile", formData);
    axios.post('');
  }

  showUploadedPhotos() {
    // if (this.state.selectedFile) {
    //   return (
    //     <div>
    //       <h2>File Details:</h2>
    //       <p>File Name: {this.state.selectedFile.name}</p>
    //       <p>File Type: {this.state.selectedFile.type}</p>
    //       <p>
    //         Last Modified:{" "}
    //         {this.state.selectedFile.lastModifiedDate.toDateString()}
    //       </p>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div>
    //       <br />
    //       <h4>Choose before Pressing the Upload button</h4>
    //     </div>
    //   );
    // }
  }

  writeNickname(e) {
    this.setState({
      write_name: e.target.value
    });
  }
  writeEmail(e) {
    this.setState({
      write_email: e.target.value
    });
  }


  componentDidMount() {
    var id = this.props.id;
    this.setState({
      id: id
    });
    this.getReviewsByIDHandler(id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      var id = this.props.id;
      this.setState({
        id: id
      });
      this.getReviewsByIDHandler(id);
    }
    if (this.state.reviews !== prevState.reviews) {
      this.setState({
        reviews: this.state.reviews
      });
    }
  }

  setSort(sort) {
    this.setState({
      sort: sort
    });
  }

  getReviewsByIDHandler(id) {
    var count = 100;
    var sort = 'newest'
    var id = this.props.id;
    var url = `/reviews/?sort=${sort}&count=${count}&product_id=${id}`;
    // console.log('getReviewByIDHandler is getting called!');
    $.ajax({
      context: this,
      type: "GET",
      url: url,
      success: (data) => {
        this.setState({
          count: data.count,
          newestReviews: data.results
        });
        sort = 'helpful';
        url = `/reviews/?sort=${sort}&count=${count}&product_id=${id}`;
        $.ajax({
          context: this,
          type: "GET",
          url: url,
          success: (data) => {
            this.setState({
              count: data.count,
              helpfulReviews: data.results
            });
            sort = 'relevant';
            url = `/reviews/?sort=${sort}&count=${count}&product_id=${id}`;
            $.ajax({
              context: this,
              type: "GET",
              url: url,
              success: (data) => {
                this.setState({
                  count: data.count,
                  relevantReviews: data.results,
                  reviews: data.results,
                  reviewReady: true
                });
              },
              error: (error) => {
                console.log('relevant reviews ajax error!');
              }
            });
          },
          error: (error) => {
            console.log('helpful reviews ajax error!');
          }
        })
      }
    })
      .done(function () {
        this.getReviewsMetaHandler(this.state.id);
        this.sortStarReviews();
      });
  }

  getReviewsMetaHandler(id) {
    var url = `/reviews/meta?product_id=${id}`;
    $.ajax({
      context: this,
      type: "GET",
      url: url,
      success: (data) => {
        this.setState({
          meta: data,
          meta_ratings: data.ratings,
          meta_recommended: data.recommended,
          meta_characteristics: data.characteristics,
          metaReady: true
        });
      },
      error: (error) => {
        console.log('error from get reviews meta request: ', error);
      }
    })
      .done(function () {
        // console.log('get reviews meta request is done');
      });
  }

  postReviewHandler() {
    // Comfort: 216800, Fit: 216798, Length: 216799, Quality: 216801, Size: 216819, Width: 216820
    var characteristicsCodes = [];
    var characteristicsList = [];
    var characteristicsValues = [];
    var characteristics = {};
    var id = this.state.id;
    var product_id = this.props.id;
    var meta_characteristics = this.state.meta_characteristics;
    for (var key in meta_characteristics) {
      var characteristic = meta_characteristics[key];
      characteristicsList.push(key);
      characteristicsCodes.push(characteristic.id);
      if (key === 'Size') {
        characteristicsValues.push(this.state.write_characteristic_size);
      }
      else if (key === 'Width') {
        characteristicsValues.push(this.state.write_characteristic_width);
      }
      else if (key === 'Comfort') {
        characteristicsValues.push(this.state.write_characteristic_comfort);
      }
      else if (key === 'Quality') {
        characteristicsValues.push(this.state.write_characteristic_quality);
      }
      else if (key === 'Length') {
        characteristicsValues.push(this.state.write_characteristic_length);
      }
      else if (key === 'Fit') {
        characteristicsValues.push(this.state.write_characteristic_fit);
      }

    }

    for (var i = 0; i < characteristicsCodes.length; i++) {
      var currentKey = characteristicsCodes[i];
      var currentValue = parseInt(characteristicsValues[i]);
      characteristics[currentKey] = currentValue;
    }

    var uploadedPhotos = [];
    var currentPhoto = this.state.selectedFile;
    uploadedPhotos.push(currentPhoto);

    var review = {
      product_id: product_id,
      rating: this.state.write_rating,
      summary: this.state.write_review_summary,
      body: this.state.write_review_body,
      recommend: this.state.write_recommended,
      name: this.state.write_name,
      email: this.state.write_email,
      photos: this.state.write_review_photos,
      // photos: this.state.selectedFile,
      // photos: uploadedPhotos,
      characteristics: characteristics
    };
    var url = '/reviews';
    $.ajax({
      context: this,
      type: "POST",
      url: url,
      data: JSON.stringify(review),
      contentType: 'application/json',
      success: (data) => {
        console.log('review POST ajax success!');
      },
      error: (error) => {
        console.log('error from POST review request: ', error);
      }
    })
      .done(function () {
        // console.log('post reviews request is done');
        this.getReviewsByIDHandler(id);
      });
  }

  putHelpfulHandler(id) {
    var review_id = id;
    var url = `/reviews/${review_id}/helpful`;
    $.ajax({
      context: this,
      type: "PUT",
      url: url,
      statusCode: {
        204: function () {
          // console.log('client ajax mark review helpful success code 204!');
        }
      },
      success: (data) => {
        // console.log('Review was found helpful ajax success!');
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
    var sortValue = e.target.value;
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
    } else if (this.state.sort === 'relevance') {
      this.setState({
        reviews: relevantReviews
      });
    }
  }



  sortStarReviews() {
    var newestReviews = this.state.newestReviews;
    var oneStarReviews = [];
    var twoStarReviews = [];
    var threeStarReviews = [];
    var fourStarReviews = [];
    var fiveStarReviews = [];
    for (var i = 0; i < newestReviews.length; i++) {
      if (newestReviews[i].rating === 1) {
        oneStarReviews.push(newestReviews[i]);
      }
      else if (newestReviews[i].rating === 2) {
        twoStarReviews.push(newestReviews[i]);
      }
      else if (newestReviews[i].rating === 3) {
        threeStarReviews.push(newestReviews[i]);
      }
      else if (newestReviews[i].rating === 4) {
        fourStarReviews.push(newestReviews[i]);
      }
      else if (newestReviews[i].rating === 5) {
        fiveStarReviews.push(newestReviews[i]);
      }
    }
    this.setState({
      one_star_reviews: oneStarReviews,
      two_star_reviews: twoStarReviews,
      three_star_reviews: threeStarReviews,
      four_star_reviews: fourStarReviews,
      five_star_reviews: fiveStarReviews
    })
  }


  recordInteraction(e) {
    this.props.interactions({
      element: e.target.nodeName,
      widget: 'Ratings and Reviews',
      time: new Date().toISOString()
    });
  }

  render() {
    var reviewReady = this.state.reviewReady;
    var metaReady = this.state.metaReady;
    var sort = this.state.sort;
    var list = this.state.reviews;
    var count = list.length;
    var meta_characteristics = this.state.meta_characteristics;
    var meta_recommended = this.state.meta_recommended;
    var meta_ratings = this.state.meta_ratings;

    // console.log('list is: ', list);

    if (!(reviewReady && metaReady)) {
      return (
        <div>
          Loading Ratings and Reviews...
        </div>
      )
    }
    if (reviewReady && metaReady) {
      return (
        <div className="ratings-reviews" id="flex-container" onClick={this.recordInteraction}>
          <div className="rating-breakdown">
            <h3 id='ratings-reviews' id="zero">RATINGS AND REVIEWS</h3>
            <StarNumber recommended={meta_recommended} ratings={meta_ratings} handleRating={this.props.handleRating} handleGetRating={this.props.handleGetRating} />
            <div className="star-table-complete">
              <StarList ratings={meta_ratings} setStarReviews={this.setStarReviews}
               setFilter={this.setFilter} className="star-list-container" showFilterInfo={this.showFilterInfo}
               removeAllFilters={this.removeAllFilters}
                />
              <div className="star-count-container">
                {this.reviewCount()}
              </div>
            </div>
            <ProductBreakdown meta_characteristics={meta_characteristics} />
          </div>
          <div className="review-breakdown">
            <div className="review-header">{count} reviews, sorted by
              <select className="dropdown-sort" id="dropdown-sort" defaultValue={'relevance'} onChange={this.sortReviews} >
                <option value="newest">newest</option>
                <option value="helpful">helpful</option>
                <option value="relevance">relevance</option>
              </select>
            </div>
            <ReviewList reviews={list} onMarkedHelpful={this.putHelpfulHandler}
              onMarkedReported={this.putReportedHandler} productName={this.props.productName}
              postReviewHandler={this.postReviewHandler}
              writeRating={this.writeRating}
              writeRecommended={this.writeRecommended}
              writeSize={this.writeSize}
              writeWidth={this.writeWidth}
              writeComfort={this.writeComfort}
              writeQuality={this.writeQuality}
              writeLength={this.writeLength}
              writeFit={this.writeFit}
              writeReviewSummary={this.writeReviewSummary}
              writeReviewBody={this.writeReviewBody}
              writeUploadPhotos={this.writeUploadPhotos}
              writeSubmitPhotos={this.writeSubmitPhotos}
              showUploadedPhotos={this.showUploadedPhotos}
              writeNickname={this.writeNickname}
              writeEmail={this.writeEmail}
              show_more_reviews={this.state.show_more_reviews}
              alterShowMore={this.alterShowMore}
            />
            {/* <Dashboard /> */}
          </div>
        </div>
      );
    }
  }
}

export default RatingsReviews;