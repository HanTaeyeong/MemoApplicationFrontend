import { encryptText, decryptText } from './AESEncryption';

export const getItem = (itemName: string) => {
    try {
        console.log('getItem itemName',itemName);
        const encryptedHex = localStorage.getItem(itemName);
        console.log('getItem before decrypted',encryptedHex);
        
        if (!encryptedHex) return '';

        const res = decryptText(encryptedHex);
        console.log('getItem after decrypted',res);
        return res
    } catch (e) { console.log(e) }
}

export const setItem = (itemName: string, value: string) => {
    try {
        console.log('setItem before encrypt',itemName, ': ',value);

        const encryptedHex = encryptText(value);
        console.log('setItem after encrypted', encryptedHex);
        localStorage.setItem(itemName, encryptedHex);
        console.log('at localSToraget',localStorage.getItem(itemName));
        console.log();

        return;
    } catch (e) { console.log(e) }
}

export const removeItem = (itemName: string) => {
    return localStorage.removeItem(itemName);
}

