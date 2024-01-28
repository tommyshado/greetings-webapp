import assert from "assert";
import greetingsApp from "../services/greetings.js";
import pgPromise from "pg-promise";
import "dotenv/config";

// instance
const pgp = pgPromise();

// we are using a special test database for the tests
const connectionString = process.env.DB_URL_TEST;

const db = pgp(connectionString);

describe("greetingsApp", function () {
    this.timeout(6000);

    beforeEach(async function () {
        try {
            await db.none(
                "TRUNCATE TABLE greetings RESTART IDENTITY CASCADE"
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    it("should be able to add a user and get a user", async () => {
        try {
            const greetings = greetingsApp(db);
            await greetings.addName("katlego");


            assert.deepStrictEqual(
                [{ id: 1, name: "katlego", count: 1 }],
                await greetings.addedNames()
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    it("should be able to add multiple users and get all users", async () => {
        try {
            const greetings = greetingsApp(db);
            await greetings.addName("katlego");
            await greetings.addName("niko");
            await greetings.addName("malebo");

            const greetedUsers = await greetings.addedNames();

            assert.equal(3, greetedUsers.length);
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    it("should be able to get the count of greetings for a greeted user", async () => {
        try {
            const greetings = greetingsApp(db);

            const greetUser = await greetings.addName("malebo");

            assert.equal(1, greetUser.count);
        } catch (error) {
            console.log(error);
            throw error;
        }
    })

    it("should be able to filter for a greeted user", async () => {
        try {
            const greetings = greetingsApp(db);

            await greetings.addName("katlego");
            await greetings.addName("niko");
            await greetings.addName("malebo");

            const filteredName = await greetings.filterForName("katlego");

            assert.deepStrictEqual(
                { id: 1, name: "katlego", count: 1 },
                filteredName
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    })

    after(() => {
        db.$pool.end;
    });
});
