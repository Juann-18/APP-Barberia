export interface Availability {
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
  id_barberia?: string;
  id_barbers?: string[];
  name: string;
  email: string;
  password?: string;
  address: string;
  phone: string;
  photoUrl?: string;
  description: string;
  status?: boolean;
  role: string;
}

export interface Barber {
  id?: string;
  id_barberShop?: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  photoUrl?: string;
  status?: boolean;
  role: string;
  availability?: Availability[];
}

export interface User { 
  id?: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  photoUrl?: string;
  faults: number;
  status?: boolean;
  role: string;
}

export interface Cita { 
  id?: string;
  clientId: string;
  barberId: string;
  barberShopId: string;
  fecha_inicio: string
  service: string;
  status: string;
  valor: string;
}