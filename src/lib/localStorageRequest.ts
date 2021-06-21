import { encryptText, decryptText } from './AESEncryption';

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

