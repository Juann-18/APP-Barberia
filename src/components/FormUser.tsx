import React, { useState } from 'react';
import type { User } from '../services/interface';
import { FormInput } from '../components/FormInput';
import { registerUser } from '../services/auth';
import { uploadImageToCloudinary } from '../services/cloudinaryService';

export const FormUser: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [user, setUser] = useState<User>({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    photoUrl: '',
    faults: 0,
    status: true,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.email || !user.password || !user.name || !user.lastName || !user.phone ) {
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
        ...user,
        photoUrl: imageUrl
      };

      // Register user
      const response = await registerUser(userData);
      console.log("Registration successful:", response);

      setUser({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        photoUrl: '',
        faults: 0,
        status: true,
      });
      setPreviewUrl(null);
      setSelectedFile(null);

      
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
          value={user.name}
          setValue={(value: string) => setUser({ ...user, name: value })}
          placeholder="First name"
        />
        <FormInput
          id='lastName'
          type='text'
          value={user.lastName}
          setValue={(value: string) => setUser({ ...user, lastName: value })}
          placeholder="Last name"
        />
        <FormInput
          id='email'
          type='email'
          value={user.email}
          setValue={(value: string) => setUser({ ...user, email: value })}
          placeholder="Email"
        />
        <FormInput
          id='password'
          type='password'
          value={user.password}
          setValue={(value: string) => setUser({ ...user, password: value })}
          placeholder="Password"
        />
        <FormInput
          id='phone'
          type='text'
          value={user.phone}
          setValue={(value: string) => setUser({ ...user, phone: value })}
          placeholder="Phone number"
        />
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && (
            <div>
              <p>Vista previa:</p>
              <img src={previewUrl} alt="Preview" style={{ width: 200 }} />
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