import express from "express";
import greetingsApp from "./greetings.js"
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import Client from "pg/lib/client.js";

// instances
const app = express();
const greetings = greetingsApp();


const handlebarSetup = exphbs.engine({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');
app.set('views', './views');


app.use(express.static("public"));


// ROUTES:

app.get('/', (req, res) => {
    res.render('index', {
        greet: greetings.getGreeting(),
        counter: greetings.greetingsCounter()
    })
});

app.post('/sendGreeting', (req, res) => {

    // set the username and language into the factory function
    greetings.setValidUsername(req.body.name);
    greetings.setGreetingWithLang(req.body.lang);

    res.redirect('/')
});

app.get("/greeted", (req, res) => {
    res.render("greeted-users", {
        greetedUsers: greetings.greetedUsers()
    });
});

app.get("/counter/:username", (req, res) => {
    const username = req.params.username;

    res.render("counter", {
        name: greetings.getUserData(username)
    });
});


const PORT = process.env.PORT || 3007;

// database connection string
const dbConnectionString = `postgres://tommyshado:yzrNH0TDiKbqCMAlNzWP62tWqWLQ6Oqy@dpg-cj2fspp8g3n1jkihu9dg-a.oregon-postgres.render.com:${PORT}/greetings_app_database`;

// postgreSQL client instance
const postgreSQLClient = new Client({
    connectionString: dbConnectionString
});

// connecting to the database
postgreSQLClient.connect()
    .then(() => {
        console.log("Connected to the database")
    })
    .catch(err => {
        console.error("Error connecting to the database", err)
    })

app.listen(PORT, () => {
    console.log('app started at', PORT);
});