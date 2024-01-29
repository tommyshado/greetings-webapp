const greetingsRoutes = (greetings) => {
    const home = async (req, res) => {
        const all = await greetings.addedNames();
        res.render("index", {
            count: all.length
        });
    };

    const addGreeting = async (req, res) => {
        const { name, lang } = req.body;

        if (name === "") {
            req.flash("error", "Please enter name.");
            res.redirect("/");
            return;
        };

        if (lang === undefined) {
            req.flash("error", "Please select a languge.");
            res.redirect("/");
            return;
        };

        const checkAddedName = await greetings.addName(name);

        if (checkAddedName === null) {
            req.flash("error", "Please enter alphabets only.");
            res.redirect("/");
            return;
        };

        if (checkAddedName === false) {
            req.flash("error", `${name} has already been greeted.`);
            res.redirect("/");
            return;
        };

        if (lang === "IsiXhosa" && checkAddedName) {
            req.flash("greeting", `Molo ${name}`);
            req.flash("success", `${name} greeted successfully.`);
            res.redirect("/");
            return;
        };

        if (lang === "Venda" && checkAddedName) {
            req.flash("greeting", `Nda ${name}`);
            req.flash("success", `${name} greeted successfully.`);
            res.redirect("/");
            return;
        };

        if (lang === "English" && checkAddedName) {
            req.flash("greeting", `Hello ${name}`);
            req.flash("success", `${name} greeted successfully.`);
            res.redirect("/");
            return;
        };

    };

    const greeted = async (req, res) => {
        const all = await greetings.addedNames();

        res.render("greeted-users", {
            greetedUsers: all
        });
    };

    const filteredName = async (req, res) => {
        const {username} = req.params;
        const filter = await greetings.filterForName(username);
        res.render("filtered", filter);
    };

    const reset = async (req, res) => {
        await greetings.deleteNames();
        res.redirect("/");
    };

    return {
        home,
        addGreeting,
        greeted,
        filteredName,
        reset
    }
};

export default greetingsRoutes;