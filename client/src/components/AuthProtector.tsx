import React, { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthProtectorProps {
    children: ReactNode; // Define children as a prop
}

const AuthProtector: React.FC<AuthProtectorProps> = ({ children }) => {
    const token = localStorage.getItem("token");
    const { pathname } = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        if (!token && pathname.includes("/dashboard")) {
            navigate('/')
        }
        if(token && !pathname.includes("/dashboard")){
            navigate('/dashboard')
        }
    }, [pathname, token])



    return <>{children}</>; // Render children if token exists
};

export default AuthProtector;
