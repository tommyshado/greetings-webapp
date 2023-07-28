import assert from "assert"
import greetingsApp from "../greetings.js";


describe("greetingsApp", () => {
    let greetings;

    beforeEach(() => {
        greetings = greetingsApp();
    });

    it("should be able to greet a username in 'IsiXhosa'", () => {
        greetings.setValidUsername('Mthunzi');
        greetings.setGreetingWithLang("IsiXhosa");

        assert.equal('Molo, Mthunzi', greetings.getGreeting());
    });

    it("should be able to greet a username in 'English'", () => {
        greetings.setValidUsername('nicholas');
        greetings.setGreetingWithLang("English");

        assert.equal('Hello, nicholas', greetings.getGreeting());
    });

    it("should be able to greet a username in 'Venda'", () => {
        greetings.setValidUsername('Tendani');
        greetings.setGreetingWithLang("Venda");

        assert.equal('Nda, Tendani', greetings.getGreeting());
    });

    it("should be able to increment the counter by one", () => {
        greetings.setValidUsername('Tendani');
        greetings.setGreetingWithLang("Venda");

        assert.equal(1, greetings.greetingsCounter());
    });

    it("should be able to increment the counter by two", () => {
        greetings.setValidUsername('Tendani');
        greetings.setGreetingWithLang("Venda");

        greetings.setValidUsername('Ngomso');
        greetings.setGreetingWithLang("English");

        assert.equal(2, greetings.greetingsCounter());
    });
});