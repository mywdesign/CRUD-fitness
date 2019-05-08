import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

class CustomerForm extends Component {
	constructor(props) {
		super(props);
		const { firstname, lastname, postcode, city, phone, email, streetaddress, links } = this.props.customer;
		this.state = {
			firstname: firstname || '',
			lastname: lastname || '',
			postcode: postcode || '',
			city: city || '',
			phone: phone || '',
			email: email || '',
			streetaddress: streetaddress || '',
			links: links || []
		};
	}

	handleChange = evt => {
		this.setState({ [evt.target.name]: evt.target.value });
	};
	render() {
		return (
			<Form
				style={{
					width: '100%',
					textAlign: 'left',
					border: '1px solid #eee',
					padding: '20px'
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
							value={this.state.firstname}
							type="text"
							placeholder="firstname"
							name="firstname"
							required
						/>
					</Form.Group>

					<Form.Group as={Col}>
						<Form.Label>Lastname</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							value={this.state.lastname}
							type="text"
							placeholder="Lastname"
							name="lastname"
							required
						/>
					</Form.Group>
				</Form.Row>
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Email</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							value={this.state.email}
							type="email"
							placeholder="Enter email"
							name="email"
							required
						/>
					</Form.Group>

					<Form.Group as={Col}>
						<Form.Label>Phone</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							value={this.state.phone}
							type="text"
							placeholder="Phone"
							name="phone"
							required
						/>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Street Address</Form.Label>
						<Form.Control
							value={this.state.streetaddress}
							onChange={this.handleChange}
							type="text"
							placeholder="Street Address"
							name="streetaddress"
							required
						/>
					</Form.Group>

					<Form.Group as={Col}>
						<Form.Label>Postcode</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							value={this.state.postcode}
							type="number"
							placeholder="Postcode"
							name="postcode"
							required
						/>
					</Form.Group>

					<Form.Group as={Col}>
						<Form.Label>City</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							value={this.state.city}
							type="text"
							placeholder="City"
							name="city"
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

export default CustomerForm;
