import express from "express";
import greetingsApp from "./services/greetings.js";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";

const app = express();

import pgPromise from "pg-promise";

const pgp = pgPromise();

import "dotenv/config";

// routes modules

import greetings from "./routes/greetings.js";

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
const Greetings = greetingsApp(db);

// routes instances

const GreetingsRoutes = greetings(Greetings);


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

app.get("/", GreetingsRoutes.home);

app.post("/greet", GreetingsRoutes.addGreeting);

app.get("/greeted", GreetingsRoutes.greeted);

app.get("/filtered/:username", GreetingsRoutes.filteredName);

app.post("/reset", GreetingsRoutes.reset)

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
  console.log("app started at", PORT);
});
