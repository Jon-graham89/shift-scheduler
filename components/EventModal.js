import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CalendarDateTimePicker from "./CalendarDateTimePicker";

const style = {
	display: "flex",
	flexDirection: "column",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

export default function EventModal({
	handleOpen,
	handleClose,
	open,
	createNewShift,
	setNewShiftTitle,

	setNewShiftStart,
	setNewShiftEnd,
}) {
	return (
		<div>
			<Button onClick={handleOpen}>Open modal</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box sx={{ ...style, width: 400 }}>
					<Typography variant="h4" color="primary" id="parent-modal-title">
						Add Event
					</Typography>
					<TextField
						label="Title"
						variant="standard"
						color="secondary"
						onChange={(e) => setNewShiftTitle(e.target.value)}
					/>
					<TextField label="Description" variant="standard" color="secondary" />

					<CalendarDateTimePicker
						setNewShiftStart={setNewShiftStart}
						setNewShiftEnd={setNewShiftEnd}
					/>
					<Button color="primary" variant="outlined" onClick={createNewShift}>
						Create Shift
					</Button>
				</Box>
			</Modal>
		</div>
	);
}
