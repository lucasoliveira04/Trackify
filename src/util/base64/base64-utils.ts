export const base64UrlEncode = (str: string): string => {
    const base64 = btoa(unescape(encodeURIComponent(str)));
    return base64
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

export const base64UrlDecode = (str: string): string => {
    str = str
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const decoded = atob(str);
    return decodeURIComponent(escape(decoded));
}