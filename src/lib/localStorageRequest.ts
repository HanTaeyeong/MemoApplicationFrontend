export const getItem = (itemName: string) => {
    const result = localStorage.getItem(itemName);
    return result ? result : '';
}

export const setItem = (itemName: string, value: string) => {
    return localStorage.setItem(itemName, value);
}

export const removeItem = (itemName: string) => {
    return localStorage.removeItem(itemName);
}