import express from "express";
import greetingsApp from "./greetings.js";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";

import chalk from 'chalk';

const app = express();

// import Client from "pg/lib/client.js";

// const pgp = require("pg-promise")();
import pgPromise from "pg-promise";

const pgp = pgPromise();

import "dotenv/config";



// routes modules
import greeting from "./routes/greeting.js";
import greetedUsers from "./routes/greeted_users.js";
import allGreetedUsers from "./routes/users_data.js";


 // initialise session middleware - flash-express depends on it
 app.use(session({
  secret : "codeXer",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

const databaseURL = process.env.DB_URL;

const config = {
  connectionString: databaseURL
}

if (process.env.NODE_ENV === "production") {
  config.ssl = {
    rejectUnauthorized: false
  }
}

const db = pgp(config);


// instance for logic
const greetings = greetingsApp(db);

// routes instances
const greetingRoute = greeting(greetings);
const greeted = greetedUsers(greetings);
const allGreeted = allGreetedUsers(greetings);


const handlebarSetup = exphbs.engine({
    partialsDir: "./views/partials",
    viewPath: "./views",
    layoutsDir: "./views/layouts",
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");
app.set("views", "./views");



app.use(express.static("public"));

// ROUTES:

app.get("/", greetingRoute.getGreeting);

app.post("/sendGreeting", greetingRoute.sendGreeting);

app.get("/greeted", greeted.showGreeted);

app.get("/counter/:username", allGreeted.all);

app.post("/reset", async (req, res) => {
  await greetings.resetApp();
  res.redirect("/");
})

const PORT = process.env.PORT || 3007;

// database connection string
// const dbConnectionString = pgP();

app.listen(PORT, () => {
  console.log("app started at", PORT);
});
