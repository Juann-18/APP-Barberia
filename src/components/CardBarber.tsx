import { getBarberById } from "../services/barberoServices";
import { useEffect, useState } from "react";
import type { Barber } from "../services/interface";

interface idBarber {
  id: string;
}
export const Cardbarber = ({id}: idBarber) => {

  const [barber, setBarber] = useState<Barber | null>(null);

  useEffect(() => {
    const fetchBarber = async () => {
      const barber = await getBarberById(id);
      setBarber(barber)
      console.log(barber);
    };
    fetchBarber();
  }, [id]);
  return (
    <div>{barber?.name}</div>
  )
}
