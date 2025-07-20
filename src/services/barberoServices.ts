import {
  createDocument,
  getDocument,
  readCollection // <-- Importa readCollection
} from '../firebase/firebaseServices.ts' 
import type { Barber } from './interface.ts'

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

export const createBarber = async (barber: Barber): Promise<string | undefined> => {
  try {
    if (!barber || typeof barber !== "object") {
      throw new Error("Datos de barbero inválidos");
    }
    const barberData = createDocument('barberos', barber)
    if (!barberData) {
      throw new Error("Error al crear el barbero");
    }
    return barberData;
  } catch (error) {
    console.error("Error al crear el barbero:", error);
    throw error;
  }
}

export const getBarberById = async (id: string, ): Promise<Barber | null> => {
  try {
    if (!id) {
      throw new Error("Id de barbero invalido")
    }

    const barberData = await getDocument(`barberos/${id}`); 

    if (!barberData) {
      throw new Error("Barbero no encontrado");
    }

    // Obtener la disponibilidad del barbero
    const availabilityData = await readCollection(`barberos/${id}/disponibilidad`);

    const availability = availabilityData.map((avail) => ({
      id: avail.id ?? "", // Provide default if missing
      id_barber: avail.id_barberia ?? "", // Provide default if missing
      numWeek: avail.day ?? 0, // Assuming dia_semana is numWeek
      day: getDayLabel(avail.day),
      hours: avail.hours || [],
    }));


    // Retornar el barbero con la disponibilidad agregada
    return {
      id: barberData.docId, // Assuming docId is the unique identifier
      name: barberData.name,
      availability: availability,
      phone: barberData.phone,
      status: barberData.status,
      email: barberData.email ?? "", // Provide a default value if missing
    } as Barber;
      
  } catch (error) {
    console.error("Error al obtener el barbero:", error);
    throw error;
  }
}