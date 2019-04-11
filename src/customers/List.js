import React, { Component } from "react";

class CustomersList extends Component {
	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">Firstname</th>
						<th scope="col">Lastname</th>
						<th scope="col">Street</th>
						<th scope="col">Postcode</th>
						<th scope="col">City</th>
						<th scope="col">Email</th>
						<th scope="col">Phone</th>
						<th scope="col">Trainings</th>
						<th scope="col">Add training</th>
						<th scope="col">Delete Customer</th>
					</tr>
				</thead>
				<tbody>
					{this.props.customers.map((eachItem, index) => {
						return (
							<tr key={index}>
								<td>{eachItem.firstname}</td>
								<td>{eachItem.lastname}</td>
								<td>{eachItem.streetaddress}</td>
								<td>{eachItem.postcode}</td>
								<td>{eachItem.city}</td>
								<td>{eachItem.email}</td>
								<td>{eachItem.phone}</td>
								<td>
									<button
										type="button"
										className="btn btn-primary"
										onClick={() => {
											this.props.onCheckTrainings(eachItem.links);
										}}
									>
										Check
									</button>
								</td>
								<td>
									<button type="button" className="btn btn-secondary">
										Add
									</button>
								</td>
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
		);
	}
}

export default CustomersList;
