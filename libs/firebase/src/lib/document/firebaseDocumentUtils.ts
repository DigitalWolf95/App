import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore';
import { firebaseDB } from '../firebase';
import { Image } from '@digital-wolf/types';

export async function storeDocument<T = object>(folder: string, docName: string, payload: Partial<T>): Promise<T> {
  const docRef = doc(firebaseDB, folder, docName);
  await setDoc(docRef, payload, { merge: true });
  const docSnap = await getDoc(docRef);
  return docSnap.data() as T;
}

export async function storeImageDocument(
  folder: string,
  imageName: string,
  payload: Image | null,
  { returnData = true }: { returnData?: boolean } = {}
): Promise<Image | undefined> {
  const docRef = doc(firebaseDB, folder, 'images');
  await setDoc(docRef, { [imageName]: payload }, { merge: true });
  if (returnData) {
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Image;
  }
}

export async function deleteImageDocument(folder: string, imageName: string): Promise<void> {
  const docRef = doc(firebaseDB, folder, 'images');
  await updateDoc(docRef, { [imageName]: deleteField() });
}

export async function updateImageDocument({ folder, payload }: { folder: string; payload: Image }): Promise<Image> {
  if (!payload.id) throw new Error('Image id is required');
  const docRef = doc(firebaseDB, folder, 'images');
  await updateDoc(docRef, { [payload.id]: payload });
  return payload;
}

export async function replaceDocument<T = object>(folder: string, docName: string, payload: Partial<T>): Promise<T> {
  const docRef = doc(firebaseDB, folder, docName);
  await setDoc(docRef, payload, { merge: true });
  const docSnap = await getDoc(docRef);
  return docSnap.data() as T;
}

export async function getDocument<T = object>(folder: string, docName: string): Promise<T> {
  const docRef = doc(firebaseDB, folder, docName);
  const docSnap = await getDoc(docRef);
  return (docSnap.data() || null) as T;
}

// TODO: Implement this function
// export async function getAllDocuments<T = object[]>(folder: FolderKeys): Promise<T> {
//   const docRef = await collection(firebaseDB, folder).firestore.toJSON();
//   return docRef as T;
// }
