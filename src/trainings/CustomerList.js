import React, { Component } from "react";
import TrainingsList from "./List";

class CustomerTrainingsList extends Component {
	state = {
		trainings: []
	};

	handleDeleteTraining = (training, index) => {
		fetch(training.links[0].href, {
			method: "delete"
		}).then(response =>
			this.setState({
				trainings: this.state.trainings.filter((c, idx) => idx !== index)
			})
		);
	};

	componentDidMount() {
		fetch(`${this.props.link}`)
			.then(response => {
				return response.json();
			})
			.then(jsonData => {
				this.setState({ trainings: jsonData.content });
			});
	}

	render() {
		return (
			<TrainingsList
				trainings={this.state.trainings}
				onDelete={this.handleDeleteTraining}
			/>
		);
	}
}

export default CustomerTrainingsList;
