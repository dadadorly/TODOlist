import { isUserLoggedIn } from "./isUserLoggedIn";

describe("LocalProtocol", () => {
  describe("onVerify()", () => {
    it("should return", async () => {
      //given
      const req = {
        body: {
          user: "exist"
        }
      } as any;
      const res = {
        body: {
          user: "exist"
        }
      } as any;
      const next = {
        body: {
          user: "exist"
        }
      } as any;
      //when
      const result = isUserLoggedIn(req, res, next);
      //then
      expect(result).toEqual(true);
    });
  });
});
