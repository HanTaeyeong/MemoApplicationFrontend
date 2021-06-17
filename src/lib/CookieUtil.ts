
export function setCookie(name: string, value: string, days: number) {
    let expires = "";

    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();

    const cookieFormat = `${name}=${value}${expires}; path=/`;
    document.cookie = cookieFormat;
}
export function getCookie(name: string) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key.trim() === name) {
            return value;
        }
    }
    return '';
}
export function eraseCookie(name: string) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}