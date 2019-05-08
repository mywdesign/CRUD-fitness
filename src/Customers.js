import React, { Component } from "react";
import { API } from "./config";
import CustomerTrainingsList from "./trainings/CustomerList";
import { Modal } from "react-bootstrap";
import CustomersList from "./customers/List";
import CustomerForm from "./customers/Form";
import TrainingForm from "./trainings/Form";

class Customers extends Component {
	state = {
		customers: [],
		searchTerm: "",
		desc: true,
		status: null,
		customerTrainingsLinks: null,
		showCustomerTrainingModal: false,
		showCustomerForm: false,
		showAddTrainingForm: false,
		pendingUpdatingCustomer: {},
		pendingAddingTraining: {}
	};

	componentDidMount() {
		fetch(`${API}/customers`)
			.then(response => {
				return response.json();
			})
			.then(jsonData => {
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
		this.setState({
			showCustomerTrainingModal: false,
			showCustomerForm: false
		});
	};

	handleOnCheckTrainings = customer => {
		this.setState({
			customerTrainingsLink: customer.links[2].href,
			showCustomerTrainingModal: true
		});
	};

	desc = (a, b, field) => {
		if (a[field] < b[field]) {
			return -1;
		}
		if (a[field] > b[field]) {
			return 1;
		}
		return 0;
	};

	asc = (a, b, field) => {
		if (a[field] < b[field]) {
			return 1;
		}
		if (a[field] > b[field]) {
			return -1;
		}
		return 0;
	};

	handleSort = field => {
		const newCustomers = [...this.state.customers];
		newCustomers.sort(
			this.state.desc
				? (a, b) => this.desc(a, b, field)
				: (a, b) => this.asc(a, b, field)
		);
		this.setState({
			customers: newCustomers,
			desc: !this.state.desc
		});
	};

	update = customer => {
		const url = customer.links[0].href;
		return fetch(`${url}`, {
			method: "PUT",
			body: JSON.stringify(customer),
			headers: {
				"Content-Type": "application/json"
			}
		});
	};

	create = customer => {
		return fetch(`${API}/customers`, {
			method: "POST",
			body: JSON.stringify(customer),
			headers: {
				"Content-Type": "application/json"
			}
		});
	};
	handleSubmit = customer => {
		if (customer.links.length) {
			const index = this.state.customers.findIndex(
				obj => obj.links[0].href === customer.links[0].href
			);
			this.update(customer)
				.then(res => res.json())
				.then(response => {
					const newCustomers = [...this.state.customers];
					newCustomers[index] = customer;
					this.setState({
						customers: newCustomers,
						status: "success",
						showCustomerForm: false
					});
				})
				.catch(error => {
					this.setState({
						status: "failed"
					});
				});
		} else {
			this.create(customer)
				.then(res => res.json())
				.then(response => {
					this.setState({
						customers: [...this.state.customers, response],
						status: "success",
						showCustomerForm: false
					});
				})
				.catch(error => {
					this.setState({
						status: "failed"
					});
				});
		}
	};

	handleAddTrainingSubmit = training => {
		fetch(`${API}/trainings`, {
			method: "POST",
			body: JSON.stringify({
				...training,
				...this.state.pendingAddingTraining
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				this.setState({
					status: "success",
					showAddTrainingForm: false
				});
			})
			.catch(error => {
				this.setState({
					status: "failed"
				});
			});
	};
	handleDelete = (customer, index) => {
		fetch(customer.links[2].href, {
			method: "delete"
		}).then(response =>
			this.setState({
				customers: this.state.customers.filter((c, idx) => idx !== index)
			})
		);
	};

	handleEdit = (customer, index) => {
		this.setState({
			pendingUpdatingCustomer: customer,
			showCustomerForm: true
		});
	};

	handleAddTraining = customer => {
		this.setState({
			showCustomerForm: false,
			showAddTrainingForm: true,
			pendingAddingTraining: { customer: customer.links[0].href }
		});
	};

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
									showCustomerForm: !this.state.showCustomerForm,
									pendingUpdatingCustomer: {}
								});
							}}
						>
							Add New Customer
						</button>
					</div>
				</div>
				{this.state.status === "success" && (
					<div className="alert alert-success">
						Operate Successfully!
						<button
							type="button"
							className="close"
							data-dismiss="alert"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
				)}
				{this.state.status === "failed" && (
					<div className="alert alert-danger">
						Operate Failed!
						<button
							type="button"
							className="close"
							data-dismiss="alert"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
				)}

				<Modal
					show={this.state.showCustomerForm}
					onHide={this.handleClose}
					size="lg"
				>
					<Modal.Header closeButton>
						<Modal.Title>Customer</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<CustomerForm
							customer={this.state.pendingUpdatingCustomer}
							onSubmit={this.handleSubmit}
						/>
					</Modal.Body>
				</Modal>

				<CustomersList
					customers={this.getList()}
					onCheckTrainings={this.handleOnCheckTrainings}
					onSort={this.handleSort}
					onDelete={this.handleDelete}
					onEdit={this.handleEdit}
					onAddTraining={this.handleAddTraining}
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
						<CustomerTrainingsList link={this.state.customerTrainingsLink} />
					</Modal.Body>
				</Modal>
				<Modal
					show={this.state.showAddTrainingForm}
					onHide={this.handleClose}
					size="lg"
				>
					<Modal.Header closeButton>
						<Modal.Title>Add Customer Trainings</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<TrainingForm onSubmit={this.handleAddTrainingSubmit} />
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

export default Customers;
