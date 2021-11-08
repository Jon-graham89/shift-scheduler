import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import Button from "@mui/material/Button";
import ShiftUpdateModal from "../components/ShiftUpdateModal";
import ViewEventModal from "../components/ViewEventModal";

export default function Home(props) {
	const [events, setEvents] = useState([
		{
			title: "event description",
			//date: "2021-10-29",
			timeZone: "local",
			id: 2,
			start: "2021-10-29T06:00:00",
			end: "2021-10-29T16:00:00",
			backgroundColor: "red",
			extendedProps: {
				department: "BioChemistry",
			},
			description: "Lecture",
		},
		{
			title: "event list item",
			//date: "2021-10-29",
			id: 123456,
			timeZone: "local",

			start: "2021-11-02T19:00:00",
			end: "2021-11-03T07:00:00",
		},
	]);
	const [currentShiftView, setCurrentShiftView] = useState(null);
	const [isAdmin, setIsAdmin] = useState(true);
	const [shiftSelect, setShiftSelect] = useState(null);

	//Modal Open State
	const [eventOpen, setEventOpen] = useState(false);
	const [viewEventModalClose, setViewEventModalClose] = useState(false);

	//New Shift State
	const [newShiftTitle, setNewShiftTitle] = useState(null);
	const [newShiftStart, setNewShiftStart] = useState(null);
	const [newShiftEnd, setNewShiftEnd] = useState(null);

	const handleOpen = () => {
		setEventOpen(true);
	};
	const handleClose = () => {
		setEventOpen(false);
	};
	const handleEventModalOpen = () => {
		setViewEventModalClose(true);
	};
	const handleEventModalClose = () => {
		setViewEventModalClose(false);
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
				id: Math.random(),
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
		const api = calendarRef;
		console.log(api);
		handleOpen();
	};

	const formatShiftView = (selectedShift) => {
		let startDay = selectedShift.start.split("T")[0].split("-");
		let endDay = selectedShift.end.split("T")[0].split("-");
		let startTime = selectedShift.start.split("T")[1];
		let endTime = selectedShift.end.split("T")[1];

		const startDayFinal =
			new Date(startDay[0], startDay[1] - 1, startDay[2]).toDateString() +
			" at " +
			startTime;
		const endDayFinal =
			new Date(endDay[0], endDay[1] - 1, endDay[2]).toDateString() +
			" at " +
			endTime;

		setCurrentShiftView({
			title: selectedShift.title,
			start: startDayFinal,
			end: endDayFinal,
		});
	};

	const handleShiftSelect = (arg) => {
		handleEventModalOpen(true);
		const selectedShift = events.filter(
			(event) => event.id.toString() === arg.event._def.publicId.toString()
		);
		setShiftSelect(selectedShift[0]);
		formatShiftView(selectedShift[0]);
	};

	const handleDateClick = (arg) => {
		console.log(arg);
	};

	return (
		<>
			<h1>HELLO WORLD THIS IS A CALENDAR</h1>
			<Button variant="contained" color="secondary" onClick={addEvent}>
				Add EVENT
			</Button>
			{eventOpen && (
				<ShiftUpdateModal
					handleClose={handleClose}
					handleOpen={handleOpen}
					open={eventOpen}
					createNewShift={createNewShift}
					shiftTitleUpdate={setNewShiftTitle}
					shiftStartTimeUpdate={setNewShiftStart}
					shiftEndTimeUpdate={setNewShiftEnd}
					title={"Create Shift"}
				/>
			)}
			<ViewEventModal
				currentShiftView={currentShiftView}
				viewEventModalClose={viewEventModalClose}
				handleViewEventModalClose={handleEventModalClose}
				shiftSelect={shiftSelect}
				shifts={events}
				setShifts={setEvents}
			/>
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
				eventClick={handleShiftSelect}
				events={events}
			/>
		</>
	);
}
