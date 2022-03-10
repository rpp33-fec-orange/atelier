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
			reported: false
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

	}

	reportReview() {

	}

	componentDidMount() {
		this.setState({
			review: this.props.review,
			ratingReview: this.props.review.rating,
			helpfulness: this.props.review.helpfulness,
			reviewID: this.props.review - id
		});
	}


	render() {
		console.log('this is this.state.review: ', this.state.review);
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
								<span className="helpful-marked">Yes</span>
						}
						{
							`${this.state.helpfulness}   |   `
						}
						{
							!this.state.reported
							?
							<span className="report-unmarked" onClick={this.reportReview}>Report</span>
							:
							<span className="report-marked">Report</span>
						}
					</div>
					{this.state.review.recommend &&
						<div>
							✔ I recommend this product
						</div>
					}
					<div className="productPhoto">
						<sub>Product Photo: </sub>
						{this.state.review.photos.length > 0
							? <div>
								{this.state.review.photos}
							</div>
							: <div>
								<img src='https://i.vimeocdn.com/portrait/1274237_300x300.jpg' />
							</div>
						}
					</div>
					<hr></hr>
				</div>
			</div>
		);
	}
}

export default ReviewItem;