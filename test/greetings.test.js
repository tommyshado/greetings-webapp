import assert from "assert"
import greetingsApp from "../greetings.js";
import pgPromise from "pg-promise";
import "dotenv/config";

// pg promise instance
const pgp = pgPromise();

let useSSL = false;
let local = process.env.LOCAL || false;

if (process.env.DB_URL && !local) {
    useSSL = true;
}

const DB_URL = process.env.DB_URL;

const config = { 
    connectionString : DB_URL
}

let db = pgp(config);


describe("greetingsApp", () => {
    let greetings;

    beforeEach(() => {
        greetings = greetingsApp(db);
    });

    it("should be able to greet a username in 'IsiXhosa'", asy() => {
        greetings.setValidUsername('Mthunzi');
        greetings.setGreetingWithLang("IsiXhosa");

        assert.equal('Molo, mthunzi', greetings.getGreeting());
    });

    it("should be able to greet a username in 'English'", () => {
        greetings.setValidUsername('nicholas');
        greetings.setGreetingWithLang("English");

        assert.equal('Hello, nicholas', greetings.getGreeting());
    });

    it("should be able to greet a username in 'Venda'", () => {
        greetings.setValidUsername('Tendani');
        greetings.setGreetingWithLang("Venda");

        assert.equal('Nda, tendani', greetings.getGreeting());
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