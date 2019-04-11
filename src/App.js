import React, { Component } from "react";

import "./App.css";
import Customers from "./Customers";
import Trainings from "./Trainings";

let hrefLink = "#";

class App extends Component {
	state = {
		currentRoute: "trainings"
	};

	render() {
		return (
			<div className="App">
				<ul className="nav nav-tabs">
					<li className="nav-item">
						<a
							className={
								this.state.currentRoute === "customers"
									? "nav-link active"
									: "nav-link"
							}
							onClick={() => {
								this.setState({
									currentRoute: "customers"
								});
							}}
							href={hrefLink}
						>
							Customers
						</a>
					</li>
					<li className="nav-item">
						<a
							className={
								this.state.currentRoute === "trainings"
									? "nav-link active"
									: "nav-link"
							}
							onClick={() => {
								this.setState({
									currentRoute: "trainings"
								});
							}}
							href={hrefLink}
						>
							Trainings
						</a>
					</li>
				</ul>
				{this.state.currentRoute === "customers" && <Customers />}
				{this.state.currentRoute === "trainings" && <Trainings />}
			</div>
		);
	}
}

export default App;
