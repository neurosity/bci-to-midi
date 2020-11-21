const { config } = require("dotenv");

config();

module.exports = {
  email: process.env.NEUROSITY_EMAIL,
  password: process.env.NEUROSITY_PASSWORD
};
