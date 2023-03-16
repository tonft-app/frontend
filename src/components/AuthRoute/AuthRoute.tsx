import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import logging from '../../config/logging';
import { connector } from '../../connector';


export interface IAuthRouteProps {
    children: ReactNode, 
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = ({children}) => {
    if (connector.wallet === null){
        logging.info('Unauthorized, redirecting.');
        return <Navigate to="/" replace={true} />;
    } else {
        return <>{children}</>
    }
}

export default AuthRoute;