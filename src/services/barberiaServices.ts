import {
  createDocument,
  queryCollection
} from '../firebase/firebaseServices.ts'
import type {BarberShop } from './interface.ts'





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

export const getBarberShop = async (): Promise<BarberShop[]> => {
  try {
    const barberShopsData = await queryCollection('barberias',"status", true);

    // Process all barber shops (assuming you might want to handle multiple)
    const barberShops: BarberShop[] = await Promise.all(
      barberShopsData.map(async (doc: any) => {

        return {
          id_barberShop: doc.docId, // Fallback to doc.id if id_barberia doesn't exist
          id_barbers: doc.id_barbers,
          name: doc.name,
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