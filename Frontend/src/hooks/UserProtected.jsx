import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../components/Loading';
import UseAuth from './useAuth';

const ProtectedRoute = () => {
  const { user, loading } = UseAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
