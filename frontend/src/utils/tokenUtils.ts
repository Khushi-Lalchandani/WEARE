import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
    id: number;
    email: string;
    name: string;
    exp: number;
}

export const decodeToken = (token: string): TokenPayload | null => {
    try {
        return jwtDecode<TokenPayload>(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const isTokenExpired = (token: string): boolean => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Date.now();
    return decoded.exp < currentTime;
};

export const getTokenExpiry = (token: string): number | null => {
    const decoded = decodeToken(token);
    return decoded?.exp || null;
};

export const getUserFromToken = (token: string) => {
    const decoded = decodeToken(token);
    if (!decoded) return null;

    return {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
    };
};

export const isTokenValid = (token: string): boolean => {
    if (!token) return false;

    const decoded = decodeToken(token);
    if (!decoded) return false;

    return !isTokenExpired(token);
};
