import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";

class NewCustomerForm extends Component {
	state = {
		firstname: "",
		lastname: "",
		postcode: "",
		city: "",
		phone: "",
		email: "",
		street: ""
	};

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
						<Form.Label>First name</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							type="text"
							placeholder="firstname"
							name="firstname"
						/>
					</Form.Group>

					<Form.Group as={Col}>
						<Form.Label>Lastname</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							type="text"
							placeholder="Lastname"
							name="lastname"
						/>
					</Form.Group>
				</Form.Row>
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Email</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							type="email"
							placeholder="Enter email"
							name="email"
						/>
					</Form.Group>

					<Form.Group as={Col}>
						<Form.Label>Phone</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							type="text"
							placeholder="Phone"
							name="phone"
						/>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Street Address</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							type="text"
							placeholder="Street Address"
							name="street"
						/>
					</Form.Group>

					<Form.Group as={Col}>
						<Form.Label>Postcode</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							type="text"
							placeholder="Postcode"
							name="postcode"
						/>
					</Form.Group>

					<Form.Group as={Col}>
						<Form.Label>City</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							type="text"
							placeholder="City"
							name="city"
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

export default NewCustomerForm;
