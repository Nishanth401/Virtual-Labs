/**
 * supabase.ts
 *
 * Supabase client and data access layer.
 * Powered by Supabase Auth, PostgreSQL tables, and Storage.
 */

import { createClient, User as SupabaseUser, Session } from "@supabase/supabase-js";

// Supabase environment credentials with safe fallbacks
export const supabaseUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fxozrkxpnnpvnzqguugk.supabase.co";
export const supabaseAnonKey = 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  "sb_publishable_bLMZgS-WWCJjzmB6IaAWUQ_NFqlSbkX";

// Initialize Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Re-export User type
export type User = SupabaseUser & {
  uid: string;
  displayName: string | null;
};

// ========================================================
// DATA SCHEMAS & INTERFACES
// ========================================================

export interface StudentProfile {
  uid: string;
  name: string;
  registerNumber: string;
  email: string;
  collegeSlug?: string;
  collegeName?: string;
  collegeCode?: string;
  department: string;
  yearSemester: string;
  year?: string;
  className?: string;
  profileCompleted?: boolean;
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
  parentId: string | null;
  createdAt: string;
  color?: string;
}

export interface UserFile {
  id: string;
  name: string;
  folderId?: string | null;
  size: string | number;
  type: string;
  downloadUrl?: string;
  createdAt: string;
}

export interface UserNote {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface UserTeamMember {
  id: string;
  name: string;
  role?: string;
  createdAt: string;
}

export interface CloudStarStory {
  id?: string;
  title: string;
  companyTag: string;
  principle: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  updatedAt: string;
}

export interface CloudSrsProgress {
  cardId: string;
  intervalDays: number;
  lastReviewed: string;
}

export interface CloudReadinessProfile {
  targetCompany: string;
  targetRole: string;
  experienceLevel: string;
  phaseScores: Record<string, number>;
  updatedAt: string;
}

// ========================================================
// STUDENT PROFILE DATABASE METHODS
// ========================================================

export async function saveStudentProfileToDb(profile: StudentProfile): Promise<void> {
  try {
    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: profile.uid,
        name: profile.name,
        register_number: profile.registerNumber,
        email: profile.email,
        college_slug: profile.collegeSlug || "vsb",
        college_name: profile.collegeName || "VSB Engineering College",
        college_code: profile.collegeCode || "9225",
        department: profile.department,
        year_semester: profile.yearSemester,
        year: profile.year,
        class_name: profile.className,
        profile_completed: profile.profileCompleted,
        completed_experiments: profile.completedExperiments,
        completed_problems: profile.completedProblems || [],
        starred_problems: profile.starredProblems || [],
        problem_notes: profile.problemNotes || {},
        quiz_scores: profile.quizScores || {},
        feedbacks: profile.feedbacks || {},
        created_at: profile.createdAt,
        last_active: new Date().toISOString()
      });
    if (error) throw error;
  } catch (e) {
    if (typeof window !== "undefined") {
      localStorage.setItem(`vlab_student_${profile.uid}`, JSON.stringify(profile));
    }
  }
}

export async function getStudentProfileFromDb(uid: string): Promise<StudentProfile | null> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", uid)
      .single();

    if (error) throw error;

    if (data) {
      return {
        uid: data.id,
        name: data.name,
        registerNumber: data.register_number,
        email: data.email,
        collegeSlug: data.college_slug || "vsb",
        collegeName: data.college_name || "VSB Engineering College",
        collegeCode: data.college_code || "9225",
        department: data.department || "Artificial Intelligence & Data Science",
        yearSemester: data.year_semester || "Year III / Semester VI",
        year: data.year || undefined,
        className: data.class_name || undefined,
        profileCompleted: data.profile_completed || Boolean(data.register_number && !data.register_number.startsWith("STUDENT") && data.class_name),
        completedExperiments: data.completed_experiments || [],
        completedProblems: data.completed_problems || [],
        starredProblems: data.starred_problems || [],
        problemNotes: data.problem_notes || {},
        quizScores: data.quiz_scores || {},
        feedbacks: data.feedbacks || {},
        createdAt: data.created_at || new Date().toISOString(),
        lastActive: data.last_active || new Date().toISOString()
      };
    }
  } catch (e) {
    // Fallback to localStorage
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(`vlab_student_${uid}`);
    return local ? JSON.parse(local) : null;
  }
  return null;
}

export async function deleteStudentAccountFromDb(uid: string): Promise<void> {
  try {
    await supabase.from("profiles").delete().eq("id", uid);
  } catch (e) {
    // ignore
  }
  if (typeof window !== "undefined") {
    localStorage.removeItem(`vlab_student_${uid}`);
  }
}

export async function verifyEmailAndRegNoUnique(
  email: string,
  regNo: string,
  currentUid?: string
): Promise<{ emailUnique: boolean; regNoUnique: boolean }> {
  try {
    let emailQuery = supabase.from("profiles").select("id").eq("email", email.toLowerCase());
    let regNoQuery = supabase.from("profiles").select("id").eq("register_number", regNo.trim().toUpperCase());

    if (currentUid) {
      emailQuery = emailQuery.neq("id", currentUid);
      regNoQuery = regNoQuery.neq("id", currentUid);
    }

    const [emailRes, regNoRes] = await Promise.all([emailQuery, regNoQuery]);

    return {
      emailUnique: !emailRes.data || emailRes.data.length === 0,
      regNoUnique: !regNoRes.data || regNoRes.data.length === 0
    };
  } catch (e) {
    return { emailUnique: true, regNoUnique: true };
  }
}

export async function markExperimentCompletedInDb(uid: string, experimentId: string): Promise<void> {
  const profile = await getStudentProfileFromDb(uid);
  if (!profile) return;
  if (!profile.completedExperiments.includes(experimentId)) {
    profile.completedExperiments.push(experimentId);
    await saveStudentProfileToDb(profile);
  }
}

export async function toggleProblemCompletedInDb(uid: string, problemId: string): Promise<void> {
  const profile = await getStudentProfileFromDb(uid);
  if (!profile) return;
  const list = profile.completedProblems || [];
  profile.completedProblems = list.includes(problemId) ? list.filter(id => id !== problemId) : [...list, problemId];
  await saveStudentProfileToDb(profile);
}

export async function toggleProblemStarredInDb(uid: string, problemId: string): Promise<void> {
  const profile = await getStudentProfileFromDb(uid);
  if (!profile) return;
  const list = profile.starredProblems || [];
  profile.starredProblems = list.includes(problemId) ? list.filter(id => id !== problemId) : [...list, problemId];
  await saveStudentProfileToDb(profile);
}

export async function saveProblemNoteInDb(uid: string, problemId: string, note: string): Promise<void> {
  const profile = await getStudentProfileFromDb(uid);
  if (!profile) return;
  if (!profile.problemNotes) profile.problemNotes = {};
  profile.problemNotes[problemId] = { note, timestamp: new Date().toISOString() };
  await saveStudentProfileToDb(profile);
}

// ========================================================
// USER NOTES, FOLDERS, FILES & TEAM
// ========================================================

export async function getUserNotes(uid: string): Promise<UserNote[]> {
  try {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", uid)
      .order("updated_at", { ascending: false });
    if (!error && data) {
      return data.map(n => ({
        id: n.id,
        title: n.title,
        content: n.content,
        createdAt: n.created_at,
        updatedAt: n.updated_at,
        tags: n.tags || []
      }));
    }
  } catch (e) {}

  const local = typeof window !== "undefined" ? localStorage.getItem(`vlab_${uid}_notes`) : null;
  return local ? JSON.parse(local) : [
    { id: "note-1", title: "C Pointers & Dynamic Memory", content: "Notes on malloc(), calloc(), free() and memory leak prevention.", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  ];
}

export async function saveUserNote(uid: string, title: string, content: string, noteId?: string): Promise<UserNote> {
  const now = new Date().toISOString();
  const note: UserNote = {
    id: noteId || `note_${Date.now()}`,
    title,
    content,
    createdAt: now,
    updatedAt: now
  };

  try {
    await supabase.from("notes").upsert({
      id: note.id,
      user_id: uid,
      title: note.title,
      content: note.content,
      created_at: note.createdAt,
      updated_at: note.updatedAt
    });
  } catch (e) {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(`vlab_${uid}_notes`);
    const list: UserNote[] = local ? JSON.parse(local) : [];
    const index = list.findIndex(n => n.id === note.id);
    if (index >= 0) list[index] = note;
    else list.unshift(note);
    localStorage.setItem(`vlab_${uid}_notes`, JSON.stringify(list));
  }
  return note;
}

export const addUserNote = saveUserNote;

export async function deleteUserNote(uid: string, noteId: string): Promise<void> {
  try {
    await supabase.from("notes").delete().eq("id", noteId).eq("user_id", uid);
  } catch (e) {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(`vlab_${uid}_notes`);
    if (local) {
      const list: UserNote[] = JSON.parse(local);
      localStorage.setItem(`vlab_${uid}_notes`, JSON.stringify(list.filter(n => n.id !== noteId)));
    }
  }
}

export async function getUserFolders(uid: string): Promise<UserFolder[]> {
  try {
    const { data } = await supabase.from("folders").select("*").eq("user_id", uid);
    if (data && data.length > 0) {
      return data.map(f => ({
        id: f.id,
        name: f.name,
        parentId: f.parent_id,
        createdAt: f.created_at,
        color: f.color
      }));
    }
  } catch (e) {}

  const local = typeof window !== "undefined" ? localStorage.getItem(`vlab_${uid}_folders`) : null;
  return local ? JSON.parse(local) : [
    { id: "root", name: "My Drive", parentId: null, createdAt: new Date().toISOString() }
  ];
}

export async function createUserFolder(uid: string, name: string, parentId: string | null = null): Promise<UserFolder> {
  const folder: UserFolder = {
    id: `folder_${Date.now()}`,
    name,
    parentId,
    createdAt: new Date().toISOString()
  };

  try {
    await supabase.from("folders").insert({
      id: folder.id,
      user_id: uid,
      name: folder.name,
      parent_id: folder.parentId,
      created_at: folder.createdAt
    });
  } catch (e) {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(`vlab_${uid}_folders`);
    const list: UserFolder[] = local ? JSON.parse(local) : [];
    localStorage.setItem(`vlab_${uid}_folders`, JSON.stringify([...list, folder]));
  }
  return folder;
}

export const addUserFolder = createUserFolder;

export async function deleteUserFolder(uid: string, folderId: string): Promise<void> {
  try {
    await supabase.from("folders").delete().eq("id", folderId).eq("user_id", uid);
  } catch (e) {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(`vlab_${uid}_folders`);
    if (local) {
      const list: UserFolder[] = JSON.parse(local);
      localStorage.setItem(`vlab_${uid}_folders`, JSON.stringify(list.filter(f => f.id !== folderId)));
    }
  }
}

export async function getUserFiles(uid: string, folderId: string | null = null): Promise<UserFile[]> {
  try {
    let q = supabase.from("files").select("*").eq("user_id", uid);
    if (folderId) q = q.eq("folder_id", folderId);
    const { data } = await q;
    if (data && data.length > 0) {
      return data.map(f => ({
        id: f.id,
        name: f.name,
        folderId: f.folder_id,
        size: f.size,
        type: f.type,
        downloadUrl: f.download_url,
        createdAt: f.created_at
      }));
    }
  } catch (e) {}

  const local = typeof window !== "undefined" ? localStorage.getItem(`vlab_${uid}_files`) : null;
  return local ? JSON.parse(local) : [];
}

export async function addUserFile(
  uid: string,
  fileOrName: string | { name: string; folderId?: string | null; size?: string | number; type?: string; downloadUrl?: string },
  size?: string | number,
  type?: string,
  downloadUrl?: string,
  folderId: string | null = null
): Promise<UserFile> {
  const fileData = typeof fileOrName === "object" ? fileOrName : {
    name: fileOrName,
    size: size || "1.0 MB",
    type: type || "PDF",
    downloadUrl: downloadUrl || "",
    folderId: folderId || null
  };

  const file: UserFile = {
    id: `file_${Date.now()}`,
    name: fileData.name,
    size: fileData.size || "1.0 MB",
    type: fileData.type || "PDF",
    downloadUrl: fileData.downloadUrl || "",
    folderId: fileData.folderId || null,
    createdAt: new Date().toISOString()
  };

  try {
    await supabase.from("files").insert({
      id: file.id,
      user_id: uid,
      name: file.name,
      size: file.size,
      type: file.type,
      download_url: file.downloadUrl,
      folder_id: file.folderId,
      created_at: file.createdAt
    });
  } catch (e) {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(`vlab_${uid}_files`);
    const list: UserFile[] = local ? JSON.parse(local) : [];
    localStorage.setItem(`vlab_${uid}_files`, JSON.stringify([...list, file]));
  }
  return file;
}

export async function deleteUserFile(uid: string, fileId: string): Promise<void> {
  try {
    await supabase.from("files").delete().eq("id", fileId).eq("user_id", uid);
  } catch (e) {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(`vlab_${uid}_files`);
    if (local) {
      const list: UserFile[] = JSON.parse(local);
      localStorage.setItem(`vlab_${uid}_files`, JSON.stringify(list.filter(f => f.id !== fileId)));
    }
  }
}

export async function getUserTeamMembers(uid: string): Promise<UserTeamMember[]> {
  try {
    const { data } = await supabase.from("team_members").select("*").eq("user_id", uid);
    if (data && data.length > 0) {
      return data.map(t => ({
        id: t.id,
        name: t.name,
        role: t.role,
        createdAt: t.created_at
      }));
    }
  } catch (e) {}

  const local = typeof window !== "undefined" ? localStorage.getItem(`vlab_${uid}_team`) : null;
  return local ? JSON.parse(local) : [
    { id: "tm1", name: "Praveen S", role: "Lab Partner (Batch A)", createdAt: new Date().toISOString() },
    { id: "tm2", name: "Dr. K. S. Arunkumar", role: "Faculty Mentor / Head of Dept", createdAt: new Date().toISOString() }
  ];
}

export async function addUserTeamMember(uid: string, name: string, role?: string): Promise<UserTeamMember> {
  const member: UserTeamMember = {
    id: `member_${Date.now()}`,
    name,
    role: role || "Lab Partner",
    createdAt: new Date().toISOString()
  };

  try {
    await supabase.from("team_members").insert({
      id: member.id,
      user_id: uid,
      name: member.name,
      role: member.role,
      created_at: member.createdAt
    });
  } catch (e) {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(`vlab_${uid}_team`);
    const list: UserTeamMember[] = local ? JSON.parse(local) : [];
    localStorage.setItem(`vlab_${uid}_team`, JSON.stringify([...list, member]));
  }
  return member;
}

export async function deleteUserTeamMember(uid: string, memberId: string): Promise<void> {
  try {
    await supabase.from("team_members").delete().eq("id", memberId).eq("user_id", uid);
  } catch (e) {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(`vlab_${uid}_team`);
    if (local) {
      const list: UserTeamMember[] = JSON.parse(local);
      localStorage.setItem(`vlab_${uid}_team`, JSON.stringify(list.filter(m => m.id !== memberId)));
    }
  }
}

// ========================================================
// INTERVIEW PREP: CLOUD PERSISTENCE & SYNC
// ========================================================

export async function saveUserStarStory(uid: string, story: Omit<CloudStarStory, "updatedAt">): Promise<CloudStarStory> {
  const payload: CloudStarStory = {
    ...story,
    id: story.id || `story_${Date.now()}`,
    updatedAt: new Date().toISOString()
  };

  try {
    await supabase.from("star_stories").upsert({
      id: payload.id,
      user_id: uid,
      title: payload.title,
      company_tag: payload.companyTag,
      principle: payload.principle,
      situation: payload.situation,
      task: payload.task,
      action: payload.action,
      result: payload.result,
      updated_at: payload.updatedAt
    });
  } catch (e) {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(`vlab_${uid}_star_stories`);
    const list: CloudStarStory[] = local ? JSON.parse(local) : [];
    const idx = list.findIndex(s => s.id === payload.id);
    if (idx >= 0) list[idx] = payload;
    else list.unshift(payload);
    localStorage.setItem(`vlab_${uid}_star_stories`, JSON.stringify(list));
  }
  return payload;
}

export async function getUserStarStories(uid: string): Promise<CloudStarStory[]> {
  try {
    const { data } = await supabase
      .from("star_stories")
      .select("*")
      .eq("user_id", uid)
      .order("updated_at", { ascending: false });

    if (data && data.length > 0) {
      return data.map(d => ({
        id: d.id,
        title: d.title,
        companyTag: d.company_tag,
        principle: d.principle,
        situation: d.situation,
        task: d.task,
        action: d.action,
        result: d.result,
        updatedAt: d.updated_at
      }));
    }
  } catch (e) {}

  const local = typeof window !== "undefined" ? localStorage.getItem(`vlab_${uid}_star_stories`) : null;
  return local ? JSON.parse(local) : [];
}

export async function saveUserSrsProgress(uid: string, cardId: string, intervalDays: number): Promise<void> {
  const payload: CloudSrsProgress = {
    cardId,
    intervalDays,
    lastReviewed: new Date().toISOString()
  };

  try {
    await supabase.from("srs_progress").upsert({
      user_id: uid,
      card_id: cardId,
      interval_days: intervalDays,
      last_reviewed: payload.lastReviewed
    });
  } catch (e) {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(`vlab_${uid}_srs`);
    const map: Record<string, CloudSrsProgress> = local ? JSON.parse(local) : {};
    map[cardId] = payload;
    localStorage.setItem(`vlab_${uid}_srs`, JSON.stringify(map));
  }
}

export async function getUserSrsProgress(uid: string): Promise<Record<string, CloudSrsProgress>> {
  try {
    const { data } = await supabase.from("srs_progress").select("*").eq("user_id", uid);
    if (data && data.length > 0) {
      const result: Record<string, CloudSrsProgress> = {};
      data.forEach(d => {
        result[d.card_id] = {
          cardId: d.card_id,
          intervalDays: d.interval_days,
          lastReviewed: d.last_reviewed
        };
      });
      return result;
    }
  } catch (e) {}

  const local = typeof window !== "undefined" ? localStorage.getItem(`vlab_${uid}_srs`) : null;
  return local ? JSON.parse(local) : {};
}

export async function saveUserReadinessProfile(uid: string, profile: Omit<CloudReadinessProfile, "updatedAt">): Promise<void> {
  const payload: CloudReadinessProfile = {
    ...profile,
    updatedAt: new Date().toISOString()
  };

  try {
    await supabase.from("readiness_profiles").upsert({
      user_id: uid,
      target_company: profile.targetCompany,
      target_role: profile.targetRole,
      experience_level: profile.experienceLevel,
      phase_scores: profile.phaseScores,
      updated_at: payload.updatedAt
    });
  } catch (e) {}

  if (typeof window !== "undefined") {
    localStorage.setItem(`vlab_${uid}_readiness`, JSON.stringify(payload));
  }
}

export async function getUserReadinessProfile(uid: string): Promise<CloudReadinessProfile | null> {
  try {
    const { data } = await supabase
      .from("readiness_profiles")
      .select("*")
      .eq("user_id", uid)
      .single();

    if (data) {
      return {
        targetCompany: data.target_company,
        targetRole: data.target_role,
        experienceLevel: data.experience_level,
        phaseScores: data.phase_scores,
        updatedAt: data.updated_at
      };
    }
  } catch (e) {}

  const local = typeof window !== "undefined" ? localStorage.getItem(`vlab_${uid}_readiness`) : null;
  return local ? JSON.parse(local) : null;
}

export async function getAllStudentProfilesFromDb(): Promise<StudentProfile[]> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((d) => ({
        uid: d.id,
        name: d.name || "Student",
        registerNumber: d.register_number || "922522AD000",
        email: d.email || "",
        department: d.department || "Artificial Intelligence & Data Science",
        yearSemester: d.year_semester || "Year III / Semester VI",
        completedExperiments: d.completed_experiments || [],
        completedProblems: d.completed_problems || [],
        starredProblems: d.starred_problems || [],
        problemNotes: d.problem_notes || {},
        quizScores: d.quiz_scores || {},
        feedbacks: d.feedbacks || {},
        createdAt: d.created_at || new Date().toISOString(),
        lastActive: d.last_active || new Date().toISOString()
      }));
    }
  } catch (e) {
    console.warn("Could not load profiles from Supabase, loading fallback student cohort data:", e);
  }

  // Fallback demo cohort data for instant faculty & admin analytics
  return [
    {
      uid: "stu-101",
      name: "Rohith E",
      registerNumber: "922522AD045",
      email: "rohith.e@vsb.ac.in",
      department: "Artificial Intelligence & Data Science",
      yearSemester: "Year III / Semester VI",
      completedExperiments: ["stack-operations", "queue-operations", "bubble-sort", "cpu-scheduling-fcfs-sjf", "astar-search-8puzzle", "aws-ec2-vpc-infrastructure"],
      completedProblems: ["lc-1", "lc-2", "lc-3", "lc-4"],
      quizScores: {
        "stack-operations": { score: 5, total: 5, timestamp: new Date(Date.now() - 3600000 * 4).toISOString() },
        "queue-operations": { score: 5, total: 5, timestamp: new Date(Date.now() - 3600000 * 8).toISOString() },
        "bubble-sort": { score: 5, total: 5, timestamp: new Date(Date.now() - 3600000 * 18).toISOString() },
        "cpu-scheduling-fcfs-sjf": { score: 4, total: 5, timestamp: new Date(Date.now() - 3600000 * 24).toISOString() },
        "astar-search-8puzzle": { score: 5, total: 5, timestamp: new Date(Date.now() - 3600000 * 30).toISOString() },
        "binary-search": { score: 5, total: 5, timestamp: new Date(Date.now() - 3600000 * 36).toISOString() },
        "dijkstra": { score: 4, total: 5, timestamp: new Date(Date.now() - 3600000 * 48).toISOString() }
      },
      feedbacks: {
        "stack-operations": { rating: 5, comment: "LIFO animations and Call Stack trace were very clear!", timestamp: new Date().toISOString() }
      },
      createdAt: "2026-01-15T09:00:00Z",
      lastActive: new Date().toISOString()
    },
    {
      uid: "stu-102",
      name: "Anishanth S",
      registerNumber: "922522AD008",
      email: "anishanth404@gmail.com",
      department: "Artificial Intelligence & Data Science",
      yearSemester: "Year III / Semester VI",
      completedExperiments: ["stack-operations", "singly-linked-list", "selection-sort", "producer-consumer-semaphores", "bankers-deadlock-algorithm"],
      completedProblems: ["lc-2", "lc-5"],
      quizScores: {
        "stack-operations": { score: 5, total: 5, timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
        "singly-linked-list": { score: 5, total: 5, timestamp: new Date(Date.now() - 3600000 * 6).toISOString() },
        "selection-sort": { score: 4, total: 5, timestamp: new Date(Date.now() - 3600000 * 12).toISOString() },
        "producer-consumer-semaphores": { score: 5, total: 5, timestamp: new Date(Date.now() - 3600000 * 20).toISOString() },
        "bankers-deadlock-algorithm": { score: 5, total: 5, timestamp: new Date(Date.now() - 3600000 * 28).toISOString() },
        "avl-tree": { score: 4, total: 5, timestamp: new Date(Date.now() - 3600000 * 40).toISOString() }
      },
      feedbacks: {
        "producer-consumer-semaphores": { rating: 5, comment: "Bounded buffer mutex simulation explained race conditions perfectly.", timestamp: new Date().toISOString() }
      },
      createdAt: "2026-01-18T10:30:00Z",
      lastActive: new Date(Date.now() - 1800000).toISOString()
    },
    {
      uid: "stu-103",
      name: "Praveen S",
      registerNumber: "922522AD038",
      email: "praveen.s@vsb.ac.in",
      department: "Artificial Intelligence & Data Science",
      yearSemester: "Year III / Semester VI",
      completedExperiments: ["stack-operations", "queue-operations", "insertion-sort", "hadoop-hdfs-cluster-management"],
      completedProblems: ["lc-1"],
      quizScores: {
        "stack-operations": { score: 4, total: 5, timestamp: new Date(Date.now() - 3600000 * 14).toISOString() },
        "queue-operations": { score: 4, total: 5, timestamp: new Date(Date.now() - 3600000 * 22).toISOString() },
        "insertion-sort": { score: 5, total: 5, timestamp: new Date(Date.now() - 3600000 * 32).toISOString() },
        "hadoop-hdfs-cluster-management": { score: 4, total: 5, timestamp: new Date(Date.now() - 3600000 * 50).toISOString() }
      },
      feedbacks: {},
      createdAt: "2026-02-01T08:15:00Z",
      lastActive: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
      uid: "stu-104",
      name: "Kavitha R",
      registerNumber: "922522CS052",
      email: "kavitha.r@vsb.ac.in",
      department: "Computer Science & Engineering",
      yearSemester: "Year III / Semester VI",
      completedExperiments: ["singly-linked-list", "bubble-sort", "sql-ddl-dml-operations", "scikit-learn-linear-regression"],
      completedProblems: ["lc-1", "lc-3"],
      quizScores: {
        "singly-linked-list": { score: 5, total: 5, timestamp: new Date(Date.now() - 3600000 * 10).toISOString() },
        "bubble-sort": { score: 4, total: 5, timestamp: new Date(Date.now() - 3600000 * 16).toISOString() },
        "sql-ddl-dml-operations": { score: 5, total: 5, timestamp: new Date(Date.now() - 3600000 * 26).toISOString() },
        "scikit-learn-linear-regression": { score: 4, total: 5, timestamp: new Date(Date.now() - 3600000 * 34).toISOString() }
      },
      feedbacks: {},
      createdAt: "2026-02-05T11:45:00Z",
      lastActive: new Date(Date.now() - 3600000 * 12).toISOString()
    },
    {
      uid: "stu-105",
      name: "Dharun Kumar M",
      registerNumber: "922522AD012",
      email: "dharun.m@vsb.ac.in",
      department: "Artificial Intelligence & Data Science",
      yearSemester: "Year III / Semester VI",
      completedExperiments: ["stack-operations", "minimax-alpha-beta-tictactoe", "crc-error-detection"],
      completedProblems: [],
      quizScores: {
        "stack-operations": { score: 3, total: 5, timestamp: new Date(Date.now() - 3600000 * 15).toISOString() },
        "minimax-alpha-beta-tictactoe": { score: 4, total: 5, timestamp: new Date(Date.now() - 3600000 * 25).toISOString() },
        "crc-error-detection": { score: 5, total: 5, timestamp: new Date(Date.now() - 3600000 * 42).toISOString() }
      },
      feedbacks: {},
      createdAt: "2026-02-10T14:20:00Z",
      lastActive: new Date(Date.now() - 3600000 * 20).toISOString()
    }
  ];
}

