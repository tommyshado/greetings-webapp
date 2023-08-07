import assert from "assert"
import greetingsApp from "../greetings.js";
import pgPromise from "pg-promise";
import "dotenv/config";
import fs from "fs";

// instance
const pgp = pgPromise({});

// we are using a special test database for the tests
const connectionString = process.env.DB_URL;

const db = pgp(connectionString);

describe("greetingsApp", () => {
    let greetings;

    beforeEach(async function() {

        this.timeout(5000);
        greetings = greetingsApp(db);
        await db.none("DELETE FROM greeting.greetings");
    });

    it("should be able to greet a username in 'English'", async () => {
        await greetings.setValidUsername('nicholas');
        greetings.greetName("English");

        assert.equal('Hello, nicholas', greetings.getGreeting());
    });

    it("should be able to greet a username in 'Venda'", async () => {
        await greetings.setValidUsername('Tendani');
        greetings.greetName("Venda");

        assert.equal('Nda, tendani', greetings.getGreeting());
    });

    it("should be able to increment the counter by one", async () => {
        await greetings.setValidUsername('Tendani');
        greetings.greetName("Venda");

        assert.equal(1, await greetings.greetingsCounter());
    });

    it("should be able to increment the counter by two", async () => {
        await greetings.setValidUsername('Tendani');
        greetings.greetName("Venda");

        await greetings.setValidUsername('Ngomso');
        greetings.greetName("English");

        assert.equal(2, await greetings.greetingsCounter());
    });
});