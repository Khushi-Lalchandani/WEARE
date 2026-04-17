import axios from 'axios'

const API_URL = '/api/users/'

const getAllUsers = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const getUserById = async (id: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + id, config)
    return response.data
}

const deleteUser = async (id: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + id, config)
    return response.data
}

const updateUser = async (id: string, userData: any, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + id, userData, config)
    return response.data
}

const updateProfile = async (userData: any, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + 'profile', userData, config)
    return response.data
}

const userService = {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    updateProfile,
}

export default userService
