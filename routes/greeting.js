// CODE below:

const greeting = greetingsLogic => {

    const sendGreeting = async (req, res) => {
        const {name, lang} = req.body;
        const validateName = await greetingsLogic.setValidUsername(name, lang);

        !name && !lang ? req.flash("error", "Please enter name and select language.") : "";
        validateName ? validateName : !validateName ? req.flash("error", "Please, enter a valid name. eg. ABCDEabcde") : "";
        !lang && validateName ? req.flash("error", "Please, select a language.") : "";

        await greetingsLogic.greetName(lang);

        req.flash("greeting", greetingsLogic.getGreeting());

        res.redirect("/");
    };

    const getGreeting = async (req, res) => {
        const greetMessage = req.flash("greeting")[0];

        const greetCounter = await greetingsLogic.greetingsCounter();
        // const alert = greetingsLogic.addAlert();

        res.render("index", {
            greet: greetMessage,
            errorMessage: req.flash("error")[0],
            counter: greetCounter,
            // getAlert: alert
        })
    };

    return {
        sendGreeting,
        getGreeting
    };
}

export default greeting;