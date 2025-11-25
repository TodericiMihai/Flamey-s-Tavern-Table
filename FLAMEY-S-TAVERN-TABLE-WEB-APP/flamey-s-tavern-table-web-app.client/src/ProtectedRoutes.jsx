import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    // 🛑 BYPASS: If local storage has a user, let them in!
    // We do NOT check the backend in this design phase.
    const isAuth = localStorage.getItem('user');

    return (
        isAuth ? <Outlet /> : <Navigate to='/login' />
    );
}

export default ProtectedRoutes;