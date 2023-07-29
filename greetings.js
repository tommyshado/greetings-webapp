export default greetingsApp => {
    const greetedUsernames = [];

    let validUsername = "";
    let greeting = "";
    let allowCounterToIncrement = "";

    const setValidUsername = name => {
        let pattern = /^[a-zA-Z]+$/;

        if (pattern.test(name.toLowerCase())) {
            validUsername = name;

            // CHECK if the object in greetedUsernames with username key equals to the validUsername variable
            const nameToBeGreeted = greetedUsernames.find(obj => obj.username === validUsername)

            if (nameToBeGreeted) {
                nameToBeGreeted.numberOfGreetings++;

            } else {
                
                // PUSH the object with the user data
                greetedUsernames.push({
                    username: validUsername,
                    numberOfGreetings: 1
                })
            };

        };
    };


    const setGreetingWithLang = lang => {
        allowCounterToIncrement = lang;

        if (validUsername !== "" && lang !== "") {
            if (lang === "IsiXhosa") {
                greeting = `Molo, ${validUsername}`;
            } else if (lang === "Venda") {
                greeting = `Nda, ${validUsername}`;
            } else if (lang === "English") {
                greeting = `Hello, ${validUsername}`;
            };
        }
    };

    const getGreeting = () => greeting;

    // when the getGreeting() returns a greeting, GET the length of the object inside greetedUsername 
    // OTHERWISE, the greetingsCounter() returns 0
    // const greetingsCounter = () => getGreeting() ? greetedUsernames.length : 0;

    const greetingsCounter = () => {
        let greetingsCount = 0;

        if (allowCounterToIncrement) {
            greetedUsernames.forEach(userData => {
                greetingsCount += userData.numberOfGreetings;
            });
        }

        return greetingsCount;
    };


    const greetedUsers = () => allowCounterToIncrement ? greetedUsernames : greetedUsernames;

    const getUserData = name => greetedUsernames.filter(userData => userData.username === name);

    return {
        setValidUsername,
        setGreetingWithLang,
        getGreeting,
        greetingsCounter,
        greetedUsers,
        getUserData
    };
};