import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../store/store';

interface AdminRouteProps {
    children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
    const { user } = useSelector((state: RootState) => state.auth);

    if (user && user.isAdmin) {
        return <>{children}</>;
    } else {
        return <Navigate to="/" replace />;
    }
};

export default AdminRoute;
