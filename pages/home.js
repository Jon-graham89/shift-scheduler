import React, { useState } from "react";
import Link from "next/link";

// Full Calendar
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

// MUI
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// Components
import ShiftUpdateModal from "../components/ShiftUpdateModal";
import ViewEventModal from "../components/ViewEventModal";
import FilterShifts from "../components/sidebar/FilterShifts";

//Data
import { event_data } from "../event_data";

export default function Home(props) {
	const [isAdmin, setIsAdmin] = useState(true);

	const [shifts, setShifts] = useState(event_data);
	const [currentShiftView, setCurrentShiftView] = useState(null);
	const [shiftSelect, setShiftSelect] = useState(null);

	//Modal Open State
	const [eventOpen, setEventOpen] = useState(false);
	const [viewEventModalClose, setViewEventModalClose] = useState(false);

	//New Shift State
	const [newShiftTitle, setNewShiftTitle] = useState(null);
	const [newShiftStart, setNewShiftStart] = useState(null);
	const [newShiftEnd, setNewShiftEnd] = useState(null);

	//Filter data state
	const [department, setDepartment] = useState("");
	const [employeeName, setEmployeeName] = useState("");

	//FOR USE LATER *** NOT REQUIRED AT THE MOMENT 2021-11-10
	const employees = [
		{
			first_name: "Kevin",
			last_name: "Wert",
			role: "Respirator Therapist",
			isAdmin: false,
			qualified_departments: [],
		},
		{
			first_name: "Phil",
			last_name: "Fortin",
			role: "Respiratory Therapist",
			isAdmin: false,
			qualified_departments: [],
		},
		{
			first_name: "Elise",
			last_name: "Desjardins",
			role: "Nure Practisioner",
			isAdmin: false,
			qualified_departments: [],
		},
		{
			first_name: "Julie",
			last_name: "Perron",
			role: "Reception",
			isAdmin: false,
		},
		{
			first_name: "Marc-Andre",
			last_name: "Godard",
			role: "Doctor",
			isAdmin: false,
		},
		{
			first_name: "Shelley",
			last_name: "Mason",
			role: "Nurse Practisioner",
			isAdmin: false,
		},
		{
			first_name: "Gad",
			last_name: "Saad",
			role: "Doctor",
			isAdmin: false,
		},
	];
	class shift_constructor {
		constructor(title, first, last, start, end, description, department) {
			this.title = title;
			this.employee = `${first} ${last}`;
			timeZone = "local";
			id = Math.random();
			this.start = start;
			this.end = end;
			this.description = description;
			this.department = department;
		}
	}

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
		setShifts([
			...shifts,
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
		const selectedShift = shifts.filter(
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
			<Grid>
				<h1>HELLO WORLD THIS IS A CALENDAR</h1>
			</Grid>
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
				shifts={shifts}
				setShifts={setShifts}
			/>
			<Grid container>
				<Grid item xs={2}>
					<h1>working title</h1>

					<Link href="/profile">
						<a>
							<h3>Profile</h3>
						</a>
					</Link>

					<Link href="/arciles/first">
						<a>
							<h3>Articles</h3>
						</a>
					</Link>
					<div>Curernt Shifts</div>
					<Link href="/requested_shifts">
						<a>
							<h3>Requested Shifts</h3>
						</a>
					</Link>
					<FilterShifts
						employeeName={employeeName}
						department={department}
						setEmployeeName={setEmployeeName}
						setDepartment={setDepartment}
						setShifts={setShifts}
					/>
				</Grid>
				<Grid item xs={10}>
					<Button variant="contained" color="secondary" onClick={addEvent}>
						Add EVENT
					</Button>
					<FullCalendar
						ref={calendarRef}
						{...props}
						plugins={[
							dayGridPlugin,
							timeGridPlugin,
							listPlugin,
							interactionPlugin,
						]}
						initialView="dayGridMonth"
						headerToolbar={{
							left: "prev,next today",
							center: "title",
							right: "dayGridMonth,timeGridWeek,listWeek",
						}}
						displayEventEnd={true}
						nowIndicator={true}
						editable={isAdmin}
						dateClick={handleDateClick}
						// nextDayThreshold={"10:00:00"}
						eventClick={handleShiftSelect}
						events={shifts}
					/>
				</Grid>
			</Grid>
		</>
	);
}
