const crypto = require("crypto");
const path = require('path');
require('dotenv').config();
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: process.env.LEN,
});
export { publicKey, privateKey}