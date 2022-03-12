import React from 'react';

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			productName: ''
		}
	}

	componentDidMount() {
		this.setState({
			productName: this.props.productName
		});
	}

	componenetDidUpdate(prevProps) {
		if (this.props.productName !== prevProps.productName) {
			var productName = this.props.productName;
			this.setState({
				productName: productName
			});
		}
	}

	render() {
		const showHideClassName = this.props.show ? "modal-rr display-block" : "modal-rr display-none";

		return (
			<div className={showHideClassName} >
				<section className="modal-rr-main">
					<div className="modal-rr-container">
						<h1>Write Your Review</h1>
						<p>About the {this.props.productName}: </p>
						<div className="modal-rr-overallrating">
							&#9734;&#9734;&#9734;&#9734;&#9734;
						</div>
						<p>Do you recommend this product?</p>
						<div className="modal-rr-recommended" >
							<div>
								<input type="radio" id="yes" name="recommended" value="yes" onChange={this.props.writeRecommended} />
								<label htmlFor="yes">Yes</label>
							</div>
							<div>
								<input type="radio" id="no" name="recommended" value="no" onChange={this.props.writeRecommended} />
								<label htmlFor="no">No</label>
							</div>
						</div>
						<br></br>
						<div className="characteristics">
							Characteristics:
							<div>Size:
								<input type="radio" id="size1" name="characteristics-size" value="size1" onChange={this.props.writeSize} />
								<label htmlFor="size1">1</label>
								<input type="radio" id="size2" name="characteristics-size" value="size2" onChange={this.props.writeSize} />
								<label htmlFor="size2">2</label>
								<input type="radio" id="size3" name="characteristics-size" value="size3" onChange={this.props.writeSize} />
								<label htmlFor="size3">3</label>
								<input type="radio" id="size4" name="characteristics-size" value="size4" onChange={this.props.writeSize} />
								<label htmlFor="size4">4</label>
								<input type="radio" id="size5" name="characteristics-size" value="size5" onChange={this.props.writeSize} />
								<label htmlFor="size5">5</label>
							</div>
							<div>Width:
								<input type="radio" id="width1" name="characteristics-width" value="width1" onChange={this.props.writeWidth} />
								<label htmlFor="width1">1</label>
								<input type="radio" id="width2" name="characteristics-width" value="width2" onChange={this.props.writeWidth} />
								<label htmlFor="width2">2</label>
								<input type="radio" id="width3" name="characteristics-width" value="width3" onChange={this.props.writeWidth} />
								<label htmlFor="width3">3</label>
								<input type="radio" id="width4" name="characteristics-width" value="width4" onChange={this.props.writeWidth} />
								<label htmlFor="width4">4</label>
								<input type="radio" id="width5" name="characteristics-width" value="width5" onChange={this.props.writeWidth} />
								<label htmlFor="width5">5</label>
							</div>
							<div>Comfort:
								<input type="radio" id="comfort1" name="characteristics-comfort" value="comfort1" onChange={this.props.writeComfort} />
								<label htmlFor="comfort1">1</label>
								<input type="radio" id="comfort2" name="characteristics-comfort" value="comfort2" onChange={this.props.writeComfort} />
								<label htmlFor="comfort2">2</label>
								<input type="radio" id="comfort3" name="characteristics-comfort" value="comfort3" onChange={this.props.writeComfort} />
								<label htmlFor="comfort3">3</label>
								<input type="radio" id="comfort4" name="characteristics-comfort" value="comfort4" onChange={this.props.writeComfort} />
								<label htmlFor="comfort4">4</label>
								<input type="radio" id="comfort5" name="characteristics-comfort" value="comfort5" onChange={this.props.writeComfort} />
								<label htmlFor="comfort5">5</label>
							</div>
							<div>Quality:
								<input type="radio" id="quality1" name="characteristics-quality" value="quality1" onChange={this.props.writeQuality} />
								<label htmlFor="comfort1">1</label>
								<input type="radio" id="quality2" name="characteristics-quality" value="quality2" onChange={this.props.writeQuality} />
								<label htmlFor="comfort2">2</label>
								<input type="radio" id="quality3" name="characteristics-quality" value="quality3" onChange={this.props.writeQuality} />
								<label htmlFor="comfort3">3</label>
								<input type="radio" id="quality4" name="characteristics-quality" value="quality4" onChange={this.props.writeQuality} />
								<label htmlFor="comfort4">4</label>
								<input type="radio" id="quality5" name="characteristics-quality" value="quality5" onChange={this.props.writeQuality} />
								<label htmlFor="comfort5">5</label>
							</div>
							<div>Length:
								<input type="radio" id="length1" name="characteristics-length" value="length1" onChange={this.props.writeLength} />
								<label htmlFor="length1">1</label>
								<input type="radio" id="length2" name="characteristics-length" value="length2" onChange={this.props.writeLength} />
								<label htmlFor="length2">2</label>
								<input type="radio" id="length3" name="characteristics-length" value="length3" onChange={this.props.writeLength} />
								<label htmlFor="length3">3</label>
								<input type="radio" id="length4" name="characteristics-length" value="length4" onChange={this.props.writeLength} />
								<label htmlFor="length4">4</label>
								<input type="radio" id="length5" name="characteristics-length" value="length5" onChange={this.props.writeLength} />
								<label htmlFor="length5">5</label>
							</div>
							<div>Fit:
								<input type="radio" id="fit1" name="characteristics-fit" value="fit1" onChange={this.props.writeFit}/>
								<label htmlFor="fit1">1</label>
								<input type="radio" id="fit2" name="characteristics-fit" value="fit2" onChange={this.props.writeFit}/>
								<label htmlFor="fit2">2</label>
								<input type="radio" id="fit3" name="characteristics-fit" value="fit3" onChange={this.props.writeFit}/>
								<label htmlFor="fit3">3</label>
								<input type="radio" id="fit4" name="characteristics-fit" value="fit4" onChange={this.props.writeFit}/>
								<label htmlFor="fit4">4</label>
								<input type="radio" id="fit5" name="characteristics-fit" value="fit5" onChange={this.props.writeFit}/>
								<label htmlFor="fit5">5</label>
							</div>
						</div>
						<br></br>
						<div className="review-summary">
							<label htmlFor="summary">Review summary:    </label>
							<input type="text" id="summary" name="summary" required
								minLength="4" maxLength="60" size="70" onChange={this.props.writeReviewSummary}/>
						</div>
						<br></br>
						<div className="review-body">
							<label htmlFor="body">Review body:    </label>
							<textarea id="body" name="body" rows="5" cols="33" defaultValue="Why did you like the product or not?" required
								minLength="50" maxLength="1000" size="1020" onChange={this.props.writeReviewBody}>
							</textarea>
						</div>
						<br></br>
						<div className="upload-photo">Upload your photos:
							<button className="upload" type="button" onChange={this.props.writeUploadPhotos}>
								Upload
							</button>
						</div>
						<br></br>
						<div className="nickname">
							<label htmlFor="nickname">What is your nickname?    </label>
							<input type="text" id="nickname" name="nickname" placeholder="Example: jackson11!" required
								minLength="1" maxLength="60" size="70" onChange={this.props.writeNickname}/>
							<sub>   For privacy reasons, do not use your full name or email address</sub>
						</div>
						<br></br>
						<div className="email">
							<label htmlFor="email">Your email:    </label>
							<input type="text" id="email" name="email" placeholder="Example: jackson11@email.com" required
								minLength="1" maxLength="60" size="70" onChange={this.props.writeEmail}/>
							<sub>    For authentication reasons, you will not be emailed</sub>
						</div>
						<br></br>
						<div>
							<button className="submit" type="button">
								Submit
							</button>
						</div>
						<button className="close" type="button" onClick={this.props.handleClose}>
							Close
						</button>
					</div>
				</section>
			</div>
		);
	}
}


export default Modal;


