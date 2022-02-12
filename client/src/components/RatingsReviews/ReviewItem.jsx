import React from 'react';

class ReviewItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="wrapper">
				<div className="one" id="review-list">
					<div>&#9734;&#9734;&#9734;&#9734;</div>
					<h3>I'm enjoying wearing these shades</h3>
					<p>Comfortable and practical.</p>
					<sub>Helpful?  Yes | No</sub>
					<hr></hr>
					<div>&#9734;&#9734;&#9734;&#9734;</div>
					<h3>I am liking these glasses</h3>
					<p>Comfortable and practical.</p>
					<img className="photo" id="photo" src="https://cdni.llbean.net/is/image/wim/224547_1_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbprod/A0211793_2" alt="photo missing!"></img>
					<sub>Helpful?  Yes | No</sub>
					<hr></hr>
				</div>
				<div className="two" id="buttons">
					<button>MORE REVIEWS</button>
					<button>ADD A REVIEW</button>
				</div>
			</div>

		);
	}

}

export default ReviewItem;