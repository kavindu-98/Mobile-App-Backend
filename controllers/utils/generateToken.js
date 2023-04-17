import  jwt  from "jsonwebtoken";
const MAX_AGE = 3 * 24 * 60 * 60;

export const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: MAX_AGE,
  });
};