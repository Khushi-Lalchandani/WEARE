import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Products
export const fetchProducts = async (tag?: string, category?: string, keyword?: string) => {
    let url = '/products?';
    if (tag) url += `tag=${tag}&`;
    if (category) url += `category=${category}&`;
    if (keyword) url += `keyword=${keyword}&`;

    const { data } = await API.get(url);
    return data;
};

export const fetchProductById = async (id: string | number) => {
    const { data } = await API.get(`/products/${id}`);
    return data;
};
