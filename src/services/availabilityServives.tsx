import {
  createDocument,
  readCollection // <-- Importa readCollection
} from '../firebase/firebaseServices.ts'  
import type { Availability } from './interface.ts'

const getDayLabel = (dayNumber: number): string => {
  const dayMap = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return dayMap[dayNumber] || "sunday"; // Por defecto retorna 'sunday' si el número no es válido
};

export const createAvailability = async (availability: Availability, barberId: string): Promise<string | undefined> => {
  try {
    if(!availability && typeof availability === "object" && barberId) {
      throw new Error("Datos de disponibilidad inválidos");
    }

    const availabilityData = createDocument(`barberos/${barberId}/disponibilidad`, availability);

    if (!availabilityData) {
      throw new Error("Error al crear la disponibilidad");
    }
    return availabilityData;
  } catch (error) {
    console.error("Error al crear la disponibilidad:", error);
    throw error;
    
  }
}

export const getAvailabilityByBarberId = async (barberId: string): Promise<Availability[]> => {
  try {
    if (!barberId) {
      throw new Error("Id de barbero inválido");
    }

    const availabilityData = await readCollection(`barberos/${barberId}/disponibilidad`);

    if (!availabilityData || availabilityData.length === 0) {
      throw new Error("No se encontraron disponibilidades para el barbero");
    }

    return availabilityData.map((avail) => ({
      id: avail.id ?? "", // Provide default if missing
      id_barber: avail.id_barberia ?? "", // Provide default if missing
      numWeek: avail.dia_semana ?? 0, // Assuming dia_semana is numWeek
      day: avail.dia_semana ? getDayLabel(avail.dia_semana) : undefined,
      hours: avail.horas || [],
      busy_hours: avail.horas_ocupadas || [],
      status: avail.estado ?? true, // Assuming estado is a boolean
    }));
  } catch (error) {
    console.error("Error al obtener la disponibilidad del barbero:", error);
    throw error;
  }
}