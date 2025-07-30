import React from 'react'

interface Props {
  icon: string,
  name: string
  user: string
}
const PerfilUser: React.FC<Props> = ({icon, name, user}) => {
  return (
    <>
      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url(${icon})` }}></div>
      <div className="flex flex-col">
        <h1 className="text-[#111418] text-base font-medium leading-normal">{name}</h1>
        <p className="text-[#60758a] text-sm font-normal leading-normal">{user}</p>
      </div>
    </>
  )
}

export default PerfilUser