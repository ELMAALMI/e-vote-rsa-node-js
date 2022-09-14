const openpgp = require('openpgp');
const fs = require('fs');
const path = require('path');

const passphrase = 'e-vote/2022';

async function generate() {
    try {
        const { privateKey, publicKey } = await openpgp.generateKey({
            userIDs: [{ name: 'e-vote', email: 'contact@e-vote.com' }],
            curve: 'ed25519',
            passphrase
        });
        fs.writeFileSync('src/keys/privateKey.pem', privateKey);
        fs.writeFileSync('src/keys/publickey.pem', publicKey);
    } catch (e) {
        console.log(e);
    }
}
const getKeys = async () => {
    try {
        const _publicKey = fs.readFileSync('src/keys/publicKey.pem').toString();
        const _privateKey = fs.readFileSync('src/keys/privateKey.pem').toString();

        const publicKey = await openpgp.readKey({ armoredKey: _publicKey });
        const privateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({ armoredKey: _privateKey }),
            passphrase
        });
        return {
            publicKey,
            privateKey
        };
    } catch (error) {
        console.log(error);
    }
};
async function encrypt(message) {
    try {
        const { publicKey, privateKey } = await getKeys();
        const encrypted = await openpgp.encrypt({
            message: await openpgp.createMessage({ text: message }),
            encryptionKeys: publicKey,
            signingKeys: privateKey
        });
        return encrypted;
    } catch (error) {
        console.log(error);
    }
}

async function decrypt(messageEncrypt) {
    try {
        const message = await openpgp.readMessage({
            armoredMessage: messageEncrypt // parse armored message
        });
        const { publicKey, privateKey } = await getKeys();

        const { data: decrypted, signatures } = await openpgp.decrypt({
            message,
            verificationKeys: publicKey, // optional
            decryptionKeys: privateKey
        });
        return decrypted;
    } catch (error) {
        console.log(error);
    }
}
const testEncryption = async () => {
    const mm = await encrypt('billal');
    console.log(mm);
    const de = await decrypt(mm);
    console.log(de);
};
module.exports = {
    generate,
    encrypt,
    decrypt,
    testEncryption
};
