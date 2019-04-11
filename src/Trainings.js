import React, { Component } from "react";

class Trainings extends Component {
	constructor(props) {
		super(props);
		this.state = { items: [], value: "test" };
	}

	componentDidMount() {
		fetch("https://customerrest.herokuapp.com/api/trainings")
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
									eachItem.date.includes(this.state.value) ||
									eachItem.duration.includes(this.state.value) ||
									eachItem.activity.includes(this.state.value)
							)
						});
						console.log(123);
					}}
				/>
				<div>{this.state.value}</div>
				<table>
					<thead>
						<tr>
							<th>date</th>
							<th>duration in minutes</th>
							<th>activity</th>
						</tr>
					</thead>
					<tbody>
						{this.state.items.map((eachItem, index) => {
							return (
								<tr key={index}>
									{/* <td>{eachItem.date format("YYYY-MM-DD")}</td> */}
									<td>{eachItem.date}</td>
									<td>{eachItem.duration}</td>
									<td>{eachItem.activity}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Trainings;
