import SuperTest from "supertest";
import { app } from "../../app";
import { closeFakeDB, startFakeDB } from "../../db/startFakeDB";

describe("todoController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  beforeAll(async () => {
    request = SuperTest(app);
    await startFakeDB();
  });
  afterAll(async () => {
    await closeFakeDB();
  });
  describe("GET /todos", () => {
    it("should return todolist", async () => {
      const response = await request.get("/todos").expect(200);
      expect(response.body).toEqual([]);
    });
  });
  describe("POST /todos", () => {
    it("should return todolist with one todo", async () => {
      //request.post("/todos").send({ title: "todo-title" }).expect({});
    });
  });
});
