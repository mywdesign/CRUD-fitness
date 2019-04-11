import React, { Component } from "react";
import { API } from "./config";
import CustomerTrainingsList from "./trainings/CustomerList";
import { Modal } from "react-bootstrap";
import CustomersList from "./customers/List";
import NewCustomerForm from "./customers/New";

class Customers extends Component {
	state = {
		customers: [],
		searchTerm: "",
		customerTrainingsLinks: null,
		showCustomerTrainingModal: false,
		showAddNewCustomerForm: false
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

	handleClose = () => {
		this.setState({ showCustomerTrainingModal: false });
	};

	handleOnCheckTrainings = links => {
		this.setState({
			customerTrainingsLinks: links,
			showCustomerTrainingModal: true
		});
	};
	handleSubmit(customer) {
		console.log("customer", customer);
	}

	render() {
		return (
			<div>
				<div className="row m-3">
					<div className="input-group col-6">
						<div className="input-group-prepend">
							<span className="input-group-text">Search</span>
						</div>
						<input
							type="text"
							className="form-control"
							placeholder="Type keywords in any fields..."
							aria-label="Type keywords in any fields..."
							onChange={event => {
								this.setState({ searchTerm: event.currentTarget.value });
							}}
						/>
					</div>
				</div>
				<div className="row m-3">
					<div className="input-group align-self-end col-2">
						<button
							type="button"
							className="btn btn-primary btn-sn btn-block"
							onClick={() => {
								this.setState({
									showAddNewCustomerForm: !this.state.showAddNewCustomerForm
								});
							}}
						>
							Add New Customer
						</button>
					</div>
				</div>
				{this.state.showAddNewCustomerForm && (
					<div className="row m-3">
						<NewCustomerForm onSubmit={this.handleSubmit} />
					</div>
				)}

				<CustomersList
					customers={this.getList()}
					onCheckTrainings={this.handleOnCheckTrainings}
				/>
				<Modal
					show={this.state.showCustomerTrainingModal}
					onHide={this.handleClose}
					size="lg"
				>
					<Modal.Header closeButton>
						<Modal.Title>Customer Trainings</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<CustomerTrainingsList
							type={"trainings"}
							links={this.state.customerTrainingsLinks}
						/>
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

export default Customers;
