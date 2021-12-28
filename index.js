const express = require("express");
const cors = require("cors");
const path = require("path");

const projectsRouter = require("./routes/projects");
const coursesRouter = require("./routes/courses");
const booksRouter = require("./routes/books");
const loginRouter = require("./routes/auth/login");
const registerRouter = require("./routes/auth/register");
const adminPanelRouter = require("./routes/auth/adminpanel");

require("dotenv").config();
require("./config/database").connect();

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api/v1/projects", projectsRouter);
app.use("/api/v1/courses", coursesRouter);
app.use("/api/v1/books", booksRouter);
app.use("/api/v1/admin/login", loginRouter);
app.use("/api/v1/admin/register", registerRouter);
app.use("/api/v1/admin", adminPanelRouter);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
