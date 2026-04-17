import axios from 'axios'

const API_URL = '/api/orders/'

const createOrder = async (orderData: any, token: string) => {
    const config = { headers: { Authorization: `Bearer ${token}` } }

    const response = await axios.post(API_URL, orderData, config)
    return response.data
}

const getMyOrders = async (token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }

    }
    const response = await axios.get(API_URL + 'myorders', config)
    return response.data
}

const getOrderDetails = async (orderId: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + orderId, config)
    return response.data
}

const getAllOrders = async (token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const payOrder = async (orderId: string, paymentResult: any, token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.put(`${API_URL}${orderId}/pay`, paymentResult, config)
    return response.data
}

const deliverOrder = async (orderId: string, token: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.put(`${API_URL}${orderId}/deliver`, {}, config)
    return response.data
}

const orderService = {
    createOrder,
    getMyOrders,
    getOrderDetails,
    getAllOrders,
    payOrder,
    deliverOrder,
};

export default orderService;