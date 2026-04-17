import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../services/orderServices';

export interface Order {
    _id?: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
    orderItems: any[];
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    paymentMethod: string;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: string;
    isDelivered: boolean;
    deliveredAt?: string;
    createdAt?: string;
}

interface OrderState {
    orders: Order[];
    currentOrder: Order | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
}

const initialState: OrderState = {
    orders: [],
    currentOrder: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

// Create new order
export const createOrder = createAsyncThunk(
    'order/create',
    async (orderData: any, thunkAPI) => {
        try {
            const token = (thunkAPI.getState() as any).auth.token;
            return await orderService.createOrder(orderData, token);
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get user orders
export const listMyOrders = createAsyncThunk(
    'order/listMyOrders',
    async (_, thunkAPI) => {
        try {
            const token = (thunkAPI.getState() as any).auth.token;
            return await orderService.getMyOrders(token);
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get order by ID
export const getOrderDetails = createAsyncThunk(
    'order/details',
    async (id: string, thunkAPI) => {
        try {
            const token = (thunkAPI.getState() as any).auth.token;
            return await orderService.getOrderDetails(id, token);
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Pay order
export const payOrder = createAsyncThunk(
    'order/pay',
    async ({ orderId, paymentResult }: { orderId: string; paymentResult: any }, thunkAPI) => {
        try {
            const token = (thunkAPI.getState() as any).auth.token;
            return await orderService.payOrder(orderId, paymentResult, token);
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Admin: Deliver order
export const deliverOrder = createAsyncThunk(
    'order/deliver',
    async (orderId: string, thunkAPI) => {
        try {
            const token = (thunkAPI.getState() as any).auth.token;
            return await orderService.deliverOrder(orderId, token);
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Admin: List all orders
export const listAllOrders = createAsyncThunk(
    'order/listAll',
    async (_, thunkAPI) => {
        try {
            const token = (thunkAPI.getState() as any).auth.token;
            return await orderService.getAllOrders(token);
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrder: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentOrder = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(listMyOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(listMyOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(listMyOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentOrder = action.payload;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(payOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(payOrder.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(payOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(deliverOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deliverOrder.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(deliverOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(listAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(listAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
            })
            .addCase(listAllOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            });
    },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
