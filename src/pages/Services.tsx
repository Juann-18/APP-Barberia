import React from 'react';
import { Sidebar } from '../components/Sidebar';

export const Services: React.FC = () => {
  const services = [
    {
      name: 'Corte de Cabello',
      description: 'Corte de cabello profesional con lavado incluido',
      price: '$25',
      duration: '30 min'
    },
    {
      name: 'Corte de Barba',
      description: 'Arreglo y modelado de barba',
      price: '$15',
      duration: '20 min'
    },
    {
      name: 'Corte + Barba',
      description: 'Corte de cabello y barba combinados',
      price: '$35',
      duration: '45 min'
    },
    {
      name: 'Afeitado Clásico',
      description: 'Afeitado tradicional con navaja',
      price: '$30',
      duration: '25 min'
    },
    {
      name: 'Tratamiento Capilar',
      description: 'Tratamiento completo para el cabello',
      price: '$40',
      duration: '60 min'
    }
  ];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5 px-2 md:px-6">
          <Sidebar />
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 ml-0 md:ml-4">
            <div className="flex flex-wrap justify-between gap-3 p-2 md:p-4">
              <p className="text-[#111418] tracking-light text-[24px] md:text-[32px] font-bold leading-tight min-w-0">Servicios</p>
            </div>
            <div className="p-2 md:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {services.map((service, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                      <h3 className="text-[#111418] text-base md:text-lg font-semibold flex-1">{service.name}</h3>
                      <span className="text-[#111418] font-bold text-lg md:text-xl">{service.price}</span>
                    </div>
                    <p className="text-[#60758a] text-xs md:text-sm mb-3">{service.description}</p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <span className="text-[#60758a] text-xs md:text-sm">⏱️ {service.duration}</span>
                      <button className="bg-[#111418] text-white px-3 py-2 rounded-lg text-xs md:text-sm hover:bg-[#2a2f36] transition-colors w-full sm:w-auto">
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 