import React from 'react';

class StarList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="two" id="two">
				<p>100% of reviews recommend this product</p>
				<table>
					<tbody>
						<tr>
							<td>5 stars</td>
							<td>
								<div>
									Blue
								</div>
							</td>
						</tr>
						<tr>
							<td>4 stars</td>
							<td>
								<div>
									Green
								</div>
							</td>
						</tr>
						<tr>
							<td>3 stars</td>
							<td>
								<div>
									Blue
								</div>
							</td>
						</tr>
						<tr>
							<td>2 stars</td>
							<td>
								<div>
									Blue
								</div>
							</td>
						</tr>
						<tr>
							<td>1 star</td>
							<td>
								<div>
									Blue
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

		);
	}

}

export default StarList;