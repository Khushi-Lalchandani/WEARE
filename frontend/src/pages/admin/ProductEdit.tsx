import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { getProductDetails, updateProduct, reset } from '../../store/productSlice';

const ProductEdit = () => {
    const { id } = useParams<{ id: string }>();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { product, loading, error, success } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        if (success) {
            dispatch(reset());
            navigate('/admin/products');
        } else {
            if (!product.name || product._id !== id) {
                dispatch(getProductDetails(id!));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, navigate, id, product, success]);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                id: id!,
                productData: {
                    name,
                    price,
                    image,
                    brand,
                    category,
                    countInStock,
                    description,
                },
            })
        );
    };

    return (
        <div className="container mx-auto px-8 py-12">
            <Link to="/admin/products" className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors mb-6 inline-block">
                Go Back
            </Link>

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500 mb-4">{error}</p>
                ) : (
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                <input
                                    type="number"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(Number(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                                <input
                                    type="text"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                        >
                            Update Product
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProductEdit;
