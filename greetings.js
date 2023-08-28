const greetingsApp = db => {

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
  
        let nameToBeGreeted = await db.oneOrNone(
          "SELECT username FROM greeting.greetings WHERE username = $1",
          validUsername
        );
  
        if (nameToBeGreeted) {
          await db.none("UPDATE greeting.greetings SET counter = counter + 1 WHERE username = $1", validUsername)
          
        } else if (!nameToBeGreeted && lang) {
          await db.none("INSERT INTO greeting.greetings (username, counter) values ($1, $2)", [validUsername, 1]);
          return true;

        }
      } return false;
    }
    return false;
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

      // set message variable to an empty string
      message = "";
      
    }
  };

  const getGreeting = () => greeting;

  const greetingsCounter = async () => await db.oneOrNone("SELECT COUNT(username) FROM greeting.greetings");

  const greetedUsers = async () => await db.any("SELECT * FROM greeting.greetings ORDER BY counter DESC");

  const getUserData = async userName => {

    let database = await db.any("SELECT * FROM greeting.greetings");
    let userDataArray = [];
    
    database.forEach(userData => {
        if (userData.username === userName) {
            userDataArray.push(userData);
        };
    });

    return userDataArray;
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
    resetApp
  };
};

export default greetingsApp;
