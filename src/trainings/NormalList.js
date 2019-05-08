import React, { Component } from "react";
import Moment from "react-moment";
import { API } from "../config";

class NormalTrainingsList extends Component {
	state = {
		searchTerm: "",
		trainings: []
	};

	componentDidMount() {
		fetch(`${API}/trainings`)
			.then(response => {
				return response.json();
			})
			.then(jsonData => {
				this.setState({ trainings: jsonData.content });
			});
	}

	delete = (training, index) => {
		fetch(training.links[0].href, {
			method: "delete"
		}).then(response =>
			this.setState({
				trainings: this.state.trainings.filter((c, idx) => idx !== index)
			})
		);
	};

	getList = () => {
		const searchTerm = this.state.searchTerm.toLowerCase();
		return this.state.trainings.filter(
			eachItem =>
				(eachItem.date &&
					eachItem.date
						.toString()
						.toLowerCase()
						.includes(searchTerm)) ||
				(eachItem.duration &&
					eachItem.duration
						.toString()
						.toLowerCase()
						.includes(searchTerm)) ||
				(eachItem.activity &&
					eachItem.activity
						.toString()
						.toLowerCase()
						.includes(searchTerm))
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
							<th scope="col">Date</th>
							<th scope="col">Duration (mins)</th>
							<th scope="col">Activity</th>
							<th scope="col">Delete</th>
						</tr>
					</thead>
					<tbody>
						{this.getList().map((eachItem, index) => {
							return (
								<tr key={index}>
									<td>
										<Moment format="YYYY-MM-DD HH:mm:ss">
											{eachItem.date}
										</Moment>
									</td>
									<td>{eachItem.duration}</td>
									<td>{eachItem.activity}</td>

									<td>
										<button
											type="button"
											className="btn btn-danger"
											onClick={() => {
												if (window.confirm("Are you sure to remove?")) {
													this.delete(eachItem, index);
												}
											}}
										>
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

export default NormalTrainingsList;
