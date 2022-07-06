import { comparePassword, encryptPassword } from "./encryptPassword";
import bcrypt from "bcrypt";

describe("encryptPassword.ts", () => {
  describe("encryptPassword", () => {
    it("should hash the password with encryptPassword(password)", async () => {
      //given
      jest.spyOn(bcrypt, "genSalt");
      jest.spyOn(bcrypt, "hash");
      //when
      const result = await encryptPassword("password");
      //then
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(comparePassword(result, "password")).toBeTruthy();
    });
  });
  describe("comparePassword", () => {
    it("should compare password and return true when passwords match", async () => {
      //given
      jest.spyOn(bcrypt, "compare");
      //when
      const result = await comparePassword("password", "$2b$10$DJDAcVi8r7rDTShvXH.ABu10wpbm3KTCy7/wYkTADKP16XMpsI7D6");
      //then
      expect(result).toEqual(true);
    });
    it("should compare password and return false when passwords don't match", async () => {
      //given
      jest.spyOn(bcrypt, "compare");
      //when
      const result = await comparePassword("password", "something-else");
      //then
      expect(result).toEqual(false);
    });
  });
});
