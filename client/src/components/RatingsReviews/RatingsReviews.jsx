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
import axios from 'axios';

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
      write_review_photos: ['https://d23.com/app/uploads/2019/06/1180w-600h_061819_tarzan-20th-anniversary.jpg'],
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
      fit_key: 0
    }
    this.getReviewsByIDHandler = this.getReviewsByIDHandler.bind(this);
    this.getReviewsMetaHandler = this.getReviewsMetaHandler.bind(this);
    this.postReviewHandler = this.postReviewHandler.bind(this);
    this.putHelpfulHandler = this.putHelpfulHandler.bind(this);
    this.sortReviews = this.sortReviews.bind(this);
    this.setReviews = this.setReviews.bind(this);
    this.recordInteraction = this.recordInteraction.bind(this);

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

  writeRating(e) {
    var write_rating = parseInt(e.target.getAttribute('data-value'));
    this.setState({
      write_rating: write_rating
    })
  }

  writeRecommended(e) {
    this.setState({
      write_recommended: e.target.value
    });
    console.log('button was clicked!');
  }

  writeSize(e) {
    this.setState({
      write_recharacteristic_size: e.target.value
    });
    console.log('button was clicked!');
  }

  writeWidth(e) {
    this.setState({
      write_characteristic_width: e.target.value
    });
    console.log('button was clicked!');
  }
  writeComfort(e) {
    this.setState({
      write_characteristic_comfort: e.target.value
    });
    console.log('button was clicked!');
  }
  writeQuality(e) {
    this.setState({
      write_characteristic_quality: e.target.value
    });
    console.log('button was clicked!');
  }
  writeLength(e) {
    this.setState({
      write_characteristic_length: e.target.value
    });
    console.log('button was clicked!');
  }
  writeFit(e) {
    this.setState({
      write_characteristic_fit: e.target.value
    });
    console.log('button was clicked!');
  }
  writeReviewSummary(e) {
    this.setState({
      write_review_summary: e.target.value
    });
    console.log('button was clicked!');
  }
  writeReviewBody(e) {
    this.setState({
      write_review_body: e.target.value
    });
    console.log('button was clicked!');
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
    console.log('button was clicked!');
  }
  writeEmail(e) {
    this.setState({
      write_email: e.target.value
    });
    console.log('button was clicked!');
  }


  componentDidMount() {
    var id = this.props.id;
    this.setState({
      id: id
    });
    this.getReviewsByIDHandler(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      var id = this.props.id;
      this.setState({
        id: id
      });
      this.getReviewsByIDHandler(id);
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
      });
  }

  getReviewsMetaHandler(id) {
    var url = `/reviews/meta?product_id=${id}`;
    $.ajax({
      context: this,
      type: "GET",
      url: url,
      success: (data) => {
        console.log('getReviewsMetaHandler ajax data is: ', data);
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

      console.log('key is: ', key);
      console.log('key id is: ', key.id);
      var characteristic = meta_characteristics[key];
      console.log('characteristic id is: ', characteristic.id);
      // if(key === 'Size') {
      //   console.log('we got a match');
      //   characteristics[JSON.stringify(216801)] = this.state.write_characteristic_size;

      // }
      // console.log('characteristics object is: ', characteristics);

      characteristicsList.push(key);
      characteristicsCodes.push(characteristic.id);

      console.log('key is: ', key);
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

    // console.log('size_key is: ', this.state.size_key);
    // console.log('width_key is: ', this.state.width_key);
    // console.log('comfort_key is: ', this.state.comfort_key);
    // console.log('quality_key is: ', this.state.quality_key);
    // console.log('length_key is: ', this.state.length_key);
    // console.log('fit_key is: ', this.state.fit_key);
    // console.log('characteristicsList is: ', characteristicsList);
    // console.log('characteristicsCodes is: ', characteristicsCodes);
    // console.log('characteristicsValues is: ', characteristicsValues);

    for (var i = 0; i < characteristicsCodes.length; i++) {
      var currentKey = characteristicsCodes[i];
      var currentValue = parseInt(characteristicsValues[i]);
      characteristics[currentKey] = currentValue;
    }

    // console.log('characteristics object becomes: ', characteristics);
    // console.log('characteristics in ajax call are: ', characteristics);
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
    console.log('review in postReviewHandler is: ', review);
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
    } else if (this.state.sort === 'relevant') {
      this.setState({
        reviews: relevantReviews
      });
    }
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
    // console.log('list is: ', list);

    var count = list.length;
    var meta_characteristics = this.state.meta_characteristics;
    var meta_recommended = this.state.meta_recommended;
    var meta_ratings = this.state.meta_ratings;
    // console.log('characteristics are: ', meta_characteristics);

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
            <StarList ratings={meta_ratings} />
            <SizeSlider size={meta_characteristics} />
            <ComfortSlider comfort={meta_characteristics} />
          </div>
          <div className="review-breakdown">
            <div className="review-header">{count} reviews, sorted by
              <select className="dropdown-sort" id="dropdown-sort" defaultValue={'relevant'} onChange={this.sortReviews} >
                <option value="newest">newest</option>
                <option value="helpful">helpful</option>
                <option value="relevant">relevant</option>
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
            />
            {/* <Dashboard /> */}
          </div>
        </div>
      );
    }
  }
}

export default RatingsReviews;