const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const api = supertest(app);

const initialUser = {
  username: "username",
  passwordHash: "password",
  name: "name",
};

beforeEach(async () => {
  await User.deleteMany({});

  const userObject = new User(initialUser);
  await userObject.save();
});

describe("addition of a new user", () => {
  test("if password is too short, return 400 Bad Request", async () => {
    const newUser = {
      username: "hanh",
      password: "1",
    };
    await api.post("/api/users").send(newUser).expect(400);
  });
  test("if password is missing, return 400 Bad Request", async () => {
    const newUser = {
      username: "hanh",
    };
    await api.post("/api/users").send(newUser).expect(400);
  });
  test("if username is not unique, return 400 Bad Request", async () => {
    const newUser = {
      username: "username",
      password: "1234",
    };
    await api.post("/api/users").send(newUser).expect(400);
  });
  test("if username is too short, return 400 Bad Request", async () => {
    const newUser = {
      username: "ha",
      password: "1324",
    };
    await api.post("/api/users").send(newUser).expect(400);
  });
  test("if username is missing, return 400 Bad Request", async () => {
    const newUser = {
      password: "12345",
    };
    await api.post("/api/users").send(newUser).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
