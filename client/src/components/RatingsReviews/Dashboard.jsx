import React from 'react';
import Modal from './Modal.js';

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
        <button id="modal-btn" onClick={this.showModal} >This is a Modal</button>
			  <div className="modal">Hello
					<div className="modal-content">
          <span className="close-btn" onClick={this.hideModal}>&times;</span>
					<p>this is the text inside the modal</p>
				  </div>
				</div>
			</div>
		);
	}
}

export default Dashboard;