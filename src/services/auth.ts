import { db, auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import type { User } from "../services/interface";


export const registerUser = async (user: User) => {
  try {
    // Crear el usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password || "");
    const uid = userCredential.user.uid;

    // Guardar los datos del usuario en Firestore
    await setDoc(doc(db, "users", uid), {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      status: true,
      faults: 0,
      photoUrl: user.photoUrl || "",
      statusUser: user.status || true
    });

    return { success: true, uid };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error };
  }
} 