const greetingsApp = db => {
//   const greetedUsernames = [];

  let validUsername = "";
  let greeting = "";
  let message = "";
  
  const setValidUsername = async (name, lang) => {
    validUsername = "";
    let pattern = /^[a-zA-Z]+$/;
    let lowerCaseName = name.toLowerCase().trim();

    if (lowerCaseName) {
      if (pattern.test(lowerCaseName)) {
        validUsername = lowerCaseName;
  
        // CHECK if the object in greetedUsernames with username key equals to the validUsername variable
        // const nameToBeGreeted = greetedUsernames.find(obj => obj.username === validUsername);
  
        let nameToBeGreeted = await db.oneOrNone(
          "SELECT username FROM greeting.greetings WHERE username = $1",
          validUsername
        );
  
        if (nameToBeGreeted) {
          await db.none("UPDATE greeting.greetings SET counter = counter + 1 WHERE username = $1", validUsername)
          // nameToBeGreeted.numberOfGreetings++;
        } else if (!nameToBeGreeted && lang) {
          await db.none("INSERT INTO greeting.greetings (username, counter) values ($1, $2)", [validUsername, 1])
        }
      } else {
        message = "Please, enter a valid name. eg. ABCDEabcde";
      }
    } else {
      message = "Please enter your name.";
    }
  };

  const greetName = lang => {
    
    if (validUsername && lang) {
      
      if (lang === "IsiXhosa") {
        greeting = `Molo, ${validUsername}`;
      } else if (lang === "Venda") {
        greeting = `Nda, ${validUsername}`;
      } else if (lang === "English") {
        greeting = `Hello, ${validUsername}`;
      }
      
    } else if (!validUsername && !lang) {
      message = "Please enter name and select language.";

    } else if (!lang) {
      message = "Please, select a language.";
    }
  };

  const getGreeting = () => greeting;

  // when the getGreeting() returns a greeting, GET the length of the object inside greetedUsername
  // OTHERWISE, the greetingsCounter() returns 0
  // const greetingsCounter = () => getGreeting() ? greetedUsernames.length : 0;

  const greetingsCounter = async () => await db.oneOrNone("SELECT COUNT(username) FROM greeting.greetings");

  const greetedUsers = async () => await db.any("SELECT * FROM greeting.greetings ORDER BY counter DESC");

  const getUserData = async userName => {
    // greetedUsernames.filter((userData) => userData.username === name);

    let database = await db.any("SELECT * FROM greeting.greetings");
    let userDataArray = [];
    
    database.forEach(userData => {
        if (userData.username === userName) {
            userDataArray.push(userData);
        };
    });

    return userDataArray;
  };

  const getMessage = () => {
    return { 
      message
    }
  };

  const resetApp = async () => {
    greeting = "";
    message = "";
    await db.none("DELETE FROM greeting.greetings");
  };

  return {
    setValidUsername,
    greetName,
    getGreeting,
    greetingsCounter,
    greetedUsers,
    getUserData,
    getMessage,
    resetApp
  };
};

export default greetingsApp;
