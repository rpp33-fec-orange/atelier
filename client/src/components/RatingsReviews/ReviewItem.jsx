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
			photos: []
		}
		this.getRecommendation = this.getRecommendation.bind(this);
		this.markReviewHelpful = this.markReviewHelpful.bind(this);
		this.reportReview = this.reportReview.bind(this);
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
		this.setState({
			review: this.props.review,
			ratingReview: this.props.review.rating,
			helpfulness: this.props.review.helpfulness,
			reviewID: this.props.review.review_id,
			photos: this.props.review.photos
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.review !== prevProps.review) {
			this.setState({
				review: this.props.review,
				ratingReview: this.props.review.rating,
				helpfulness: this.props.review.helpfulness,
				reviewID: this.props.review.review_id,
				photos: this.props.review.photos
			});
		}
	}

	render() {
		// console.log('this is this.state.review: ', this.state.review);
		return (
			<div className="wrapper">
				<div className="one" id="review-list">
					<div className="star-review-container">
						<StarRating num={this.props.review.rating} />
						<div className="user-and-date">
							{this.state.review.reviewer_name}, {this.state.review.date}
						</div>
					</div>
					<h3 className="review-summary">{this.state.review.summary}</h3>
					<p className="review-body">{this.state.review.body}</p>
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
									this.state.review.photos.map((photo) =>
										<img className="review-photo" src={photo.url} key={photo.id}></img>
									)
								}
							</div>
							:
							<div></div>
							//  <div>
							// 	<br />
							// 	<button className="submit-btn">Submit Photos</button>
							// </div>
						}
					</div>
					<hr></hr>
				</div>
			</div>
		);
	}
}

export default ReviewItem;