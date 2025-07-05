import Logo from '../assets/Logo.jpg'
import user from '../assets/user.jpg'

export const Header = () => {
  const handlePerfilClick = () => {
    console.log('Perfil clicked');
  }

  const handleLogoClick = () => {
    console.log('Logo clicked');
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
          <div className='flex items-center'>
            <button 
              onClick={handlePerfilClick}>
              <img src={user} alt="usuario" className='w-auto h-16 rounded-full object-cover' />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
