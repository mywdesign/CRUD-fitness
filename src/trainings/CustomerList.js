import React, { Component } from "react";
import TrainingsList from "./List";

class CustomerTrainingsList extends Component {
	state = {
		trainings: []
	};

	componentDidMount() {
		const endpoint = this.props.links.find(
			link => link.rel === this.props.type
		);
		fetch(`${endpoint.href}`)
			.then(response => {
				return response.json();
			})
			.then(jsonData => {
				this.setState({ trainings: jsonData.content });
			});
	}

	render() {
		return <TrainingsList trainings={this.state.trainings} />;
	}
}

export default CustomerTrainingsList;
