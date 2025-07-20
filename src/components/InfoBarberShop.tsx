
import foto from '../assets/barberia.jpg'
interface InfoBarberShopProps {
  name: string;
  description: string;
}

export const InfoBarberShop = ({ name, description }: InfoBarberShopProps) => {
  return (
    <div className=" flex flex-col bg-theme-light">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-bold text-2xl" > {name}</h1>
        <p className="py-2">{description}</p>
        <div className=' flex justify-center items-center w-full'>
          <img src={foto} alt="foto"  className=''/>
        </div>
      </div>
    </div>  
  )
}
