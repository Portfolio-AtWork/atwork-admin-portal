import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { MessagesResource } from '@/i18n/resources';
import { showNotification } from '@/lib/api';
import { isTokenValid } from '@/lib/jwt-utils';

interface PrivateRouteProps {
  children?: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!isTokenValid(token)) {
      showNotification(
        MessagesResource.TOKEN_HAS_EXPIRED.toString(),
        'warning',
      );
      navigate('/login');
    }
  }, [navigate]);

  return isTokenValid(localStorage.getItem('token')) && children ? (
    <>{children}</>
  ) : null;
};

export default PrivateRoute;
