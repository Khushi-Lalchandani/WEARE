import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../services/userService'

interface UserState {
    users: any[]
    userDetails: any
    loading: boolean
    success: boolean
    error: string | null
}

const initialState: UserState = {
    users: [],
    userDetails: null,
    loading: false,
    success: false,
    error: null,
}

export const listUsers = createAsyncThunk(
    'adminUser/list',
    async (_, thunkAPI) => {
        try {
            const token = (thunkAPI.getState() as any).auth.token
            return await userService.getAllUsers(token)
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteUser = createAsyncThunk(
    'adminUser/delete',
    async (id: string, thunkAPI) => {
        try {
            const token = (thunkAPI.getState() as any).auth.token
            return await userService.deleteUser(id, token)
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getUserDetails = createAsyncThunk(
    'adminUser/details',
    async (id: string, thunkAPI) => {
        try {
            const token = (thunkAPI.getState() as any).auth.token
            return await userService.getUserById(id, token)
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateUser = createAsyncThunk(
    'adminUser/update',
    async ({ id, userData }: { id: string; userData: any }, thunkAPI) => {
        try {
            const token = (thunkAPI.getState() as any).auth.token
            return await userService.updateUser(id, userData, token)
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateProfile = createAsyncThunk(
    'adminUser/updateProfile',
    async (userData: any, thunkAPI) => {
        try {
            const token = (thunkAPI.getState() as any).auth.token
            const data = await userService.updateProfile(userData, token)
            // Optionally update auth user in localStorage/authSlice
            localStorage.setItem('user', JSON.stringify(data))
            return data
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const adminUserSlice = createSlice({
    name: 'adminUser',
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
            .addCase(listUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(listUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
            .addCase(listUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false
                state.userDetails = action.payload
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProfile.fulfilled, (state) => {
                state.loading = false
                state.success = true
                state.userDetails = null // Reset or sync with auth user
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { reset } = adminUserSlice.actions
export default adminUserSlice.reducer
