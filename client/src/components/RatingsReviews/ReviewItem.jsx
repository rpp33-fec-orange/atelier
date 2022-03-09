import React from 'react';
import Modal from './Modal.jsx';
import Dashboard from './Dashboard.jsx';
import StarRating from './StarRating.jsx';

class ReviewItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			review: props.review,
			recommend: true,
			ready: false,
			ratingReview: 0,
			helpful: false,
			reported: false
		}
		this.getRecommendation = this.getRecommendation.bind(this);
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

	componentDidMount() {
		this.setState({
      ratingReview: this.props.review.rating
		});
	}


	render() {
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

					}
				Ï	 <span className="yes">Yes</span> ({this.state.review.helpfulness})  | <span className="report">Report</span>
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
						<img src = 'https://i.vimeocdn.com/portrait/1274237_300x300.jpg' />
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