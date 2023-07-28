import express from "express";
import greetingsApp from "./greetings.js"
import exphbs from "express-handlebars";
import bodyParser from "body-parser";

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


const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
    console.log('app started at', PORT);
});