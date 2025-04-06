import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      try {
        // Store the token
        localStorage.setItem('token', token);
        // Update auth context
        login(token);
        // Redirect to home page
        navigate('/');
      } catch (error) {
        console.error('Error during login:', error);
        navigate('/login');
      }
    } else {
      // If no token, redirect to login
      navigate('/login');
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập thành công
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Đang chuyển hướng...
          </p>
        </div>
      </div>
    </div>
  );
} 