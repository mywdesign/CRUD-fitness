import React, { Component } from 'react';
import Moment from 'react-moment';

class TrainingsList extends Component {
	render() {
		return (
			<div>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Date</th>
							<th scope="col">Duration (mins)</th>
							<th scope="col">Activity</th>
							<th scope="col">Delete</th>
						</tr>
					</thead>
					<tbody>
						{this.props.trainings.map((eachItem, index) => {
							return (
								<tr key={index}>
									<td>
										<Moment format="DD.MM.YYYY HH:mm:ss">{eachItem.date}</Moment>
									</td>
									<td>{eachItem.duration}</td>
									<td>{eachItem.activity}</td>
									<td>
										<button type="button" className="btn btn-danger">
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default TrainingsList;
