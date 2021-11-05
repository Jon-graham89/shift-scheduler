import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import Button from "@mui/material/Button";
import EventModal from "../components/EventModal";

export default function Home(props) {
	const [events, setEvents] = useState([
		{
			title: "event list item",
			//date: "2021-10-29",

			timeZone: "local",

			start: "2021-11-02T19:00:00",
			end: "2021-11-03T07:00:00",
			display: "list-item",
		},
		{
			title: "event description",
			//date: "2021-10-29",
			timeZone: "local",

			start: "2021-10-29T06:00:00",
			end: "2021-10-29T16:00:00",
			backgroundColor: "red",
			extendedProps: {
				department: "BioChemistry",
			},
			description: "Lecture",
		},
	]);
	console.log(events);
	const [isAdmin, setIsAdmin] = useState(true);
	const [eventOpen, setEventOpen] = useState(false);

	const [newShiftTitle, setNewShiftTitle] = useState(null);

	const [newShiftStart, setNewShiftStart] = useState(null);
	const [newShiftEnd, setNewShiftEnd] = useState(null);

	const handleOpen = () => {
		setEventOpen(true);
	};
	const handleClose = () => {
		setEventOpen(false);
	};

	let calendarRef = React.createRef();

	const newShiftDataToNull = () => {
		setNewShiftTitle(null);

		setNewShiftStart(null);
		setNewShiftEnd(null);
	};

	const createNewShift = () => {
		if (!newShiftTitle || !newShiftStart || !newShiftEnd) {
			return alert("missing information, please complete the form");
		}
		setEvents([
			...events,
			{
				title: newShiftTitle,

				timeZone: "local",

				start: `${newShiftStart}`,
				end: `${newShiftEnd}`,
			},
		]);
		newShiftDataToNull();
		handleClose();
	};

	const addEvent = () => {
		const api = calendarRef.current.getApi();
		console.log(api);
		handleOpen();
	};
	const handleDateClick = (arg) => {
		// bind with an arrow function

		console.log(arg);
	};

	return (
		<>
			<h1>HELLO WORLD THIS IS A CALENDAR</h1>
			<Button variant="contained" color="secondary" onClick={addEvent}>
				Add EVENT
			</Button>
			{eventOpen && (
				<EventModal
					handleClose={handleClose}
					handleOpen={handleOpen}
					open={eventOpen}
					createNewShift={createNewShift}
					setNewShiftTitle={setNewShiftTitle}
					setNewShiftStart={setNewShiftStart}
					setNewShiftEnd={setNewShiftEnd}
				/>
			)}
			<FullCalendar
				ref={calendarRef}
				{...props}
				plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				headerToolbar={{
					left: "prev,next today",
					center: "title",
					right: "dayGridMonth,timeGridWeek,listWeek",
				}}
				nowIndicator={true}
				editable={isAdmin}
				dateClick={handleDateClick}
				// nextDayThreshold={"10:00:00"}
				//eventClick={handleDateClick}

				events={events}
			/>
		</>
	);
}
