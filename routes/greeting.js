// CODE below:

const greeting = greetingsLogic => {

    const sendGreeting = async (req, res) => {
        await greetingsLogic.setValidUsername(req.body.name, req.body.lang);
        await greetingsLogic.greetName(req.body.lang);

        req.flash("greeting", greetingsLogic.getGreeting());
        req.flash("errorMessage", await greetingsLogic.getMessage());
        res.redirect("/");
    };

    const getGreeting = async (req, res) => {
        const greetMessage = req.flash("greeting")[0];
        const errorMessage = req.flash("errorMessage")[0];
        const greetCounter = await greetingsLogic.greetingsCounter();
        const alert = greetingsLogic.addAlert();

        res.render("index", {
            greet: greetMessage,
            msg: errorMessage,
            counter: greetCounter,
            getAlert: alert
        })
    };

    return {
        sendGreeting,
        getGreeting
    };
}

export default greeting;