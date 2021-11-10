import React from "react";
import { event_data } from "../../event_data";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

export default function FilterShifts({
	department,
	setDepartment,
	employeeName,
	setEmployeeName,
	setShifts,
}) {
	const handleShiftFilter = () => {
		return event_data.filter((shift) => {
			if (department && employeeName) {
				return (
					shift.department.toLowerCase() === department.toLowerCase() &&
					shift.employee.toLowerCase() === employeeName.toLowerCase()
				);
			}
			if (department && !employeeName) {
				return shift.department.toLowerCase() === department.toLowerCase();
			}
			if (!department && employeeName) {
				return shift.employee.toLowerCase() === employeeName.toLowerCase();
			}
		});
	};
	return (
		<div>
			<div>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Department</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={department}
						label="Department"
						onChange={(e) => setDepartment(e.target.value)}
						fullWidth
					>
						<MenuItem value={"icu"}>ICU</MenuItem>
						<MenuItem value={"covid"}>COVID</MenuItem>
						<MenuItem value={"pediatric"}>Pediatric</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Employee</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={employeeName}
						label="Employee"
						onChange={(e) => setEmployeeName(e.target.value)}
						fullWidth
					>
						<MenuItem value={"kevin wert"}>Kevin Wert</MenuItem>
						<MenuItem value={"shelley mason"}>Shelley Mason</MenuItem>
						<MenuItem value={"doc mcstuffins"}>Doc Mcstuffins</MenuItem>
						<MenuItem value={"phil fortin"}>phil fortin</MenuItem>
					</Select>
				</FormControl>
			</div>
			<Button
				variant="contained"
				color="primary"
				onClick={() => setShifts(handleShiftFilter)}
			>
				Search{" "}
			</Button>{" "}
			<Button
				variant="contained"
				color="secondary"
				onClick={() => {
					setEmployeeName("");
					setDepartment("");
					setShifts(event_data);
				}}
			>
				CLEAR FILTER
			</Button>
		</div>
	);
}
