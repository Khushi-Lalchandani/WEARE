import axios from 'axios'

const API_URL = '/api/products/'

const getAllProducts = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

const getProductById = async (id: string) => {
    const response = await axios.get(API_URL + id)
    return response.data
}

const deleteProduct = async (id: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + id, config)
    return response.data
}

const createProduct = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, {}, config)
    return response.data
}

const updateProduct = async (id: string, productData: any, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + id, productData, config)
    return response.data
}

const productService = {
    getAllProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
}

export default productService
