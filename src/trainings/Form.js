import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";

class TrainingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: "",
			time: "",
			duration: "",
			activity: ""
		};
	}

	handleChange = evt => {
		this.setState({ [evt.target.name]: evt.target.value });
	};
	render() {
		return (
			<Form
				style={{
					width: "100%",
					textAlign: "left",
					border: "1px solid #eee",
					padding: "20px"
				}}
				onSubmit={e => {
					e.preventDefault();
					this.props.onSubmit(this.state);
				}}
			>
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Date</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							value={this.state.date}
							type="date"
							placeholder="date"
							name="date"
							required
						/>
					</Form.Group>

					<Form.Group as={Col}>
						<Form.Label>Time</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							value={this.state.time}
							type="time"
							placeholder="time"
							name="time"
							required
						/>
					</Form.Group>

					<Form.Group as={Col}>
						<Form.Label>Duration</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							value={this.state.duration}
							type="text"
							placeholder="duration in mins"
							name="duration"
							required
						/>
					</Form.Group>
				</Form.Row>
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Activity</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							value={this.state.activity}
							type="activity"
							placeholder="Enter activity"
							name="activity"
							required
						/>
					</Form.Group>
				</Form.Row>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		);
	}
}

export default TrainingForm;
