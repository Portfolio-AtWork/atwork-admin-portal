import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { isTokenValid } from '@/lib/jwt-utils';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (isTokenValid(token)) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [navigate]);
  return null;
};

export default Index;
