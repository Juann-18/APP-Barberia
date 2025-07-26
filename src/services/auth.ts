import { singUp, createDocument } from "../firebase/firebaseServices";
import type { User } from "../services/interface";



export const registerUser = async (user: User) => {
  try {
    const uid = await singUp(user.email, user.password || "");  

    await createDocument("users",user, uid)

    return { success: true, uid };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error };
  }
} 