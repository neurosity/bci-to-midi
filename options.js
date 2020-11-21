const { config } = require("dotenv");

config();

module.exports = {
  deviceId: process.env.NEUROSITY_DEVICE_ID,
  email: process.env.NEUROSITY_EMAIL,
  password: process.env.NEUROSITY_PASSWORD
};
