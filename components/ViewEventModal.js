import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DateTimePicker from "./DateTimePicker";
import ShiftUpdateModal from "./ShiftUpdateModal";

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

export default function ViewEventModal({
	handleViewEventModalClose,
	viewEventModalClose,
	currentShiftView,
	shiftSelect,
	shifts,
	setShifts,
}) {
	const [editShiftModalOpen, setEditShiftModalOpen] = useState(false);
	const [updatedShiftTitle, setUpdatedShiftTitle] = useState(null);
	const [updatedShiftStartTime, setUpdatedShiftStartTime] = useState(null);
	const [updatedShiftEndTime, setUpdatedShiftEndTime] = useState(null);

	const [open, setOpen] = useState(false);

	const handleEditShiftClose = () => {
		setEditShiftModalOpen(false);
	};
	const handleEditShiftOpen = () => {
		setEditShiftModalOpen(true);
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const updateShiftsState = () => {
		const selectedShiftIndex = shifts.indexOf(shiftSelect);
		shifts.splice(selectedShiftIndex, 1);

		shiftSelect.title = updatedShiftTitle;
		shiftSelect.start = updatedShiftStartTime;
		shiftSelect.end = updatedShiftEndTime;

		setShifts([...shifts, shiftSelect]);
	};

	const EditModal = (
		<div>
			{/* <Button onClick={handleOpen}>Open modal</Button> */}
			<Modal
				open={editShiftModalOpen}
				onClose={handleEditShiftClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box sx={{ ...style, width: 400 }}>
					<Typography variant="h4" color="primary" id="parent-modal-title">
						EDIT EVENT
					</Typography>
					<TextField
						label="Title"
						variant="standard"
						color="secondary"
						onChange={(e) =>
							console.log(
								"Need to edit selected shift - create some new state then update it on click of confirm"
							)
						}
					/>
					<TextField label="Description" variant="standard" color="secondary" />

					{/* Department selection, have shifts display different color based on department */}

					<DateTimePicker
					// New state pushed into here from this componenet - EDIT the selected shift
					// setNewShiftStart={setNewShiftStart}
					// setNewShiftEnd={setNewShiftEnd}
					/>
					<Button
						color="primary"
						variant="outlined"
						onClick={() => {
							alert("yay you created a new shift");
							handleEditShiftClose();
						}}
					>
						Edit Shift
					</Button>
				</Box>
			</Modal>
		</div>
	);

	return (
		<div>
			<Modal
				open={viewEventModalClose}
				onClose={handleViewEventModalClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box sx={{ ...style, width: 400 }}>
					<Typography variant="h4" color="primary" id="parent-modal-title">
						SELECTED SHIFT
					</Typography>
					{currentShiftView && (
						<Typography variant="body">
							{currentShiftView.title}
							<br></br>
							{currentShiftView.start}
							{" to"}
							<br></br>
							{currentShiftView.end}
							{"DISPLAY SHIFT DETAILS so that "}
						</Typography>
					)}
					<Button
						variant="outlined"
						color="primary"
						onClick={() => {
							handleOpen();
							handleViewEventModalClose();
						}}
					>
						EDIT SHIFT
					</Button>
				</Box>
			</Modal>
			{open && (
				<ShiftUpdateModal
					open={open}
					handleClose={handleClose}
					shiftTitleUpdate={setUpdatedShiftTitle}
					shiftStartTimeUpdate={setUpdatedShiftStartTime}
					shiftEndTimeUpdate={setUpdatedShiftEndTime}
					createNewShift={() => {
						handleClose();
						updateShiftsState();
					}}
					title={"Update Shift"}
				/>
			)}
		</div>
	);
}
