import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FormInput } from '../components/FormInput'; 
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboardBarber'); // Redirigir al dashboard después del login
    } catch (error: any) {
      console.error('Error en login:', error);
      if (error.code === 'auth/user-not-found') {
        setError('Usuario no encontrado');
      } else if (error.code === 'auth/wrong-password') {
        setError('Contraseña incorrecta');
      } else if (error.code === 'auth/invalid-email') {
        setError('Email inválido');
      } else {
        setError('Error al iniciar sesión. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
        <h2 className="text-[#111418] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Iniciar Sesión
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <FormInput
            type="email"
            placeholder="Email"
            value={email}
            setValue={setEmail}
            required
          />
          
          <FormInput
            type="password"
            placeholder="Contraseña"
            value={password}
            setValue={setPassword}
            required
          />
          
          {error && (
            <div className="px-4 py-2">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
          
          <div className="px-4 py-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111418] text-white rounded-xl py-3 px-4 font-medium hover:bg-[#2a2f38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
        
        <div className="px-4 py-3 text-center">
          <p className="text-[#60758a] text-sm">
            ¿No tienes una cuenta?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-[#111418] font-medium hover:underline"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}; 