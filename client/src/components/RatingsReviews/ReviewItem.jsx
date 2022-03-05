import React from 'react';
import Modal from './Modal.jsx';
import Dashboard from './Dashboard.jsx';

class ReviewItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			review: props.review,
			recommend: true,
			ready: false
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


	render() {
		console.log('can i get props in ReviewItem: ', this.props);
		return (
			// <div className="wrapper">
			// 	<div className="one" id="review-list">
			// 		<p>&#9734;&#9734;&#9734;&#9734;                    User1234, January 1, 2019</p>
			// 		<h3>I'm enjoying wearing these shades</h3>
			// 		<p>Comfortable and practical.</p>
			// 		<sub>Helpful?  Yes (10)  |  Report</sub>
			// 		<hr></hr>
			// 		<p>&#9734;&#9734;&#9734;&#9734;                     Cognito, April 2, 2019</p>
			// 		<h3>I am liking these glasses</h3>
			// 		<p>Comfortable and practical.</p>
			// 		<img className="photo" id="photo" src="https://cdni.llbean.net/is/image/wim/224547_1_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbprod/A0211793_2" alt="photo missing!"></img>
			// 		<sub>Helpful?  Yes (10) | Report</sub>
			// 		<hr></hr>
			// 	</div>
			// 	<div className="two" id="buttons">
			// 		<button>MORE REVIEWS</button>
			// 		<button>ADD A REVIEW</button>
			// 	</div>
			// </div>

			<div className="wrapper">
				<div className="one" id="review-list">
					<p>&#9734;&#9734;&#9734;&#9734;                    {this.state.review.reviewer_name}, {this.state.review.date}</p>
					<h3>{this.state.review.summary}</h3>
					<p>{this.state.review.body}</p>
					<sub>Helpful?  Yes ({this.state.review.helpfulness})  |  Report</sub>
					{this.state.review.recommend &&
						<div>
							✔ I recommend this product
						</div>
					}
					<p>Do you recommend this product?</p>
					<div className="modal-recommended" >
						<div>
								<input type="radio" id="yes" name="recommended" value="yes" />
							  <label htmlFor="yes">Yes</label>
						</div>
						<div>
								<input type="radio" id="no" name="recommended" value="no" />
							  <label htmlFor="no">No</label>
						</div>
					</div>
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
						{/* <img src = 'https://i.vimeocdn.com/portrait/1274237_300x300.jpg' /> */}
					</div>
					<hr></hr>
				</div>
			</div>
		);
	}
}

export default ReviewItem;