import React from 'react';

export const AppointmentsTable: React.FC = () => {
  const appointments = [
    { customer: "Ethan Carter", service: "Haircut", date: "2024-07-20", time: "10:00 AM", status: "Scheduled" },
    { customer: "Liam Harper", service: "Beard Trim", date: "2024-07-20", time: "11:00 AM", status: "Scheduled" },
    { customer: "Noah Bennett", service: "Haircut & Style", date: "2024-07-21", time: "09:00 AM", status: "Scheduled" },
  ];

  return (
    <div className="px-4 py-3">
      <div className="flex overflow-hidden rounded-xl border border-[#dbe0e6] bg-white">
        <table className="flex-1">
          <thead>
            <tr className="bg-white">
              <th className="px-4 py-3 text-left text-[#111418] text-sm font-medium leading-normal">Customer</th>
              <th className="px-4 py-3 text-left text-[#111418] text-sm font-medium leading-normal">Service</th>
              <th className="px-4 py-3 text-left text-[#111418] text-sm font-medium leading-normal">Date</th>
              <th className="px-4 py-3 text-left text-[#111418] text-sm font-medium leading-normal">Time</th>
              <th className="px-4 py-3 text-left text-[#111418] text-sm font-medium leading-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} className="border-t border-t-[#dbe0e6]">
                <td className="h-[72px] px-4 py-2 text-[#111418] text-sm font-normal leading-normal">{appointment.customer}</td>
                <td className="h-[72px] px-4 py-2 text-[#60758a] text-sm font-normal leading-normal">{appointment.service}</td>
                <td className="h-[72px] px-4 py-2 text-[#60758a] text-sm font-normal leading-normal">{appointment.date}</td>
                <td className="h-[72px] px-4 py-2 text-[#60758a] text-sm font-normal leading-normal">{appointment.time}</td>
                <td className="h-[72px] px-4 py-2">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-medium leading-normal w-full">
                    <span className="truncate">{appointment.status}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

