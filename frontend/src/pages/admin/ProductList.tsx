import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { listAllProducts, deleteProduct, createProduct, reset } from '../../store/productSlice';

const ProductList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { products, loading, error, success, product: createdProduct } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        dispatch(reset());

        if (success && createdProduct?._id) {
            navigate(`/admin/product/${createdProduct._id}/edit`);
        } else {
            dispatch(listAllProducts());
        }
    }, [dispatch, navigate, success, createdProduct]);

    const deleteHandler = (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id));
        }
    };

    const createProductHandler = () => {
        dispatch(createProduct());
    };

    return (
        <div className="container mx-auto px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Products</h1>
                <button
                    onClick={createProductHandler}
                    disabled={loading}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    <span className="text-xl">+</span> Create Product
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500 mb-4">{error}</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-gray-700">ID</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">NAME</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">PRICE</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">CATEGORY</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">BRAND</th>
                                <th className="px-6 py-3 font-semibold text-gray-700"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm">{product._id.substring(0, 8)}...</td>
                                    <td className="px-6 py-4 font-medium">{product.name}</td>
                                    <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4">{product.category}</td>
                                    <td className="px-6 py-4">{product.brand}</td>
                                    <td className="px-6 py-4">
                                        <Link to={`/admin/product/${product._id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium mr-4">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteHandler(product._id)}
                                            className="text-red-600 hover:text-red-800 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductList;
