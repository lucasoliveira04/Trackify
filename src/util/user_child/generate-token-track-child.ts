import CryptoJS from 'crypto-js';

interface TokenPayload {
    id: number;
    username: string;
    email: string;
    role: string;
    iat: number;
    formattedDate?: string; 
}

const base64UrlEncode = (str: string): string => {
    const base64 = btoa(unescape(encodeURIComponent(str)));
    return base64
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

const base64UrlDecode = (str: string): string => {
    str = str
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const decoded = atob(str);
    return decodeURIComponent(escape(decoded));
}

export const createTokenDataChild = (data: TokenPayload): string => {
    const header = {
        alg: "HS256",
        typ: "JWT"
    };

    const secret = 'your-256-bit-secret'; 

    const payload = {
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role,
        iat: Math.floor(Date.now() / 1000) 
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));

    const dataToSign = `${encodedHeader}.${encodedPayload}`;
    const signature = CryptoJS.HmacSHA256(dataToSign, secret)
        .toString(CryptoJS.enc.Base64)
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); 
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export const decodeToken = (token: string): TokenPayload | null => {
    try {
        const [, encodedPayload] = token.split('.');
        
        if (!encodedPayload) {
            throw new Error('Invalid token format');
        }

        const decodedPayload = base64UrlDecode(encodedPayload);

        const payload: TokenPayload = JSON.parse(decodedPayload);

        if (payload.iat) {
            payload.formattedDate = formatTimestamp(payload.iat);
        }

        return payload;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

export const userData: TokenPayload = {
    id: 123,
    username: "Lucas",
    email: "Teste@gmail.com",
    role: "child",
    iat: Math.floor(Date.now() / 1000) 
}
