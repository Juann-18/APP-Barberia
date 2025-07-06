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