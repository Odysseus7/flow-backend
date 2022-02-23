const express = require("express");
const cors = require("cors");
const path = require("path");

const projectsRouter = require("./routes/projects");
const coursesRouter = require("./routes/courses");
const booksRouter = require("./routes/books");
const loginRouter = require("./routes/auth/login");
const registerRouter = require("./routes/auth/register");
const adminPanelUsersRouter = require("./routes/admin/users");
const adminPanelCoursesRouter = require("./routes/admin/courses");
const adminPanelProjectsRouter = require("./routes/admin/projects");
const adminPanelBooksRouter = require("./routes/admin/books");

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
app.use("/admin/login", loginRouter);
app.use("/admin/register", registerRouter);
app.use("/admin/users", adminPanelUsersRouter);
app.use("/admin/courses", adminPanelCoursesRouter);
app.use("/admin/projects", adminPanelProjectsRouter);
app.use("/admin/books", adminPanelBooksRouter);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
