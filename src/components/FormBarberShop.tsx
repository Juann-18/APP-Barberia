import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BarberShop } from '../services/interface';
import { FormInput } from '../components/FormInput';
import { createBarberShop } from '../services/barberiaServices';
import { uploadImageToCloudinary } from '../services/cloudinaryService';

export const FormBarberShop: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [BarberShop, setBarber] = useState<BarberShop>({
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    photoUrl: '',
    description: '',
    status: true,
    role: 'BarberShop'
  });
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!BarberShop.email || !BarberShop.password || !BarberShop.name || !BarberShop.description || !BarberShop.phone || !BarberShop.address) {
      alert("Please fill in all fields.");
      return;
    }
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    try {
      let imageUrl = '';
      if (selectedFile) {
        imageUrl = await uploadImageToCloudinary(selectedFile);
      }

      // Prepare user data with photo URL
      const userData = {
        ...BarberShop,
        photoUrl: imageUrl
      };

      // Register user
      const response = await createBarberShop(userData);
      console.log("Registration successful:", response);

      setBarber({
        name: '',
        email: '',
        address: '',
        phone: '',
        password: '',
        photoUrl: '',
        description: '',
        status: true,
        role: 'BarberShop'
      });
      setPreviewUrl(null);
      setSelectedFile(null);
      navigate('/login');

      
    } catch (error) {
      console.error("Error uploading image or registering user:", error);
    }
  };

  // Limpiar el objeto URL cuando el componente se desmonte
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormInput
          id='name'
          type='text'
          value={BarberShop.name}
          setValue={(value: string) => setBarber({ ...BarberShop, name: value })}
          placeholder="First name"
        />
        <FormInput
          id='lastName'
          type='text'
          value={BarberShop.description}
          setValue={(value: string) => setBarber({ ...BarberShop, description: value })}
          placeholder="Description"
        />
        <FormInput
          id='lastName'
          type='text'
          value={BarberShop.address}
          setValue={(value: string) => setBarber({ ...BarberShop, address: value })}
          placeholder="Address"
        />
        <FormInput
          id='phone'
          type='text'
          value={BarberShop.phone}
          setValue={(value: string) => setBarber({ ...BarberShop, phone: value })}
          placeholder="Phone number"
        />
        <FormInput
          id='email'
          type='email'
          value={BarberShop.email}
          setValue={(value: string) => setBarber({ ...BarberShop, email: value })}
          placeholder="Email"
        />
        <FormInput
          id='password'
          type='password'
          value={BarberShop.password}
          setValue={(value: string) => setBarber({ ...BarberShop, password: value })}
          placeholder="Password"
        />
        
        <div className='flex justify-center items-center flex-col px-4 py-3'>

          {!previewUrl && (<input type="file" accept="image/*" onChange={handleFileChange} />)}
          
          {previewUrl && (
            <div className='relative inline-block'>
              <p>Vista previa:</p>
              <img src={previewUrl} alt="Preview" style={{ width: 200 }}  className='rounded-full w-32 h-32 object-cover '/>
            </div>
          )}
        </div>

        <div className="flex px-4 py-3">
          <button
            type="submit"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Sign up</span>
          </button>
        </div>
      </form>
    </>
  );
}; 