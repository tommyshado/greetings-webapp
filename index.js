import express from "express";
import greetingsApp from "./greetings.js";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";

const app = express();

// import Client from "pg/lib/client.js";

// const pgp = require("pg-promise")();
import pgPromise from "pg-promise";

const pgp = pgPromise();

import "dotenv/config";

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DB_URL && !local) {
    useSSL = true;
}
const DB_URL = process.env.DB_URL;
const config = { 
    connectionString : DB_URL
}

let db = pgp(config);
const greetings = greetingsApp(db);

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

app.get("/", async (req, res) => {
    // let setData = await db.any('select * from greetings');
    // console.log(setData);
  res.render("index", {
    greet: greetings.getGreeting(),
    counter: await greetings.greetingsCounter()
  });
});

app.post("/sendGreeting", (req, res) => {
  // set the username and language into the factory function
  greetings.setValidUsername(req.body.name);
  greetings.setGreetingWithLang(req.body.lang);

  res.redirect("/");
});

app.get("/greeted", async (req, res) => {
  res.render("greeted-users", {
    greetedUsers: await greetings.greetedUsers(),
  });
});

app.get("/counter/:username", async (req, res) => {
  const username = req.params.username;

  res.render("counter", {
    name: await greetings.getUserData(username),
  });
});

const PORT = process.env.PORT || 3007;

// database connection string
// const dbConnectionString = pgP();

app.listen(PORT, () => {
  console.log("app started at", PORT);
});
