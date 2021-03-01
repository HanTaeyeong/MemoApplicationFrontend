export const getItem = (itemName: string) => {
    try {
        const result = localStorage.getItem(`${itemName}`);
        return result ? result :'';
    } catch (e) {
        console.log(e);
    }
}

export const setItem = (itemName: string, value: string) => {
    try {
        return localStorage.setItem(`${itemName}`, value);
    } catch (e) {
        console.log(e)
    }
}

export const removeItem = (itemName: string) => {
    try {
        return localStorage.removeItem(`${itemName}`);
    } catch (e) {
        console.log(e)
    }
}
