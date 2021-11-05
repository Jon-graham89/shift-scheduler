module.exports = {
	reactStrictMode: true,
};

const withTM = require("next-transpile-modules")([
	"@fullcalendar/common",
	"@fullcalendar/daygrid",
	"@fullcalendar/timegrid",
	"@fullcalendar/interaction",
	"@fullcalendar/react",
	"@fullcalendar/list",
]);

module.exports = withTM({
	// any other next.js settings here
});
