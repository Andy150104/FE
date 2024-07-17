import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { ErrorPage } from '../layouts/404Page/ErrorPage';

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const [user, setUser] = useState<any>(null);
    const [hasAccess, setHasAccess] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            const access = allowedRoles.includes(parsedUser.role);
            setHasAccess(access);
        }
    }, [allowedRoles]);

    if (user === null) {
        return <ErrorPage/>;
    }

    return hasAccess ? <Outlet /> : <Navigate to="/home" />;
};

export default ProtectedRoute;
