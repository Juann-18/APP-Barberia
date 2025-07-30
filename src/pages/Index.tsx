import { Header } from "../components/Header"
import { Container } from "../components/Container";
import { useEffect, useState } from "react"
import { getBarberShop } from "../services/barberiaServices";
import type{ BarberShop } from "../services/interface";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
        {!user && (
          <div className="bg-white border-b border-gray-200 py-2">
            <div className="container mx-auto px-2 flex justify-end gap-4">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-[#111418] hover:text-[#2a2f38] transition-colors"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-2 bg-[#111418] text-white rounded-lg hover:bg-[#2a2f38] transition-colors"
              >
                Registrarse
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="container mx-auto px-2 py-4">
        <Container barberShop={barberShops}/>
      </div>
    </div>
  )
}
