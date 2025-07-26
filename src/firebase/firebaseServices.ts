import { collection, getDoc, getDocs, doc, setDoc, addDoc, updateDoc, deleteDoc, onSnapshot, where, query } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./config";

//Interfaces de los documentos cuando se leen
export interface DocumentFirestore {
  docId: string;
  [key: string]: any; // Permite agregar o recibir propiedades dinámicas
}

//Interfaces de los documentos cuando se editan o crean
export interface FirestoreData {
  [key: string]: any;
}

// Método para leer una coleecion de Firestore
export const readCollection = async (ruta: string): Promise<DocumentFirestore[]> => {
  try {
    if (!ruta || typeof ruta !== "string") throw new Error("Ruta inválida");

    // Crear referencia usando la ruta completa
    const subcoleccionRef = collection(db, ruta);
    console.log("read collection")
    // Obtener documentos de la subcolección
    const querySnapshot = await getDocs(subcoleccionRef);

    return querySnapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    console.error("Error al leer la colección: ", e);
    throw e;
  }
};

// Metodo para leer un documento especifico de Firestore
export const getDocument = async (ruta: string): Promise<DocumentFirestore | null> => {
  try {
    if (!ruta || typeof ruta !== "string") throw new Error("Ruta inválida");

    // Crear referencia al documento usando la ruta completa
    const docRef = doc(db, ruta);

    // Obtener el documento
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { docId: docSnap.id, ...docSnap.data() } as DocumentFirestore;
    } else {
      throw new Error("El documento no existe");
    }
  } catch (e) {
    console.error("Error al obtener el documento:", e);
    throw e;
  }
};

// Metodo para crear un documento en Firestore (con id especifico o automatico)
export const createDocument = async (
  ruta: string, 
  dataDocument: FirestoreData, 
  idEspecifico?: string
): Promise<string | undefined> => {
  try {
    if (!ruta || typeof ruta !== "string") throw new Error("Ruta inválida");

    // Crear referencia a la colección o subcolección usando la ruta directamente
    const collectionRef = collection(db, ruta);
    
    let docRef;
    // Si se entrega un id especifico, se crea el documento con ese id, si no se crea automaticamente
    if (idEspecifico) {
      docRef = doc(collectionRef, idEspecifico);
      await setDoc(docRef, dataDocument);
    } else {
      docRef = await addDoc(collectionRef, dataDocument);
    }

    console.log("Documento creado con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error al crear el documento: ", e);
    throw e;
  }
};

// Metodo para actualizar un documento en Firestore
export const updateDocument = async (
  ruta: string, 
  dataDocument: FirestoreData
): Promise<void> => {
  try {
    if (!ruta || typeof ruta !== "string") throw new Error("Ruta inválida");

    // Crear referencia al documento usando la ruta completa
    const docRef = doc(db, ruta);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.log(`El documento en la ruta "${ruta}" no existe. No se realizará ninguna acción.`);
      return; // Salir si el documento no existe
    }

    // Actualizar los campos en el documento
    await updateDoc(docRef, dataDocument);

    console.log(`Documento actualizado en la ruta "${ruta}"`);
  } catch (e) {
    console.error("Error al actualizar el documento:", e);
    throw e;
  }
};

// Metodo para eliminar un documento 
export const deleteDocument = async (ruta: string): Promise<void> => {
  try {
    if (!ruta || typeof ruta !== "string") throw new Error("Ruta inválida");

    // Crear referencia al documento usando la ruta completa
    const docRef = doc(db, ruta);
    
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.log(`El documento en la ruta "${ruta}" no existe. No se realizará ninguna acción.`);
      return; // Salir si el documento no existe
    }

    // Eliminar el documento
    await deleteDoc(docRef);

    console.log(`Documento eliminado en la ruta: ${ruta}`);
  } catch (e) {
    console.error("Error al eliminar el documento:", e);
    throw e;
  }
};

// Metodo para traer documentos o colecciones de Firestore en tiempo real
export const onSnapshotCollection = (
  ruta: string, 
  callback: (documentos: DocumentFirestore[]) => void
): (() => void) => {
  try {
    if (!ruta || typeof ruta !== "string") throw new Error("Ruta inválida");

    // Referencia a la colección o subcolección usando la ruta completa
    const collectionRef = collection(db, ruta);

    // Escucha cambios en tiempo real
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documentos = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      callback(documentos);
    });

    return unsubscribe; // Devuelve la función para cancelar la suscripción cuando sea necesario
  } catch (e) {
    console.error("Error al escuchar la colección:", e);
    throw e;
  }
};

export const queryCollection = async (
  ruta: string,
  campo: string,
  valor: any
): Promise<DocumentFirestore[]> => {
  try {
    if (!ruta || typeof ruta !== "string") throw new Error("Ruta inválida");

    const collectionRef = collection(db, ruta);
    const q = query(collectionRef, where(campo, "==" , valor));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    console.error("Error al leer la colección con query: ", e);
    throw e;
  }
};

export const singUp = async (email: string, password: string): Promise<any> => { 
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    return uid;
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
}