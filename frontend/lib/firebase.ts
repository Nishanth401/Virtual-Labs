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
  getDoc,
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
    const studentData = {
      ...profile,
      lastActive: new Date().toISOString()
    };

    // Save to Firestore 'users' collection by UID
    const userRef = doc(db, "users", profile.uid);
    await setDoc(userRef, studentData, { merge: true });

    // Save to Firestore 'students' collection by Register Number
    if (profile.registerNumber) {
      const studentRef = doc(db, "students", profile.registerNumber);
      await setDoc(studentRef, studentData, { merge: true });
    }
  } catch (err) {
    console.warn("Firestore save student profile error:", err);
  }
}

export async function deleteStudentAccountFromDb(uid: string, registerNumber?: string): Promise<void> {
  try {
    const userRef = doc(db, "users", uid);
    await deleteDoc(userRef);

    if (registerNumber) {
      const studentRef = doc(db, "students", registerNumber.trim().toUpperCase());
      await deleteDoc(studentRef);
    }
  } catch (err) {
    console.warn("Firestore delete student account warning:", err);
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn("LocalStorage delete error:", e);
    }
  }
}

export async function getStudentProfileFromDb(uid: string): Promise<StudentProfile | null> {
  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (snap && snap.exists()) {
      const data = snap.data() as Partial<StudentProfile>;
      return {
        uid,
        name: data.name || data.email?.split("@")[0] || "Student",
        registerNumber: data.registerNumber || "922521104001",
        email: data.email || "",
        department: data.department || "Artificial Intelligence & Data Science",
        yearSemester: data.yearSemester || "III Year / VI Semester",
        completedExperiments: data.completedExperiments || [],
        completedProblems: data.completedProblems || [],
        starredProblems: data.starredProblems || [],
        problemNotes: data.problemNotes || {},
        quizScores: data.quizScores || {},
        feedbacks: data.feedbacks || {},
        createdAt: data.createdAt || new Date().toISOString(),
        lastActive: data.lastActive || new Date().toISOString()
      };
    }
  } catch (err) {
    console.warn("Firestore fetch error, checking localStorage fallback:", err);
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

export async function verifyEmailAndRegNoUnique(
  emailInput: string,
  regNoInput: string,
  currentUid?: string
): Promise<{ valid: boolean; error?: string }> {
  const email = emailInput.trim().toLowerCase();
  const regNo = regNoInput.trim().toUpperCase();

  if (!email || !regNo) {
    return { valid: false, error: "Please enter both Email Address and Register Number." };
  }

  // 1. Check if Register Number is already bound to another Email in 'students' collection
  try {
    const studentRef = doc(db, "students", regNo);
    const snap = await getDoc(studentRef);
    if (snap && snap.exists()) {
      const data = snap.data();
      const existingEmail = (data.email || "").trim().toLowerCase();
      const existingUid = data.uid || "";

      if (existingEmail && existingEmail !== email) {
        return {
          valid: false,
          error: `Register Number ${regNo} is already registered with email (${existingEmail}).`
        };
      }
      if (currentUid && existingUid && existingUid !== currentUid && existingEmail !== email) {
        return {
          valid: false,
          error: `Register Number ${regNo} belongs to another registered student account.`
        };
      }
    }
  } catch (err) {
    console.warn("Firestore verifyEmailAndRegNoUnique regNo check warning:", err);
  }

  // 2. Check if Email is already bound to another Register Number in 'users' collection
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnap = await getDocs(q);

    if (!querySnap.empty) {
      for (const docSnap of querySnap.docs) {
        const data = docSnap.data();
        const existingRegNo = (data.registerNumber || "").trim().toUpperCase();
        const existingUid = data.uid || docSnap.id;

        if (existingRegNo && existingRegNo !== regNo) {
          if (currentUid && existingUid === currentUid) {
            continue;
          }
          return {
            valid: false,
            error: `Email address (${email}) is already bound to Register Number (${existingRegNo}). An email cannot be used for multiple Register Numbers.`
          };
        }
      }
    }
  } catch (err) {
    console.warn("Firestore verifyEmailAndRegNoUnique email check warning:", err);
  }

  // 3. LocalStorage fallback check
  if (typeof window !== "undefined") {
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        const localEmail = (parsed.email || "").trim().toLowerCase();
        const localRegNo = (parsed.registerNumber || "").trim().toUpperCase();

        if (localEmail === email && localRegNo && localRegNo !== regNo) {
          return {
            valid: false,
            error: `This email is already bound to Register Number (${localRegNo}).`
          };
        }
        if (localRegNo === regNo && localEmail && localEmail !== email) {
          return {
            valid: false,
            error: `Register Number (${regNo}) is already registered to another email address.`
          };
        }
      }
    } catch {}
  }

  return { valid: true };
}

// ==========================================
// FIRESTORE USER DATA SERVICES
// ==========================================

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

export async function markExperimentCompletedInDb(uid: string, experimentId: string): Promise<void> {
  try {
    const docRef = doc(db, "users", uid, "completedExperiments", experimentId);
    await setDoc(docRef, { experimentId, timestamp: new Date().toISOString() }, { merge: true });
  } catch (e) {
    console.warn("Firestore markExperimentCompletedInDb fallback:", e);
  }

  if (typeof window !== "undefined") {
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        const parsed: StudentProfile = JSON.parse(local);
        if (!parsed.completedExperiments.includes(experimentId)) {
          parsed.completedExperiments.push(experimentId);
          parsed.lastActive = new Date().toISOString();
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
        }
      }
    } catch {}
  }
}

export async function toggleProblemCompletedInDb(uid: string, problemId: string, _completed?: boolean): Promise<void> {
  try {
    const docRef = doc(db, "users", uid, "completedProblems", problemId);
    if (_completed === false) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, { problemId, timestamp: new Date().toISOString() }, { merge: true });
    }
  } catch (e) {
    console.warn("Firestore toggleProblemCompletedInDb fallback:", e);
  }

  if (typeof window !== "undefined") {
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        const parsed: StudentProfile = JSON.parse(local);
        const existing = parsed.completedProblems || [];
        if (existing.includes(problemId)) {
          parsed.completedProblems = existing.filter((p) => p !== problemId);
        } else {
          parsed.completedProblems = [...existing, problemId];
        }
        parsed.lastActive = new Date().toISOString();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      }
    } catch {}
  }
}

export async function toggleProblemStarredInDb(uid: string, problemId: string, _starred?: boolean): Promise<void> {
  try {
    const docRef = doc(db, "users", uid, "starredProblems", problemId);
    if (_starred === false) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, { problemId, timestamp: new Date().toISOString() }, { merge: true });
    }
  } catch (e) {
    console.warn("Firestore toggleProblemStarredInDb fallback:", e);
  }

  if (typeof window !== "undefined") {
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        const parsed: StudentProfile = JSON.parse(local);
        const existing = parsed.starredProblems || [];
        if (existing.includes(problemId)) {
          parsed.starredProblems = existing.filter((p) => p !== problemId);
        } else {
          parsed.starredProblems = [...existing, problemId];
        }
        parsed.lastActive = new Date().toISOString();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      }
    } catch {}
  }
}

export async function saveProblemNoteInDb(uid: string, problemId: string, noteText: string): Promise<void> {
  const timestamp = new Date().toISOString();
  try {
    const docRef = doc(db, "users", uid, "problemNotes", problemId);
    if (!noteText.trim()) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, {
        problemId,
        note: noteText.trim(),
        timestamp
      }, { merge: true });
    }
  } catch (e) {
    console.warn("Firestore saveProblemNoteInDb fallback:", e);
  }

  if (typeof window !== "undefined") {
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        const parsed: StudentProfile = JSON.parse(local);
        const existingNotes = parsed.problemNotes || {};
        if (!noteText.trim()) {
          delete existingNotes[problemId];
        } else {
          existingNotes[problemId] = { note: noteText.trim(), timestamp };
        }
        parsed.problemNotes = existingNotes;
        parsed.lastActive = timestamp;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      }
    } catch {}
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
