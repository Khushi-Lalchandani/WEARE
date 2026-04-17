import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { getUserDetails, updateUser, reset } from '../../store/adminUserSlice';

const UserEdit = () => {
    const { id } = useParams<{ id: string }>();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { userDetails, loading, error, success } = useSelector((state: RootState) => state.adminUser);

    useEffect(() => {
        if (success) {
            dispatch(reset());
            navigate('/admin/users');
            return;
        }

        if (!userDetails || userDetails._id !== id) {
            dispatch(getUserDetails(id!));
        } else {
            setName(userDetails.name);
            setEmail(userDetails.email);
            setIsAdmin(userDetails.isAdmin);
        }
    }, [dispatch, navigate, id, userDetails, success]);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(
            updateUser({
                id: id!,
                userData: {
                    name,
                    email,
                    isAdmin,
                },
            })
        );
    };

    return (
        <div className="container mx-auto px-8 py-12">
            <Link to="/admin/users" className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors mb-6 inline-block">
                Go Back
            </Link>

            <div className="max-w-md mx-auto bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <h1 className="text-3xl font-bold mb-8 text-center">Edit User</h1>
                {loading ? (
                    <p className='text-center'>Loading...</p>
                ) : error ? (
                    <p className="text-red-500 mb-4 text-center">{error}</p>
                ) : (
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black placeholder:text-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black placeholder:text-gray-400"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isAdmin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                            />
                            <label htmlFor="isAdmin" className="text-sm font-medium text-gray-700">Administrator</label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                        >
                            Update User
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserEdit;
