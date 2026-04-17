import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from '../services/productService'

interface ProductState {
    products: any[]
    product: any
    loading: boolean
    success: boolean
    error: string | null
}

const initialState: ProductState = {
    products: [],
    product: {},
    loading: false,
    success: false,
    error: null,
}

export const listAllProducts = createAsyncThunk(
    'product/listAll',
    async (_, thunkAPI) => {
        try {
            return await productService.getAllProducts()
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'product/delete',
    async (id: string, thunkAPI) => {
        try {
            const token = (thunkAPI.getState() as any).auth.token
            return await productService.deleteProduct(id, token)
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const createProduct = createAsyncThunk(
    'product/create',
    async (_, thunkAPI) => {
        try {
            const token = (thunkAPI.getState() as any).auth.token
            return await productService.createProduct(token)
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateProduct = createAsyncThunk(
    'product/update',
    async ({ id, productData }: { id: string; productData: any }, thunkAPI) => {
        try {
            const token = (thunkAPI.getState() as any).auth.token
            return await productService.updateProduct(id, productData, token)
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getProductDetails = createAsyncThunk(
    'product/details',
    async (id: string, thunkAPI) => {
        try {
            return await productService.getProductById(id)
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.success = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(listAllProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(listAllProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(listAllProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.product = action.payload
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.product = action.payload
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(getProductDetails.pending, (state) => {
                state.loading = true
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.loading = false
                state.product = action.payload
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { reset } = productSlice.actions
export default productSlice.reducer
