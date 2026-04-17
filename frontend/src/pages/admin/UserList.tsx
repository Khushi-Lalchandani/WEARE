import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store/store';
import { listUsers, deleteUser, reset } from '../../store/adminUserSlice';

const UserList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error, success } = useSelector((state: RootState) => state.adminUser);

    useEffect(() => {
        dispatch(listUsers());
        if (success) {
            dispatch(reset());
        }
    }, [dispatch, success]);

    const deleteHandler = (id: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id));
        }
    };

    return (
        <div className="container mx-auto px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Users</h1>
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
                                <th className="px-6 py-3 font-semibold text-gray-700">EMAIL</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">ADMIN</th>
                                <th className="px-6 py-3 font-semibold text-gray-700"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm">{user._id.substring(0, 8)}...</td>
                                    <td className="px-6 py-4 font-medium">{user.name}</td>
                                    <td className="px-6 py-4">
                                        <a href={`mailto:${user.email}`} className="text-blue-600 hover:text-blue-800 underline decoration-blue-200 underline-offset-4 font-medium">
                                            {user.email}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.isAdmin ? (
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Admin</span>
                                        ) : (
                                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">User</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-3">
                                            <Link to={`/admin/user/${user._id}/edit`} className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteHandler(user._id)}
                                                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
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

export default UserList;
