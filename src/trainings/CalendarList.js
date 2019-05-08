import React, { Component } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from "react-big-calendar";
import { API } from "../config";

const localizer = BigCalendar.momentLocalizer(moment);

class CalendarTrainingList extends Component {
	state = {
		trainings: []
	};

	changeDisplay = type => {
		this.setState({
			display: type
		});
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

	getEvents = () => {
		const trainings = this.state.trainings
			.filter(training => {
				return training.date && training.duration && training.activity;
			})
			.map((training, id) => {
				const start = moment(new Date(training.date));
				const end = moment(new Date(training.date)).add(
					training.duration,
					"minutes"
				);
				const obj = {
					id,
					title: training.activity,
					start: new Date(start.format()),
					end: new Date(end.format())
				};
				console.log("obj", obj);
				return {
					id,
					title: training.activity,
					start: new Date(start.format()),
					end: new Date(end.format())
				};
			});
		return trainings;
	};

	render() {
		return (
			<div>
				{this.state.trainings.length > 0 ? (
					<div style={{ height: "1000px", marginTop: "20px" }}>
						<BigCalendar
							localizer={localizer}
							events={this.getEvents()}
							startAccessor="start"
							endAccessor="end"
						/>
					</div>
				) : (
					<p>"No events"</p>
				)}
			</div>
		);
	}
}

export default CalendarTrainingList;
