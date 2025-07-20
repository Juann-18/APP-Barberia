import { Header } from "../components/Header"
import { Container } from "../components/Container";
import { useEffect, useState } from "react"
import { getBarberShop } from "../services/barberiaServices";
import type{ BarberShop } from "../services/interface";


export const Index = () => {

  const [barberShops, setBarberShops] = useState<BarberShop[]>([]);




  useEffect(()=> {
    const fetchBarberShops = async () => {
      try {
        const barberShopsData = await getBarberShop();
        setBarberShops(barberShopsData)
      } catch (error) {
        console.error("Error fetching barber shops:", error);
      }
    };
    fetchBarberShops();
  }, [])

  

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
