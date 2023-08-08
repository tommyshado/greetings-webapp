

const greetedUsers = greetingsLogic => {

    const showGreeted = async (req, res) => {
        res.render("greeted-users", {
          greetedUsers: await greetingsLogic.greetedUsers(),
        });
    };

    return {
        showGreeted
    }

};


export default greetedUsers;