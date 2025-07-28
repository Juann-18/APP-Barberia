import React from 'react';
import { Sidebar } from '../components/Sidebar';

export const Schedule: React.FC = () => {
  const scheduleData = [
    { day: 'Lunes', hours: '9:00 AM - 6:00 PM', status: 'Abierto' },
    { day: 'Martes', hours: '9:00 AM - 6:00 PM', status: 'Abierto' },
    { day: 'Miércoles', hours: '9:00 AM - 6:00 PM', status: 'Abierto' },
    { day: 'Jueves', hours: '9:00 AM - 6:00 PM', status: 'Abierto' },
    { day: 'Viernes', hours: '9:00 AM - 7:00 PM', status: 'Abierto' },
    { day: 'Sábado', hours: '10:00 AM - 4:00 PM', status: 'Abierto' },
    { day: 'Domingo', hours: 'Cerrado', status: 'Cerrado' },
  ];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5 px-2 md:px-6">
          <Sidebar />
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 ml-0 md:ml-4">
            <div className="flex flex-wrap justify-between gap-3 p-2 md:p-4">
              <p className="text-[#111418] tracking-light text-[24px] md:text-[32px] font-bold leading-tight min-w-0">Horarios</p>
            </div>
            <div className="p-2 md:p-4">
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-[#111418] text-[18px] md:text-[22px] font-bold leading-tight mb-4">Horario de Trabajo</h2>
                <div className="space-y-3">
                  {scheduleData.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border-b border-gray-100 last:border-b-0 gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[#111418] font-medium text-sm md:text-base">{item.day}</span>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <p className="text-[#111418] text-sm md:text-base">{item.hours}</p>
                        <span className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${
                          item.status === 'Abierto' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 