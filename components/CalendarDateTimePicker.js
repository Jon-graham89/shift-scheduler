import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function CalendarDateTimePicker({
	setNewShiftStart,
	setNewShiftEnd,
}) {
	let today = new Date();
	let date =
		today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
	return (
		<Stack component="form" noValidate spacing={3}>
			<TextField
				id="datetime-local-start"
				label="Start Time"
				type="datetime-local"
				onChange={(e) => setNewShiftStart(e.target.value)}
				InputLabelProps={{
					shrink: true,
				}}
				inputProps={{
					step: 300, // 5 min
				}}
				sx={{ width: 150 }}
			/>
			<TextField
				id="datetime-local-end"
				label="Finish Time"
				type="datetime-local"
				onChange={(e) => setNewShiftEnd(e.target.value)}
				InputLabelProps={{
					shrink: true,
				}}
				inputProps={{
					step: 300, // 5 min
				}}
				sx={{ width: 150 }}
			/>
		</Stack>
	);
}
