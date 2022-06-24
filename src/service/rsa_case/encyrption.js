import crypto from 'crypto';
const path = require('path');
require('dotenv').config();
const encryptedData =(data,publicKey)=>{ crypto.publicEncrypt(
  {
    key: publicKey,
    padding: process.env.PADDING,
    oaepHash: process.env.ALGO,
  },
  Buffer.from(data)
);
}
module.exports=encryptedData