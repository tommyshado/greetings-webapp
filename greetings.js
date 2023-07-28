export default greetingsApp => {
    const greetedUsername = {};

    let validUsername = "";
    let greeting = "";
    // let counter = 0;

    const setValidUsername = username => {
        let pattern = /^[a-zA-Z]+$/;

        if (pattern.test(username.toLowerCase())) {
            if (greetedUsername[username] === undefined) {
                validUsername = username;
                greetedUsername[username] = 1;
            } else {
                greetedUsername[username]++;
            };
        };
    };

    const setGreetingWithLang = lang => {
        if (lang === "IsiXhosa") {
            greeting = `Molo, ${validUsername}`;
        } else if (lang === "Venda") {
            greeting = `Nda, ${validUsername}`;
        } else if (lang === "English") {
            greeting = `Hello, ${validUsername}`;
        };
    };

    const getGreeting = () => greeting;

    // when the getGreeting() returns a greeting, GET the length of the greetedUsername keys
    // OTHERWISE, the greetingsCounter() returns 0
    const greetingsCounter = () => getGreeting() ? Object.keys(greetedUsername).length : 0;

    return {
        setValidUsername,
        setGreetingWithLang,
        getGreeting,
        greetingsCounter,
    };
};