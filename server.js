const express = require("express");
const cors = require("cors");

const app = express();

const dbConfig = require("./db");
const cottageRoute = require("./routes/cottageRoute");
const usersRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");

app.use(express.json());

app.use(cors());

app.use("/api/cottages", cottageRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Node Server Started using nodemon"));
