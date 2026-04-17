import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishListReducer from './wishListSlice';
import authReducer from './authSlice';
import orderReducer from './orderSlice';

import productReducer from './productSlice';
import adminUserReducer from './adminUserSlice';

// Load from localStorage
const loadFromLocalStorage = (key: string) => {
    try {
        const serialized = localStorage.getItem(key);
        if (serialized === null) return undefined;
        return JSON.parse(serialized);
    } catch (err) {
        console.error('Could not load from localStorage:', err);
        return undefined;
    }
};

// Save to localStorage
const saveToLocalStorage = (state: any) => {
    try {
        localStorage.setItem('cart', JSON.stringify(state.cart));
        localStorage.setItem('wishList', JSON.stringify(state.wishList));
        localStorage.setItem('order', JSON.stringify(state.order));
        // Note: auth token is stored separately by authService
    } catch (err) {
        console.error('Could not save to localStorage:', err);
    }
};

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishList: wishListReducer,
        auth: authReducer,
        order: orderReducer,
        product: productReducer,
        adminUser: adminUserReducer,
    },
    preloadedState: {
        cart: loadFromLocalStorage('cart'),
        wishList: loadFromLocalStorage('wishList'),
        order: loadFromLocalStorage('order'),
    },
});

// Subscribe to store changes
store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
