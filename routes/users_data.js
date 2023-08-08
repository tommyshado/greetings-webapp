const allGreetedUsers = greetingsLogic => {

  const all = async (req, res) => {
    const username = req.params.username;

    res.render("counter", {
      name: await greetingsLogic.getUserData(username),
    });
  };

  return {
    all
  }

};

export default allGreetedUsers;
