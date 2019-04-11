import React, { Component } from "react";

class Customers extends Component {
	state = {
		items: [],
		value: "wang"
	};

	componentDidMount() {
		fetch("https://customerrest.herokuapp.com/api/customers")
			.then(response => {
				return response.json();
			})
			.then(jsonData => {
				console.log(jsonData);
				this.setState({ items: jsonData.content });
			});
	}

	render() {
		return (
			<div>
				Search:{" "}
				<input
					type="text"
					name="fname"
					onChange={event => {
						console.log(event.currentTarget.value);
						this.setState({ value: event.currentTarget.value });
					}}
				/>
				<input
					type="submit"
					value="Submit"
					onClick={event => {
						this.setState({
							items: this.state.items.filter(
								eachItem =>
									eachItem.firstname.includes(this.state.value) ||
									eachItem.lastname.includes(this.state.value) ||
									eachItem.streetaddress.includes(this.state.value) ||
									eachItem.postcode.includes(this.state.value) ||
									eachItem.city.includes(this.state.value) ||
									eachItem.email.includes(this.state.value) ||
									eachItem.phone.includes(this.state.value)
							)
						});
						console.log(123);
					}}
				/>
				<div>{this.state.value}</div>
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
						{this.state.items.map((eachItem, index) => {
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
