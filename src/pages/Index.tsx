import { Header } from "../components/Header"
import { Container } from "../components/Container";
import { useEffect, useState } from "react"
import { getBarberShop } from "../services/barberiaServices";
import type{ GlobalInfo, BarberShop } from "../services/interface";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

export const Index = () => {
  const now = dayjs();
  const [barberShops, setBarberShops] = useState<BarberShop[]>([]);

  const value: GlobalInfo = {
    date: {
      currentWeek: now.isoWeek(),
      currentYear: now.isoWeekYear(),
      currentDayOfWeek: now.isoWeekday(),
      currentDate: now.format("DD-MM-YYYY"),
    },
  };

  useEffect(()=> {
    const fetchBarberShops = async () => {
      try {
        const barberShopsData = await getBarberShop(value.date.currentWeek, value.date.currentDayOfWeek);
        setBarberShops(barberShopsData)
        console.log(barberShopsData); // Aquí sí verás los datos correctos
        

      } catch (error) {
        console.error("Error fetching barber shops:", error);
      }
    };

    fetchBarberShops();
  },[])

  

  return (
    <div className="min-h-screen flex flex-col bg-theme-light">
      <div>
        <Header />
      </div>
      <div className="container mx-auto px-2 py-4">
        <Container barberShop={barberShops}/>
      </div>
    </div>
  )
}
