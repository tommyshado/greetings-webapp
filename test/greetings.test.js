import assert from "assert"
import greetingsApp from "../greetings.js";
import pgPromise from "pg-promise";
import "dotenv/config"

// instance
const pgp = pgPromise();

// we are using a special test database for the tests
const connectionString = process.env.DB_URL;

const db = pgp(connectionString);

describe("greetingsApp", () => {
    let greetings;

    beforeEach(async () => {
        try {
            // clean the tables before each test run
            await db.none("TRUNCATE TABLE greetings_test RESTART IDENTITY CASCADE;");

        } catch (err) {
            console.log(err);
            throw err;
        };

        greetings = greetingsApp(db);
    });

    it("should be able to greet a username in 'IsiXhosa'", async () => {
        try {
            await greetings.setValidUsername('Mthunzi');
            greetings.greetName("IsiXhosa");
    
            assert.equal('Molo, mthunzi', greetings.getGreeting());
        } catch (error) {
            console.log(error);
        }
    });

    it("should be able to greet a username in 'English'", () => {
        greetings.setValidUsername('nicholas');
        greetings.greetName("English");

        assert.equal('Hello, nicholas', greetings.getGreeting());
    });

    it("should be able to greet a username in 'Venda'", () => {
        greetings.setValidUsername('Tendani');
        greetings.greetName("Venda");

        assert.equal('Nda, tendani', greetings.getGreeting());
    });

    it("should be able to increment the counter by one", () => {
        greetings.setValidUsername('Tendani');
        greetings.greetName("Venda");

        assert.equal(1, greetings.greetingsCounter());
    });

    it("should be able to increment the counter by two", () => {
        greetings.setValidUsername('Tendani');
        greetings.greetName("Venda");

        greetings.setValidUsername('Ngomso');
        greetings.greetName("English");

        assert.equal(2, greetings.greetingsCounter());
    });
});