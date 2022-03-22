import React from 'react';
import Modal from './Modal.jsx';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}

	showModal = () => {
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	render() {
		return (
			<div>
				<Modal show={this.state.show} handleClose={this.hideModal} productName={this.props.productName}
					postReviewHandler={this.props.postReviewHandler}
					writeRating={this.props.writeRating}
					writeRecommended={this.props.writeRecommended}
					writeSize={this.props.writeSize}
					writeWidth={this.props.writeWidth}
					writeComfort={this.props.writeComfort}
					writeQuality={this.props.writeQuality}
					writeLength={this.props.writeLength}
					writeFit={this.props.writeFit}
					writeReviewSummary={this.props.writeReviewSummary}
					writeReviewBody={this.props.writeReviewBody}
					writeUploadPhotos={this.props.writeUploadPhotos}
					writeSubmitPhotos={this.props.writeSubmitPhotos}
					showUploadedPhotos={this.props.showUploadedPhotos}
					writeNickname={this.props.writeNickname}
					writeEmail={this.props.writeEmail}
				/>
				<button className="add-review" type="button" onClick={this.showModal} >
					ADD A REVIEW +
				</button>
			</div>
		);
	}
}

export default Dashboard;