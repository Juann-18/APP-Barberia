import React, { useState } from 'react';
import { SidebarItem } from './SidebarItem';
import { 
  DashboardIcon, 
  ProfileIcon, 
  ScheduleIcon, 
  ServicesIcon, 
  AppointmentsIcon 
} from './SidebarIcons';

export const Sidebar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboardBarber",
      icon: <DashboardIcon />
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <ProfileIcon />
    },
    {
      label: "Schedule",
      path: "/schedule",
      icon: <ScheduleIcon />
    },
    {
      label: "Services",
      path: "/services",
      icon: <ServicesIcon />
    },
    {
      label: "Appointments",
      path: "/appointments",
      icon: <AppointmentsIcon />
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Botón de menú móvil */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg border border-gray-200"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay para móvil */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative top-0 left-0 h-full z-40
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-80 md:w-auto
      `}>
        <div className="flex h-full min-h-screen md:min-h-[700px] flex-col justify-between bg-white p-4 shadow-lg md:shadow-none">
          <div className="flex flex-col gap-4">
            {/* Header del sidebar */}
            <div className="flex gap-3 items-center">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCcSs-viypmS8UFkYFlu5jLx4jtGmaoaqxGmv0cgZDbbMifYYRdqMVOJx10w1y6KcwfjQ22O0DT46azdaP6EOupgo-oKJ9sZoX-SOvXWxyszNNWROsYry1s7UvZ37oBqh-Hl60tcKP2gOZVil1NtNh4RTQ3yErUr527IiyU6YsgAvxWo3fSgmvooYm_bysV0nWszMGi010BoRw5viltSGo8KYEq6gtlVr9qYBrUg8QPij_hISSMGZ7VKp1eFWv7ojyVYOeIdErTfy2-")` }}></div>
              <div className="flex flex-col">
                <h1 className="text-[#111418] text-base font-medium leading-normal">Alex</h1>
                <p className="text-[#60758a] text-sm font-normal leading-normal">Barber</p>
              </div>
            </div>
            
            {/* Navegación */}
            <nav className="flex flex-col gap-2" role="navigation" aria-label="Main navigation">
              {menuItems.map((item) => (
                <SidebarItem
                  key={item.path}
                  label={item.label}
                  path={item.path}
                  icon={item.icon}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}; 