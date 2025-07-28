import React from 'react';
export const OverviewCards: React.FC = () => {
  const data = [
    { title: "Total Appointments", value: "120" },
    { title: "Completed Appointments", value: "100" },
    { title: "Average Rating", value: "4.8" },
  ];
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {data.map((item, index) => (
        <div key={index} className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6]">
          <p className="text-[#111418] text-base font-medium leading-normal">{item.title}</p>
          <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">{item.value}</p>
        </div>
      ))}
    </div>
  );
};
