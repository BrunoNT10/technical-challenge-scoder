import { Navigate, Outlet  } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthenticated: boolean;
}

export function PrivateRoute(props: PrivateRouteProps) {
  if (!props.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
