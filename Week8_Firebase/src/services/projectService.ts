import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Config";
import { Project } from "../types";

export async function createProject(project: Omit<Project, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, "projects"), {
        ...project,
        status: 'offline',
        createdAt: new Date()
    });
    return docRef.id;
}

export async function getProjects(): Promise<Project[]> {
    const querySnapshot = await getDocs(collection(db, "projects"));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Project));
}

export async function deleteProject(id: string): Promise<void> {
    await deleteDoc(doc(db, "projects", id));
}

export async function updateProject(
    id: string,
    data: Partial<Omit<Project, "id">>
): Promise<void> {
    const ref = doc(db, "projects", id);
    await updateDoc(ref, data);
}
