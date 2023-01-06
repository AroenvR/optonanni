import CryptoJS from 'crypto-js';

export const sha2 = (message) => {
    return CryptoJS.SHA256(message).toString();
}

export const encryptObject = (object) => {
  return {
    id: object.id,
    cipherText: CryptoJS.AES.encrypt(object.message, object.key).toString(),
  };
}