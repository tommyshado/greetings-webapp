import assert from "assert"
// import greetingsApp from "../greetings.js";
import pgPromise from "pg-promise";
import "dotenv/config";
import fs from "fs";

// instance
const pgp = pgPromise({});

// we are using a special test database for the tests
const connectionString = process.env.DB_URL;

const db = pgp(connectionString);

describe("greetingsApp", () => {
    // let greetings;

    beforeEach(async function() {
        this.timeout(5000);
        // greetings = greetingsApp();
        await db.none("DELETE FROM greetings");
        const commandText = fs.readFileSync("./sql/data.sql", "utf-8");
        await db.none(commandText);
    });


    it("should be able to count the number of people in the database", async () => {
        const result = await db.one("SELECT COUNT(username) FROM greetings");

        assert.equal(1, result.count);
    });


    

    // it("should be able to greet a username in 'IsiXhosa'", async () => {

        
    // });

    // it("should be able to greet a username in 'English'", () => {
    //     greetings.setValidUsername('nicholas');
    //     greetings.greetName("English");

    //     assert.equal('Hello, nicholas', greetings.getGreeting());
    // });

    // it("should be able to greet a username in 'Venda'", () => {
    //     greetings.setValidUsername('Tendani');
    //     greetings.greetName("Venda");

    //     assert.equal('Nda, tendani', greetings.getGreeting());
    // });

    // it("should be able to increment the counter by one", () => {
    //     greetings.setValidUsername('Tendani');
    //     greetings.greetName("Venda");

    //     assert.equal(1, greetings.greetingsCounter());
    // });

    // it("should be able to increment the counter by two", () => {
    //     greetings.setValidUsername('Tendani');
    //     greetings.greetName("Venda");

    //     greetings.setValidUsername('Ngomso');
    //     greetings.greetName("English");

    //     assert.equal(2, greetings.greetingsCounter());
    // });
});