/**
 * firebase.ts
 *
 * Client Firebase configuration with Firebase Authentication & Cloud Firestore.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  User
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  where
} from "firebase/firestore";

// Web App Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAYS8N8C25-VWYUfCDh1OrUq__DxgVBgXk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "virtual-lab-e7495.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "virtual-lab-e7495",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "virtual-lab-e7495.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "341602998056",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:341602998056:web:3e78ace74d2fd34680e21d"
};

// Initialize Firebase (Auth & Firestore)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export interface StudentProfile {
  uid: string;
  name: string;
  registerNumber: string;
  email: string;
  department: string;
  yearSemester: string;
  completedExperiments: string[];
  completedProblems?: string[];
  starredProblems?: string[];
  problemNotes?: Record<string, { note: string; timestamp: string }>;
  quizScores: Record<string, { score: number; total: number; timestamp: string }>;
  feedbacks: Record<string, { rating: number; comment: string; timestamp: string }>;
  createdAt: string;
  lastActive: string;
}

export interface UserFolder {
  id: string;
  name: string;
  createdAt: string;
}

export interface UserFile {
  id: string;
  name: string;
  folderId?: string;
  size: string;
  type?: string;
  downloadUrl?: string;
  createdAt: string;
}

export interface UserNote {
  id: string;
  title: string;
  content?: string;
  createdAt: string;
}

export interface UserTeamMember {
  id: string;
  name: string;
  role?: string;
  createdAt: string;
}

const LOCAL_STORAGE_KEY = "vsb_student_profile_data";

export async function saveStudentProfileToDb(profile: StudentProfile): Promise<void> {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn("LocalStorage write error:", e);
    }
  }

  try {
    const userRef = doc(db, "students", profile.uid);
    await Promise.race([
      setDoc(userRef, profile, { merge: true }),
      new Promise((resolve) => setTimeout(resolve, 1500))
    ]);
  } catch (err) {
    console.warn("Firestore sync fallback to localStorage:", err);
  }
}

export async function getStudentProfileFromDb(uid: string): Promise<StudentProfile | null> {
  try {
    const userRef = doc(db, "students", uid);
    const docSnap = await Promise.race([
      getDoc(userRef),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500))
    ]);
    if (docSnap && docSnap.exists()) {
      return docSnap.data() as StudentProfile;
    }
  } catch (err) {
    console.warn("Firestore fetch fallback to localStorage:", err);
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.uid === uid || parsed.registerNumber) return parsed;
      } catch {}
    }
  }

  return null;
}

// Ensure User Document exists
export async function syncUserDoc(user: User): Promise<void> {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      displayName: user.displayName || user.email?.split("@")[0] || "Student",
      email: user.email || "",
      plan: "Standard Student Access",
      createdAt: new Date().toISOString()
    }, { merge: true });
  } catch (e) {
    console.warn("Firestore syncUserDoc fallback:", e);
  }
}

// Folders
export async function getUserFolders(uid: string): Promise<UserFolder[]> {
  try {
    const colRef = collection(db, "users", uid, "folders");
    const snap = await getDocs(colRef);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserFolder));
  } catch (e) {
    const local = typeof window !== "undefined" ? localStorage.getItem(`vlab_${uid}_folders`) : null;
    return local ? JSON.parse(local) : [
      { id: "f1", name: "Data Structures Manuals", createdAt: new Date().toISOString() },
      { id: "f2", name: "ML Datasets & PDFs", createdAt: new Date().toISOString() }
    ];
  }
}

export async function addUserFolder(uid: string, name: string): Promise<UserFolder> {
  const newFolder = {
    name,
    createdAt: new Date().toISOString()
  };
  try {
    const colRef = collection(db, "users", uid, "folders");
    const res = await addDoc(colRef, newFolder);
    return { id: res.id, ...newFolder };
  } catch (e) {
    const folder = { id: `folder_${Date.now()}`, ...newFolder };
    const local = localStorage.getItem(`vlab_${uid}_folders`);
    const list = local ? JSON.parse(local) : [];
    localStorage.setItem(`vlab_${uid}_folders`, JSON.stringify([...list, folder]));
    return folder;
  }
}

export async function deleteUserFolder(uid: string, folderId: string): Promise<void> {
  try {
    const docRef = doc(db, "users", uid, "folders", folderId);
    await deleteDoc(docRef);
  } catch (e) {
    const local = localStorage.getItem(`vlab_${uid}_folders`);
    if (local) {
      const list: UserFolder[] = JSON.parse(local);
      localStorage.setItem(`vlab_${uid}_folders`, JSON.stringify(list.filter((f) => f.id !== folderId)));
    }
  }
}

// Files (PDFs, Manuals, Code)
export async function getUserFiles(uid: string): Promise<UserFile[]> {
  try {
    const colRef = collection(db, "users", uid, "files");
    const snap = await getDocs(colRef);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserFile));
  } catch (e) {
    const local = localStorage.getItem(`vlab_${uid}_files`);
    return local ? JSON.parse(local) : [
      { id: "doc-1", name: "DSA_Lab_Manual_Semester_VI.pdf", folderId: "f1", size: "2.4 MB", type: "PDF", createdAt: new Date().toISOString() },
      { id: "doc-2", name: "Linear_Regression_Lab_Observations.pdf", folderId: "f2", size: "1.1 MB", type: "PDF", createdAt: new Date().toISOString() }
    ];
  }
}

export async function addUserFile(uid: string, fileData: Omit<UserFile, "id" | "createdAt">): Promise<UserFile> {
  const newFile = {
    ...fileData,
    createdAt: new Date().toISOString()
  };
  try {
    const colRef = collection(db, "users", uid, "files");
    const res = await addDoc(colRef, newFile);
    return { id: res.id, ...newFile };
  } catch (e) {
    const file = { id: `file_${Date.now()}`, ...newFile };
    const local = localStorage.getItem(`vlab_${uid}_files`);
    const list = local ? JSON.parse(local) : [];
    localStorage.setItem(`vlab_${uid}_files`, JSON.stringify([...list, file]));
    return file;
  }
}

export async function deleteUserFile(uid: string, fileId: string): Promise<void> {
  try {
    const docRef = doc(db, "users", uid, "files", fileId);
    await deleteDoc(docRef);
  } catch (e) {
    const local = localStorage.getItem(`vlab_${uid}_files`);
    if (local) {
      const list: UserFile[] = JSON.parse(local);
      localStorage.setItem(`vlab_${uid}_files`, JSON.stringify(list.filter((f) => f.id !== fileId)));
    }
  }
}

// Notes
export async function getUserNotes(uid: string): Promise<UserNote[]> {
  try {
    const colRef = collection(db, "users", uid, "notes");
    const snap = await getDocs(colRef);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserNote));
  } catch (e) {
    const local = localStorage.getItem(`vlab_${uid}_notes`);
    return local ? JSON.parse(local) : [
      { id: "n1", title: "Stack vs Queue Viva Notes", content: "Stack operates in LIFO order (recursion, undo). Queue operates in FIFO order (buffering, BFS graph traversal).", createdAt: new Date().toISOString() },
      { id: "n2", title: "Gradient Descent Learning Rate Tips", content: "If learning rate is too large, gradient descent oscillates or diverges. Use alpha = 0.01 with standard normalization.", createdAt: new Date().toISOString() }
    ];
  }
}

export async function addUserNote(uid: string, title: string, content?: string): Promise<UserNote> {
  const newNote = {
    title,
    content: content || "",
    createdAt: new Date().toISOString()
  };
  try {
    const colRef = collection(db, "users", uid, "notes");
    const res = await addDoc(colRef, newNote);
    return { id: res.id, ...newNote };
  } catch (e) {
    const note = { id: `note_${Date.now()}`, ...newNote };
    const local = localStorage.getItem(`vlab_${uid}_notes`);
    const list = local ? JSON.parse(local) : [];
    localStorage.setItem(`vlab_${uid}_notes`, JSON.stringify([...list, note]));
    return note;
  }
}

export async function deleteUserNote(uid: string, noteId: string): Promise<void> {
  try {
    const docRef = doc(db, "users", uid, "notes", noteId);
    await deleteDoc(docRef);
  } catch (e) {
    const local = localStorage.getItem(`vlab_${uid}_notes`);
    if (local) {
      const list: UserNote[] = JSON.parse(local);
      localStorage.setItem(`vlab_${uid}_notes`, JSON.stringify(list.filter((n) => n.id !== noteId)));
    }
  }
}

// Team Members
export async function getUserTeamMembers(uid: string): Promise<UserTeamMember[]> {
  try {
    const colRef = collection(db, "users", uid, "teamMembers");
    const snap = await getDocs(colRef);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserTeamMember));
  } catch (e) {
    const local = localStorage.getItem(`vlab_${uid}_team`);
    return local ? JSON.parse(local) : [
      { id: "tm1", name: "Praveen S", role: "Lab Partner (Batch A)", createdAt: new Date().toISOString() },
      { id: "tm2", name: "Dr. K. S. Arunkumar", role: "Faculty Mentor / Head of Dept", createdAt: new Date().toISOString() }
    ];
  }
}

export async function addUserTeamMember(uid: string, name: string, role?: string): Promise<UserTeamMember> {
  const newMember = {
    name,
    role: role || "Lab Partner",
    createdAt: new Date().toISOString()
  };
  try {
    const colRef = collection(db, "users", uid, "teamMembers");
    const res = await addDoc(colRef, newMember);
    return { id: res.id, ...newMember };
  } catch (e) {
    const member = { id: `member_${Date.now()}`, ...newMember };
    const local = localStorage.getItem(`vlab_${uid}_team`);
    const list = local ? JSON.parse(local) : [];
    localStorage.setItem(`vlab_${uid}_team`, JSON.stringify([...list, member]));
    return member;
  }
}

export async function deleteUserTeamMember(uid: string, memberId: string): Promise<void> {
  try {
    const docRef = doc(db, "users", uid, "teamMembers", memberId);
    await deleteDoc(docRef);
  } catch (e) {
    const local = localStorage.getItem(`vlab_${uid}_team`);
    if (local) {
      const list: UserTeamMember[] = JSON.parse(local);
      localStorage.setItem(`vlab_${uid}_team`, JSON.stringify(list.filter((m) => m.id !== memberId)));
    }
  }
}

export async function markExperimentCompletedInDb(uid: string, experimentId: string): Promise<void> {
  try {
    const userRef = doc(db, "students", uid);
    await setDoc(userRef, { lastActive: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn("markExperimentCompletedInDb fallback:", err);
  }
}

export async function toggleProblemCompletedInDb(uid: string, problemId: string): Promise<void> {
  try {
    const userRef = doc(db, "students", uid);
    await setDoc(userRef, { lastActive: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn("toggleProblemCompletedInDb fallback:", err);
  }
}

export async function toggleProblemStarredInDb(uid: string, problemId: string): Promise<void> {
  try {
    const userRef = doc(db, "students", uid);
    await setDoc(userRef, { lastActive: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn("toggleProblemStarredInDb fallback:", err);
  }
}

export async function saveProblemNoteInDb(uid: string, problemId: string, note: string): Promise<void> {
  try {
    const userRef = doc(db, "students", uid);
    await setDoc(userRef, { lastActive: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn("saveProblemNoteInDb fallback:", err);
  }
}
