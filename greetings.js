const greetingsApp = (db) => {
//   const greetedUsernames = [];

  let validUsername = "";
  let greeting = "";
  // let allowCounterToIncrement = "";

  const setValidUsername = async (name) => {
    let pattern = /^[a-zA-Z]+$/;
    let setNameToLowerCase = name.toLowerCase().trim();

    if (pattern.test(setNameToLowerCase)) {
      validUsername = setNameToLowerCase;

      // CHECK if the object in greetedUsernames with username key equals to the validUsername variable
      // const nameToBeGreeted = greetedUsernames.find(obj => obj.username === validUsername);

      let nameToBeGreeted = await db.oneOrNone(
        "SELECT name FROM greetings WHERE name = $1",
        setNameToLowerCase
      );

      if (nameToBeGreeted) {
        await db.none("UPDATE greetings SET count = count + 1 WHERE name = $1", setNameToLowerCase)
        // nameToBeGreeted.numberOfGreetings++;
      } else {
       await db.none("INSERT INTO greetings (name, count) values ($1, $2)", [setNameToLowerCase, 1])
      }
    }
  };

  const setGreetingWithLang = (lang) => {
    // allowCounterToIncrement = lang;

    if (validUsername !== "" && lang !== "") {
      if (lang === "IsiXhosa") {
        greeting = `Molo, ${validUsername}`;
      } else if (lang === "Venda") {
        greeting = `Nda, ${validUsername}`;
      } else if (lang === "English") {
        greeting = `Hello, ${validUsername}`;
      }
    }
  };

  const getGreeting = () => greeting;

  // when the getGreeting() returns a greeting, GET the length of the object inside greetedUsername
  // OTHERWISE, the greetingsCounter() returns 0
  // const greetingsCounter = () => getGreeting() ? greetedUsernames.length : 0;

  const greetingsCounter = async () => await db.oneOrNone("SELECT COUNT(name) FROM greetings");

  const greetedUsers = async () => await db.any("SELECT * FROM greetings");

  const getUserData = async (userName) => {
    // greetedUsernames.filter((userData) => userData.username === name);

    let database = await db.any("SELECT * FROM greetings");
    let userDataArray = [];
    
    database.forEach(userData => {
        if (userData.name === userName) {
            userDataArray.push(userData);
        };
    });

    return userDataArray;
  };

  return {
    setValidUsername,
    setGreetingWithLang,
    getGreeting,
    greetingsCounter,
    greetedUsers,
    getUserData,
  };
};

export default greetingsApp;
