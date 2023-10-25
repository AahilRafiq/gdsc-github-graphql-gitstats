import CryptoJS from 'crypto-js';
import 'dotenv/config'

// Your passphrase for encryption/decryption
const passphrase = process.env.ENCRYPT_SECRET;

// Function to encrypt a message
function encryptMessage(message) {
  const encrypted = CryptoJS.AES.encrypt(message, passphrase).toString();
  return encrypted;
}

// Function to decrypt a message
function decryptMessage(encryptedMessage) {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, passphrase);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
}

export{
    encryptMessage,
    decryptMessage
}
