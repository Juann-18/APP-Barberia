import React from 'react'
import type { BarberShop } from '../services/interface'
import barberia from '../assets/barberia.jpg'

interface CardBarberShopProps {
  barberShop: BarberShop
}

export const CardBarberShop: React.FC<CardBarberShopProps> = ({ barberShop }) => {
  return (
    <div className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'>
      {/* Imagen más pequeña */}
      <div className='w-full h-32 overflow-hidden'>
        <img 
          src={barberia} 
          alt="Barbería" 
          className='w-full h-full object-cover'
        />
      </div>
      
      {/* Contenido compacto */}
      <div className='p-3'>
        <h3 className='text-md font-semibold text-gray-800 truncate'>{barberShop.name}</h3>
        
        <div className='mt-2 space-y-1 text-xs text-gray-600'>
          <p className='truncate'>{barberShop.address}</p>
          <p>{barberShop.description}</p>
        </div>
        
        <button className='mt-2 w-full bg-red-50 hover:bg-blue-600 text-white py-1 px-3 rounded text-xs font-medium transition-colors duration-300'>
          Contactar
        </button>
      </div>
    </div>
  )
}