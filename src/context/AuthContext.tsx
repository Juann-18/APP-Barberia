import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getDocument } from '../firebase/firebaseServices';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  userRole: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Función para iniciar sesión
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Verificar el rol del usuario en Firestore
      const userDoc = await getDocument(`usuarios/${uid}`);
      if (userDoc && userDoc.role) {
        setUserRole(userDoc.role); // Asume que el campo en Firestore es "role"
      } else {
        throw new Error("Usuario no encontrado en la base de datos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const signOut = async () => {
    const auth = getAuth();
    await auth.signOut();
    setUser(null);
    setUserRole(null);
  };

  // Suscribirse a cambios de autenticación
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        
        // Obtener el rol del usuario desde Firestore
        const userDoc = await getDocument(`usuarios/${currentUser.uid}`);
        setUser(userDoc);
        if (userDoc && userDoc.role) {
          setUserRole(userDoc.role);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Proveer el contexto a los componentes hijos
  return (
    <AuthContext.Provider value={{ user, loading, userRole, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};