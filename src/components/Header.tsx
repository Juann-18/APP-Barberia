import Logo from '../assets/Logo.jpg'
import user from '../assets/user.jpg'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { user: authUser, signOut, userRole } = useAuth();
  const navigate = useNavigate();

  const handlePerfilClick = () => {
    navigate('/profile');
  }

  const handleLogoClick = () => {
    navigate('/');
  }

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
  return (
    <header className='bg-white py-4 border-b border-gray-200'>
      <div className='container mx-auto px-2'>
        <div className='flex items-center justify-between gap-x-4'>
          <div className='flex items-center'>
            <button
              onClick={handleLogoClick}>
              <img src={Logo} alt="Logo" className='h-24 w-auto' />
            </button>
          </div>
          <div className="flex-1 mx-2">
            <input
              type="text"
              placeholder="Buscar..."
              className="px-4 py-2 w-full max-w-xs rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>
          <div className='flex items-center gap-4'>
            {authUser && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#60758a]">
                  {authUser.email}
                </span>
                {userRole && (
                  <span className="px-2 py-1 bg-[#f0f2f5] text-xs rounded-full text-[#111418]">
                    {userRole}
                  </span>
                )}
              </div>
            )}
            <button 
              onClick={handlePerfilClick}>
              <img src={user} alt="usuario" className='w-auto h-16 rounded-full object-cover' />
            </button>
            {authUser && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-[#60758a] hover:text-[#111418] transition-colors"
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
