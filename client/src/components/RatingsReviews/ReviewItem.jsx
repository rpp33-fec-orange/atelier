import React from 'react';
import Modal from './Modal.jsx';
import Dashboard from './Dashboard.jsx';
import StarRating from './StarRating.jsx';

class ReviewItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			review: {},
			reviewID: 0,
			recommend: true,
			ready: false,
			ratingReview: 0,
			helpfulness: 0,
			markedHelpful: false,
			reported: false,
			photos: [],
			show_more: true,
			short_review: '',
			length: 0,
			zoom_photos: false,
			zoomPhotos: 'unzoom-photos',
			zoom_list: {}
		}
		this.getRecommendation = this.getRecommendation.bind(this);
		this.markReviewHelpful = this.markReviewHelpful.bind(this);
		this.reportReview = this.reportReview.bind(this);
		this.showMore = this.showMore.bind(this);
		this.showLess = this.showLess.bind(this);
		this.handleZoom = this.handleZoom.bind(this);
		this.handleUnzoom = this.handleUnzoom.bind(this);
		this.displayPhotos = this.displayPhotos.bind(this);

	}

	displayPhotos() {
		const photoList = this.state.photos.map((photo) =>
			<li>
				<img className="review-photo" src={photo.url} alt='atelier product photo should be here!' key={photo.id} data-value={photo.id} onClick={this.handleZoom}></img>
				<div className={this.state.zoom_list[photo.id]} >
					<img className="modal-photo" src={photo.url} alt='modal photo should be here!' key={photo.id} ></img>
					<button data-value={photo.id} onClick={this.handleUnzoom}>Close</button>
				</div>
			</li>
		);
		return (
			<ul>
				{photoList}
			</ul>
		)
	}

	showMore() {
		this.setState({
			show_more: true
		});
	}

	showLess() {
		this.setState({
			show_more: false
		});
	}

	handleZoom(e) {
		var photoID = e.target.getAttribute('data-value');
		var currentZoomList = this.state.zoom_list;
		currentZoomList[photoID] = 'zoom-photos';
		this.setState({
			zoom_photos: true,
			zoom_list: currentZoomList
		})
	}

	handleUnzoom(e) {
		var photoID = e.target.getAttribute('data-value');
		var currentZoomList = this.state.zoom_list;
		currentZoomList[photoID] = 'unzoom-photos';
		this.setState({
			zoom_photos: true,
			zoom_list: currentZoomList
		})
	}

	getRecommendation(event) {
		event.preventDefault();
		this.setState({
			recommend: event.target.value
		});
	}

	isReady() {
		var propsReady = this.state.ready;

	}

	markReviewHelpful() {
		var reviewID = this.state.reviewID;
		var helpfulness = this.state.helpfulness + 1;
		this.setState({
			helpfulness: helpfulness,
			markedHelpful: true
		}, this.props.onMarkedHelpful(reviewID));
	}

	reportReview() {
		var reviewID = this.state.reviewID;
		this.setState({
			reported: true
		}, this.props.onMarkedReported(reviewID));
	}

	componentDidMount() {
		var short_review = '';
		if (this.props.review.body.length > 250) {
			short_review = this.props.review.body.slice(0, 250);
			this.setState({
				show_more: false
			});
		} else {
			this.setState({
				show_more: true
			})
		}

		this.setState({
			review: this.props.review,
			ratingReview: this.props.review.rating,
			helpfulness: this.props.review.helpfulness,
			reviewID: this.props.review.review_id,
			photos: this.props.review.photos,
			short_review: short_review,
			length: this.props.review.body.length
		});

		var zoomList = {};
		for (var i = 0; i < this.props.review.photos.length; i++) {
			var currentPhoto = this.props.review.photos[i];
			zoomList[currentPhoto.id] = "unzoom-photos";
		}
		this.setState({
			zoom_list: zoomList
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.review !== prevProps.review) {
			this.setState({
				review: this.props.review,
				ratingReview: this.props.review.rating,
				helpfulness: this.props.review.helpfulness,
				reviewID: this.props.review.review_id,
				photos: this.props.review.photos
			});
		}
		if (this.state.zoom_photos != prevState.zoom_photos) {
			var zoomPhotos = this.state.zoom_photos ? "zoom-photos" : "unzoom-photos";
			this.setState({
				zoomPhotos: zoomPhotos
			})
		}
	}

	render() {
		var date = new Date(this.state.review.date);
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var unformattedMonth = date.getMonth();
		var month = months[unformattedMonth - 1];
		var year = date.getFullYear();
		var day = JSON.stringify(date.getDay());
		if (day.length < 2) {
			day = '0' + day;
		}
		var length = this.state.length;
		let display;
		if (this.state.length > 250) {

			if (!this.state.show_more) {
				// short reviews here with button, when button is pressed, switch show_more state to yes, then render based on yes or no
				display = <div>
					<div>{this.state.short_review}...
						<div className="show-more-less" onClick={this.showMore}>&nbsp;&nbsp;&nbsp;Show more</div>
					</div>
				</div>
			} else if (this.state.show_more) {
				// full review here
				display = <div>
					<div className="review-body">{this.state.review.body}
						<div className="show-more-less" onClick={this.showLess}>&nbsp;&nbsp;&nbsp;Show less</div>
					</div>
				</div>
			}
		} else {
			display = <div className="review-body">{this.state.review.body}</div>
		}

		return (
			<div className="wrapper" >
				<div className="one" id="review-list">
					<div className="star-review-container">
						<StarRating num={this.props.review.rating} />
						<div className="user-and-date">
							{this.state.review.reviewer_name}, {month} {day}, {year}
						</div>
					</div>
					<h3 className="review-summary">{this.state.review.summary}</h3>
					<div>{display}</div>
					<br></br>
					<div className="helpful">Helpful?
						{
							!this.state.markedHelpful
								?
								<span className="helpful-unmarked" onClick={this.markReviewHelpful}>Yes</span>
								:
								<span className="helpful-marked">   Yes   </span>
						}
						{
							`(${this.state.helpfulness})   |   `
						}
						{
							!this.state.reported
								?
								<span className="report-unmarked" onClick={this.reportReview}>   Report   </span>
								:
								<span className="report-marked">Reported</span>
						}
					</div>
					{this.state.review.recommend &&
						<div>
							✔ I recommend this product
						</div>
					}
					<div className="productPhoto">
						{this.state.photos.length > 0
							? <div className="review-photo-container">
								<sub>Review Photos: </sub>
								<br></br><br></br>
								{
									this.displayPhotos()
								}
							</div>
							:
							<div></div>
						}
					</div>
					<hr></hr>
				</div>
			</div>
		);
	}
}

export default ReviewItem;