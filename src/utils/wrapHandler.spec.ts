import { wrapHandler } from "./wrapHandler";
import { NotFound } from "@tsed/exceptions";

describe("wrapHandler()", () => {
  it("should call handler and return a 204", async () => {
    const req = { jest: jest.fn() } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() } as any;
    const handler = jest.fn();
    const wrapper = wrapHandler(handler);
    // when
    await wrapper(req, res);
    // then
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalledWith();
    expect(handler).toHaveBeenCalledWith(req, res);
  });
  it("should call handler and return a 200 with the given response", async () => {
    const req = { jest: jest.fn() } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() } as any;
    const handler = jest.fn().mockResolvedValue([]);
    const wrapper = wrapHandler(handler);
    // when
    await wrapper(req, res);
    // then
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
    expect(handler).toHaveBeenCalledWith(req, res);
  });
  it("should return error ", async () => {
    const req = { jest: jest.fn() } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() } as any;
    const handler = jest.fn().mockRejectedValue(new Error("Message"));
    const wrapper = wrapHandler(handler);
    // when
    await wrapper(req, res);
    // then
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Message",
      stack: expect.any(String)
    });
    expect(handler).toHaveBeenCalledWith(req, res);
  });
  it("should throw error 404", async () => {
    const req = { jest: jest.fn() } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() } as any;
    const handler = jest.fn().mockRejectedValue(new NotFound("Message"));
    const wrapper = wrapHandler(handler);
    // when
    await wrapper(req, res);
    // then
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "Message",
      stack: expect.any(String)
    });
    expect(handler).toHaveBeenCalledWith(req, res);
  });
  it("should throw error 404 without stack trace", async () => {
    process.env.NODE_ENV = "production";
    const req = { jest: jest.fn() } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() } as any;
    const handler = jest.fn().mockRejectedValue(new NotFound("Message"));
    const wrapper = wrapHandler(handler);
    // when
    await wrapper(req, res);
    process.env.NODE_ENV = "test";
    // then
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "Message",
      stack: undefined
    });
    expect(handler).toHaveBeenCalledWith(req, res);
  });
});
