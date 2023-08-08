import assert from "assert";
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
    this.timeout(7000);
    const greetings = greetingsApp(db);
    beforeEach(async function () {
    // try {
      await db.none(
        "TRUNCATE TABLE greeting.greetings RESTART IDENTITY CASCADE"
      );
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }
  });

  it("should be able to add a user and get a user", async () => {
    // try {
      const greetings = greetingsApp(db);
      await greetings.setValidUsername("tom");

      assert.deepStrictEqual(
        [{ id: 1, username: "tom", counter: 1 }],
        await greetings.getUserData("tom")
      );
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }
  });

  it("should be able to add multiple users and get all users", async () => {
    try {
      await greetings.setValidUsername("tom");
      await greetings.setValidUsername("kat");

      assert.deepStrictEqual(
        [
          { id: 1, username: "tom", counter: 2 },
          { id: 2, username: "kat", counter: 1 }
        ],
        await greetings.greetedUsers()
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

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
