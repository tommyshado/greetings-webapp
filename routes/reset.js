

const dataReset = greetingsLogic => {
    const reset = async (req, res) => {
        await greetingsLogic.resetApp();
        res.redirect("/");
    }

    return {
        reset
    }
}

export default dataReset;