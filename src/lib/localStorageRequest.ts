import { encryptText, decryptText } from './AESEncryption';

export const getItem = (itemName: string) => {
    try {
        const encryptedHex = localStorage.getItem(itemName);

        if (!encryptedHex) return '';

        const res = decryptText(encryptedHex);
        return res
    } catch (e) { console.log(e) }
}

export const setItem = (itemName: string, value: string) => {
    try {
        const encryptedHex = encryptText(value);
        localStorage.setItem(itemName, encryptedHex);
        return;
    } catch (e) { console.log(e) }
}

export const removeItem = (itemName: string) => {
    return localStorage.removeItem(itemName);
}

