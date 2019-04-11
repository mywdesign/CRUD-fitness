import React, { Component } from "react";
import { API } from "./config";

class Customers extends Component {
	state = {
		customers: [],
		searchTerm: ""
	};

	componentDidMount() {
		fetch(`${API}/customers`)
			.then(response => {
				return response.json();
			})
			.then(jsonData => {
				console.log(jsonData);
				this.setState({ customers: jsonData.content });
			});
	}

	getList = () => {
		const searchTerm = this.state.searchTerm.toLowerCase();
		return this.state.customers.filter(
			eachItem =>
				eachItem.firstname.toLowerCase().includes(searchTerm) ||
				eachItem.lastname.toLowerCase().includes(searchTerm) ||
				eachItem.streetaddress.toLowerCase().includes(searchTerm) ||
				eachItem.postcode.toLowerCase().includes(searchTerm) ||
				eachItem.city.toLowerCase().includes(searchTerm) ||
				eachItem.email.toLowerCase().includes(searchTerm) ||
				eachItem.phone.toLowerCase().includes(searchTerm)
		);
	};

	render() {
		return (
			<div>
				<div className="row justify-content-around m-3">
					<div className="input-group col-4">
						<input
							type="text"
							className="form-control"
							placeholder="Search any fields..."
							aria-label="Search any fields..."
							onChange={event => {
								this.setState({ searchTerm: event.currentTarget.value });
							}}
						/>
					</div>
				</div>

				<table className="table">
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
						{this.getList().map((eachItem, index) => {
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
										<button type="button" className="btn btn-primary">
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
			</div>
		);
	}
}

export default Customers;
