import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { firebaseDB } from '../firebase';
import { uuidV4 } from '@digital-wolf/fns';
import { GenericPayload } from '@digital-wolf/types';

export async function storeEntity<T extends GenericPayload>({ entity, payload, id }: { entity: string; payload: Partial<T>; id?: string }) {
  const uuid = id ?? uuidV4();
  const docRef = doc(firebaseDB, entity, uuid);
  await setDoc(docRef, { id, ...payload });
  return (await getDoc(docRef)).data() as T;
}

export async function updateEntityById<T extends GenericPayload>({ entity, id, payload }: { entity: string; id: string; payload: T }) {
  const docRef = doc(firebaseDB, entity, id);
  await setDoc(docRef, { ...payload, id }, { merge: true });
  return (await getDoc(docRef)).data() as T;
}

export async function getEntities<T = unknown>(entity: string): Promise<T[]> {
  let results: T[] = [];
  const query = await getDocs(collection(firebaseDB, entity));
  query.forEach((entity) => (results = [...results, entity.data() as T]));
  return results;
}

export async function getEntityById<T = unknown>(entity: string, id: string): Promise<T> {
  const docRef = doc(firebaseDB, entity, id);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as T;
}

export async function deleteEntity(entity: string, id: string): Promise<void> {
  const docRef = doc(firebaseDB, entity, id);
  await deleteDoc(docRef);
}
