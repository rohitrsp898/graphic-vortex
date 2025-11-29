import { collection, getDocs, addDoc, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { PORTFOLIO_DATA, getDriveDirectLink } from "../constants";
import { Project } from "../types";

const COLLECTION_NAME = "projects";

// Fetch all projects (Static + Firebase)
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const firebaseProjects: Project[] = [];
    querySnapshot.forEach((doc) => {
      firebaseProjects.push({ id: doc.id, ...doc.data() } as Project);
    });

    // Merge static data (bottom) with dynamic data (top)
    return [...firebaseProjects, ...PORTFOLIO_DATA];
  } catch (error) {
    console.error("Error fetching projects:", error);
    // Fallback to static data if firebase fails or is not configured
    return PORTFOLIO_DATA;
  }
};

// Add new project (With Direct Link)
export const uploadProject = async (
  imageUrl: string,
  details: Omit<Project, 'id' | 'imageUrl'>
): Promise<void> => {
  // We expect the user to provide a Google Drive Link
  // We process it to ensure it's a direct link
  const directLink = getDriveDirectLink(imageUrl);

  // Save Metadata to Firestore
  await addDoc(collection(db, COLLECTION_NAME), {
    ...details,
    imageUrl: directLink,
    createdAt: new Date().toISOString() // for sorting
  });
};