import { registerUser } from "../../data/api.js";

export const registerModel = {
  async registerUser(name, email, password) {
    return await registerUser(name, email, password);
  },
};
