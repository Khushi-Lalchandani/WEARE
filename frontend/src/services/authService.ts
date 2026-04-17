import axios from 'axios';
import type { User } from '../store/authSlice';

const API_URL = '/api/users';

// Register user
export const signup = async (email: string, password: string, name: string): Promise<{ user: User; token: string }> => {
    const response = await axios.post(API_URL, {
        name,
        email,
        password,
    });

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return { user: response.data, token: response.data.token };
};

// Login user
export const login = async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
    });

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return { user: response.data, token: response.data.token };
};

// Logout user
export const logout = (): void => {
    localStorage.removeItem('user');
};

// Get current user from local storage
export const getCurrentUser = (): { user: User; token: string } | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
        const user = JSON.parse(userStr);
        return { user, token: user.token };
    } catch (error) {
        console.error("Failed to parse user from local storage", error);
        return null;
    }
};
