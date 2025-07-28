import React from 'react';
import { Sidebar } from '../components/Sidebar';

export const Appointments: React.FC = () => {
  const appointments = [
    {
      id: 1,
      customer: "Juan Pérez",
      service: "Corte de Cabello",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "Confirmado",
      phone: "+1 234 567 890"
    },
    {
      id: 2,
      customer: "Carlos Rodríguez",
      service: "Corte + Barba",
      date: "2024-01-15",
      time: "11:30 AM",
      status: "Pendiente",
      phone: "+1 234 567 891"
    },
    {
      id: 3,
      customer: "Miguel García",
      service: "Afeitado Clásico",
      date: "2024-01-15",
      time: "2:00 PM",
      status: "Confirmado",
      phone: "+1 234 567 892"
    },
    {
      id: 4,
      customer: "Luis Martínez",
      service: "Corte de Barba",
      date: "2024-01-16",
      time: "9:00 AM",
      status: "Pendiente",
      phone: "+1 234 567 893"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5 px-2 md:px-6">
          <Sidebar />
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 ml-0 md:ml-4">
            <div className="flex flex-wrap justify-between gap-3 p-2 md:p-4">
              <p className="text-[#111418] tracking-light text-[24px] md:text-[32px] font-bold leading-tight min-w-0">Citas</p>
            </div>
            <div className="p-2 md:p-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-4 md:px-6 py-4 border-b border-gray-200">
                  <h2 className="text-[#111418] text-[18px] md:text-[22px] font-bold leading-tight">Próximas Citas</h2>
                </div>
                <div className="overflow-x-auto">
                  {/* Vista de escritorio */}
                  <table className="w-full hidden md:table">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#60758a] uppercase tracking-wider">
                          Cliente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#60758a] uppercase tracking-wider">
                          Servicio
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#60758a] uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#60758a] uppercase tracking-wider">
                          Hora
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#60758a] uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[#60758a] uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {appointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-[#111418]">{appointment.customer}</div>
                              <div className="text-sm text-[#60758a]">{appointment.phone}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#111418]">
                            {appointment.service}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#111418]">
                            {appointment.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#111418]">
                            {appointment.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-[#111418] hover:text-[#2a2f36] mr-3">
                              Confirmar
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Cancelar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Vista móvil */}
                  <div className="md:hidden">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-[#111418]">{appointment.customer}</h3>
                            <p className="text-sm text-[#60758a]">{appointment.phone}</p>
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Servicio:</span> {appointment.service}</p>
                          <p><span className="font-medium">Fecha:</span> {appointment.date}</p>
                          <p><span className="font-medium">Hora:</span> {appointment.time}</p>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="text-[#111418] hover:text-[#2a2f36] text-sm">
                            Confirmar
                          </button>
                          <button className="text-red-600 hover:text-red-900 text-sm">
                            Cancelar
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
      </div>
    </div>
  );
}; 