import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Barber } from '../services/interface';
import { FormInput } from '../components/FormInput';
import { createBarber } from '../services/barberoServices';
import { uploadImageToCloudinary } from '../services/cloudinaryService';

export const FormBarber: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [Barber, setBarber] = useState<Barber>({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    photoUrl: '',
    status: true,
    role: 'barber'
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
    if (!Barber.email || !Barber.password || !Barber.name || !Barber.lastName || !Barber.phone ) {
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
        ...Barber,
        photoUrl: imageUrl
      };

      // Register user
      const response = await createBarber(userData);
      console.log("Registration successful:", response);

      setBarber({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        photoUrl: '',
        status: true,
        role: 'baSrber'
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
          value={Barber.name}
          setValue={(value: string) => setBarber({ ...Barber, name: value })}
          placeholder="First name"
        />
        <FormInput
          id='lastName'
          type='text'
          value={Barber.lastName}
          setValue={(value: string) => setBarber({ ...Barber, lastName: value })}
          placeholder="Last name"
        />
        <FormInput
          id='email'
          type='email'
          value={Barber.email}
          setValue={(value: string) => setBarber({ ...Barber, email: value })}
          placeholder="Email"
        />
        <FormInput
          id='password'
          type='password'
          value={Barber.password}
          setValue={(value: string) => setBarber({ ...Barber, password: value })}
          placeholder="Password"
        />
        <FormInput
          id='phone'
          type='text'
          value={Barber.phone}
          setValue={(value: string) => setBarber({ ...Barber, phone: value })}
          placeholder="Phone number"
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