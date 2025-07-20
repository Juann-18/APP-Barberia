import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import { Header } from "../components/Header"
import { InfoBarberShop } from "../components/InfoBarberShop";
import { Cardbarber } from "../components/Cardbarber";


export const AppointmenrPage = () => {
  const location = useLocation();
  const barberShop = location.state?.barberShop;

  console.log(barberShop)

  return (
    <div className="min-h-screen flex flex-col bg-theme-light">
      <div className="container mx-auto px-4 py-4">
        <Header/>
      </div>
      <div  className="flex flex-col items-center justify-center">
        <InfoBarberShop
          name={barberShop.name}
          description={barberShop.description}
        />
        <p className="font-bold ">Elige tu barbero</p>
      </div>

      <div className="flex flex-col items-center justify-center mt-4">
        {barberShop.id_barbers?.map((barberId: string) => (
          <Cardbarber key={barberId} id={barberId} />
        ))}
      </div>

      
      
    </div>
  )
}
