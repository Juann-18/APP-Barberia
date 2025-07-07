export interface Availability {
  id: string;
  fecha?: string;
  id_barberia: string;
  day?: string;
  hours?: string[];
  busy_hours?: string[];
  status?: boolean;
  numWeek: number;
}
export interface GlobalInfo {
  date: {
    currentWeek: number;
    currentYear: number;
    currentDayOfWeek: number;
    currentDate: string;
  };
}
export interface BarberShop {
  id_barberos?: string[];
  name: string;
  availability?: Availability[];
  address: string;
  phone: string;
  description: string;
  status?: boolean;
}