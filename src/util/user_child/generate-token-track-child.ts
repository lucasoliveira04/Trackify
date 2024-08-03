import CryptoJS from 'crypto-js';
import { base64UrlDecode, base64UrlEncode } from '../base64/base64-utils';
import { formatTimestamp } from '../formated-date-time';

export interface TokenPayload {
    id: number;
    username: string;
    email: string;
    role: string;
    iat: number;
    addressClient: string | null;
    formattedDate?: string; 
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
        addressClient: data.addressClient,
        iat: data.iat
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
        return null;
    }
}
