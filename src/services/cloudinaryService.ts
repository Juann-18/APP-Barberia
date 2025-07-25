import axios from "axios";

export const uploadImageToCloudinary = async (file: File) => {
  const url = `https://api.cloudinary.com/v1_1/djqczkw5g/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "usuarios");

  const response = await axios.post(url, formData);
  return response.data.secure_url; // URL de la imagen subida
}; 