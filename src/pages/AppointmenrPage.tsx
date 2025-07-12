import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';

export const AppointmenrPage = () => {
  const location = useLocation();
  const barberShop = location.state?.barberShop;

  console.log(barberShop)

  return (
    <div>AppointmenrPage</div>
  )
}
