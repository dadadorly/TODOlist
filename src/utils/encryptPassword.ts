import bcrypt from "bcrypt";

export async function encryptPassword(password: string) {
  // generate salt
  const salt = await bcrypt.genSalt(10);
  // hash the password
  return bcrypt.hash(password, salt);
}

export async function comparePassword(candidatePassword: string, password: string) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
}
