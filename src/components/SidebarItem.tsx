import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarItemProps {
  label: string;
  path: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ label, path, icon, onClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;

  const handleClick = () => {
    navigate(path);
    onClick?.(); // Llamar onClick si existe
  };

  return (
    <div 
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#e8eaed] ${
        isActive 
          ? "bg-[#e8eaed] text-[#111418] font-medium" 
          : "text-[#60758a] hover:text-[#111418]"
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="text-current">
        {icon || (
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M128 56a72 72 0 1 0 72 72 72.08 72.08 0 0 0-72-72Zm0 128a56 56 0 1 1 56-56 56.06 56.06 0 0 1-56 56Zm48-56a8 8 0 0 1-8 8h-16v16a8 8 0 0 1-16 0v-16h-16a8 8 0 0 1 0-16h16v-16a8 8 0 0 1 16 0v16h16a8 8 0 0 1 8 8Z"/>
          </svg>
        )}
      </div>
      <p className="text-sm font-medium leading-normal">{label}</p>
    </div>
  );
};