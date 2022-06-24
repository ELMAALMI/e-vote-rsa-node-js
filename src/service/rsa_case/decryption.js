import crypto from 'crypto';
const path = require('path');
require('dotenv').config();
const decryptedData =(data,privateKey)=>{ crypto.privateDecrypt(
    {
      key: privateKey,
      padding: process.env.PADDING,
      oaepHash: process.env.ALGO,
    },
    data
  );
  }
module.exports = decryptedData