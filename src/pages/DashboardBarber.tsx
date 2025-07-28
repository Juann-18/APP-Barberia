import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { OverviewCards } from '../components/OverviewCards';
import { AppointmentsTable } from '../components/AppointmentsTable';

export const DashboardBarber: React.FC = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5 px-2 md:px-6">
          <Sidebar />
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 ml-0 md:ml-4">
            <div className="flex flex-wrap justify-between gap-3 p-2 md:p-4">
              <p className="text-[#111418] tracking-light text-[24px] md:text-[32px] font-bold leading-tight min-w-0">Dashboard</p>
            </div>
            <div className="px-2 md:px-4">
              <OverviewCards />
            </div>
            <h2 className="text-[#111418] text-[18px] md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 md:px-4 pb-3 pt-5">Upcoming Appointments</h2>
            <div className="px-2 md:px-4">
              <AppointmentsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


