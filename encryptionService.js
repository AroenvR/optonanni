import CryptoJS from 'crypto-js';

export const encryptObject = (object) => {
  return {
    id: object.id,
    cipherText: CryptoJS.AES.encrypt(object.message, object.key).toString(),
  };
}