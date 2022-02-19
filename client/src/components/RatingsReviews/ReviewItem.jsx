import React from 'react';

const ReviewItem = (props) => {
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
					<p>&#9734;&#9734;&#9734;&#9734;                    {props.review.reviewer_name}, {props.review.date}</p>
					<h3>{props.review.summary}</h3>
					<p>{props.review.body}</p>
					<sub>Helpful?  Yes ({props.review.helpfulness})  |  Report</sub>
					<hr></hr>
				</div>
			</div>
		);
	}

export default ReviewItem;