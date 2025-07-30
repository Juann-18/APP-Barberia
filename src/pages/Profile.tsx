import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';

export const Profile: React.FC = () => {
  const {user} = useAuth();
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5 px-2 md:px-6">
          <Sidebar 
          name={user.name}
          icon={user.photoUrl}
          />
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 ml-0 md:ml-4">
            <div className="flex flex-wrap justify-between gap-3 p-2 md:p-4">
              <p className="text-[#111418] tracking-light text-[24px] md:text-[32px] font-bold leading-tight min-w-0">Perfil</p>
            </div>
            <div className="p-2 md:p-4">
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-[#111418] text-[18px] md:text-[22px] font-bold leading-tight mb-4">Información Personal</h2>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0" >
                      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-full" style={{ backgroundImage: `url(${user.photoUrl})` }}></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-semibold text-[#111418]">{user.name}</h3>
                      <p className="text-[#60758a] text-sm">Barbero Profesional</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#60758a] mb-1">Email</label>
                      <p className="text-[#111418] text-sm md:text-base">{user.email} </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#60758a] mb-1">Teléfono</label>
                      <p className="text-[#111418] text-sm md:text-base">{user.phone} </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#60758a] mb-1">Especialidad</label>
                      <p className="text-[#111418] text-sm md:text-base">Cortes de cabello, barba</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#60758a] mb-1">Experiencia</label>
                      <p className="text-[#111418] text-sm md:text-base">5 años</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 