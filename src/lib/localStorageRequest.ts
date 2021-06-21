import { encryptText, decryptText } from './AESEncryption';

export const getItem = (itemName: string) => {
    console.log(itemName);
    const encryptedHex = localStorage.getItem(itemName);
    console.log('encrypted', encryptedHex);

    if (!encryptedHex) return '';

    const res = decryptText(encryptedHex);
    return res
}

export const setItem = (itemName: string, value: string) => {
    const encryptedHex = encryptText(value);
    return localStorage.setItem(itemName, encryptedHex);
}

export const removeItem = (itemName: string) => {
    return localStorage.removeItem(itemName);
}

