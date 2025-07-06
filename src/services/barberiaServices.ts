import {
  createDocument,
  readCollection,
  queryCollection
} from '../firebase/firebaseServices.ts'
import type { Availability } from './interface.ts'

export interface BarberShop {
  id_barberos?: string[];
  name: string;
  availability: Availability[];
  address: string;
  phone: string;
  description: string;
  status?: boolean;
}

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

export const createBarberShop = async (barberShop: BarberShop): Promise<string | undefined> => {
  try {
    if (!barberShop || typeof barberShop !== "object") {
      throw new Error("Datos de barbería inválidos");
    }
    const barberShopData = createDocument('barberias', barberShop)

    if (!barberShopData) {
      throw new Error("Error al crear la barbería");
    }

    return barberShopData;

  } catch (error) {
    console.error("Error al crear la barbería:", error);
    throw error;

  }
}

export const getBarberShop = async (currentWeek: number, currentDayOfWeek: number): Promise<BarberShop[]> => {
  try {
    const barberShopsData = await queryCollection('barberias',"status", true);

    // Process all barber shops (assuming you might want to handle multiple)
    const barberShops: BarberShop[] = await Promise.all(
      barberShopsData.map(async (doc: any) => {
        // Assuming availability is stored in a subcollection
        const availabilityData = await readCollection(`barberias/${doc.id}/disponibilidad`);

        const validAvailability = availabilityData
          .filter((avail: any) => {
            const isSameWeek = avail.semana === currentWeek;
            const isFutureWeek = avail.semana > currentWeek;
            const isValidDay =
              isFutureWeek ||
              (isSameWeek && avail.dia_semana >= currentDayOfWeek);

            return avail.horas?.length > 0 && avail.activo && isValidDay;
          })
          .map((avail: any) => ({
            id: avail.id ?? '', // Provide a fallback if id is missing
            id_barberia: avail.id_barberia ?? doc.docId ?? '', // Fallback to doc.docId if not present
            day: getDayLabel(avail.dia_semana),
            hours: avail.horas,
            status: avail.activo,
            numWeek: avail.semana,
          }));

        return {
          id_barberia: doc.docId, // Fallback to doc.id if id_barberia doesn't exist
          id_barberos: doc.id_barberos,
          name: doc.name,
          availability: validAvailability,
          address: doc.address,
          phone: doc.phone,
          description: doc.description,
          status: doc.status,
        } as BarberShop;
      })
    );

    // Return the first barber shop or null if none found
    return barberShops.filter(Boolean) as BarberShop[];

  } catch (error) {
    console.error("Error getting barber shop:", error);
    throw error;
  }
}