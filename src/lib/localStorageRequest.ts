import aesjs from 'aes-js';

const defaultKey = [131, 22, 35, 41, 5, 6, 221, 8, 9, 23, 51, 22, 13, 15, 15, 16];
const key = process.env.REACT_APP_AES_COUNTER_KEY?.split(',').map(n => +n) || defaultKey;

export const encryptText = (text: string) => {
    const textBytes = aesjs.utils.utf8.toBytes(text);
    let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(7));
    let encryptedBytes = aesCtr.encrypt(textBytes);
    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

    return encryptedHex;
}

export const decryptText = (encryptedHex: string) => {
    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(7));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

    return decryptedText;
}


export const getItem = (itemName: string) => {
    const encryptedHex = localStorage.getItem(itemName);
    if (!encryptedHex) return '';
    return decryptText(encryptedHex);
}

export const setItem = (itemName: string, value: string) => {
    const encryptedHex = encryptText(value);
    return localStorage.setItem(itemName, encryptedHex);
}

export const removeItem = (itemName: string) => {
    return localStorage.removeItem(itemName);
}




