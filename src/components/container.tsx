import React from "react" 
import type{ BarberShop } from "../services/interface"
import { CardBarberShop } from "./CardBarberShop"

interface ContainerProps {
  barberShop: BarberShop[];
}


export const Container: React.FC<ContainerProps> = ({ barberShop }) => {
  console.log(barberShop)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <div className="grid grid-cols-2 gap-4 p-4">
        {barberShop.map((shop) => (
        <CardBarberShop key={shop.name} barberShop={shop} />
      ))}
      </div>
    </div>
  )
} 
