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
				<Modal show={this.state.show} handleClose={this.hideModal} />
				<button className="add-review" type="button" onClick={this.showModal} >
					ADD A REVIEW +
				</button>
			</div>
		);
	}
}

export default Dashboard;