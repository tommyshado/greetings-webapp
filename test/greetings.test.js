import assert from "assert";
import greetingsApp from "../greetings.js";
import pgPromise from "pg-promise";
import "dotenv/config";

// instance
const pgp = pgPromise();

// we are using a special test database for the tests
const connectionString = process.env.DB_URL;
console.log(connectionString);

const db = pgp(connectionString);

describe("greetingsApp", function () {
    this.timeout(6000);

    beforeEach(async function () {
        try {
            await db.none(
                "TRUNCATE TABLE greeting.greetings RESTART IDENTITY CASCADE"
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    it("should be able to add a user and get a user", async () => {
        try {
            const greetings = greetingsApp(db);
            await greetings.setValidUsername("tom", "English");


            assert.deepStrictEqual(
                [{ id: 1, username: "tom", counter: 1 }],
                await greetings.getUserData("tom")
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    it("should be able to add multiple users and get all users", async () => {
        try {
            const greetings = greetingsApp(db);

            await greetings.setValidUsername("tom", "Venda");
            await greetings.setValidUsername("kat", "IsiXhosa");

            assert.deepStrictEqual(
                [
                    { id: 1, username: "tom", counter: 1 },
                    { id: 2, username: "kat", counter: 1 }
                ],
                await greetings.greetedUsers()
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    it("should be able to get the count of a username in the database", async () => {
        try {
            const greetings = greetingsApp(db);

            await greetings.setValidUsername("kat", "IsiXhosa");
            const counter = await greetings.greetingsCounter();

            assert.equal(1, counter.count);
        } catch (error) {
            console.log(error);
        }
    })

    it("should be able to get the count of multiple usernames in the database", async () => {
        try {
            const greetings = greetingsApp(db);

            await greetings.setValidUsername("kat", "IsiXhosa");
            await greetings.setValidUsername("kat", "IsiXhosa");
            await greetings.setValidUsername("tom", "Venda");

            const counter = await greetings.greetingsCounter();

            assert.equal(2, counter.count);
        } catch (error) {
            console.log(error);
        }
    })



    it("should be able to update the counter of a username in the database", async () => {
        try {
            const greetings = greetingsApp(db);

            await greetings.setValidUsername("anele", "IsiXhosa");
            await greetings.setValidUsername("anele", "English");
            await greetings.setValidUsername("nicholas", "Venda");

            assert.deepStrictEqual(
                [
                    { id: 1, username: "anele", counter: 2 },
                    { id: 2, username: "nicholas", counter: 1 }
                ],
                await greetings.greetedUsers()
            );
        } catch (error) {
            console.log(error);
        }
    })

    after(() => {
        db.$pool.end;
    });

    // it("should be able to greet a username in 'Venda'", async () => {
    //     await greetings.setValidUsername('Tendani');
    //     greetings.greetName("Venda");

    //     assert.equal('Nda, tendani', greetings.getGreeting());
    // });

    // it("should be able to increment the counter by one", async () => {
    //     await greetings.setValidUsername('Tendani');

    //     const counter = await greetings.greetingsCounter();

    //     assert.equal(1, counter.count);
    // });

    // it("should be able to increment the counter by two", async () => {
    //     await greetings.setValidUsername('Tendani');
    //     await greetings.setValidUsername('Ngomso');

    //     const counter = await greetings.greetingsCounter();

    //     assert.equal(2, counter.count);
    // });
});
