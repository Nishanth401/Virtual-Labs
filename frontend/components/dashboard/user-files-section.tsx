"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import {
  UserFolder,
  UserFile,
  getUserFolders,
  addUserFolder,
  deleteUserFolder,
  getUserFiles,
  addUserFile,
  deleteUserFile
} from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  FolderPlus,
  FilePlus,
  Folder,
  FileText,
  Trash2,
  Download,
  FileCode,
  FileSpreadsheet,
  Layers,
  Sparkles,
  Loader2,
  FolderOpen
} from "lucide-react";

export function UserFilesSection() {
  const { user } = useAuth();
  const uid = user?.uid || "guest_student";

  const [folders, setFolders] = useState<UserFolder[]>([]);
  const [files, setFiles] = useState<UserFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFolderId, setSelectedFolderId] = useState<string>("all");

  // Modals state
  const [newFolderOpen, setNewFolderOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folderSubmitting, setFolderSubmitting] = useState(false);

  const [newFileOpen, setNewFileOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileFolderId, setFileFolderId] = useState("");
  const [fileSize, setFileSize] = useState("1.5 MB");
  const [fileType, setFileType] = useState("PDF");
  const [fileSubmitting, setFileSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const [fList, filesList] = await Promise.all([
          getUserFolders(uid),
          getUserFiles(uid)
        ]);
        if (mounted) {
          setFolders(fList);
          setFiles(filesList);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadData();
    return () => { mounted = false; };
  }, [uid]);

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    setFolderSubmitting(true);
    try {
      const created = await addUserFolder(uid, folderName.trim());
      setFolders((prev) => [...prev, created]);
      setFolderName("");
      setNewFolderOpen(false);
    } finally {
      setFolderSubmitting(false);
    }
  };

  const handleCreateFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;
    setFileSubmitting(true);
    try {
      const created = await addUserFile(uid, {
        name: fileName.trim(),
        folderId: fileFolderId || undefined,
        size: fileSize || "1.0 MB",
        type: fileType || "PDF"
      });
      setFiles((prev) => [...prev, created]);
      setFileName("");
      setNewFileOpen(false);
    } finally {
      setFileSubmitting(false);
    }
  };

  const handleDeleteFolder = async (id: string) => {
    setFolders((prev) => prev.filter((f) => f.id !== id));
    if (selectedFolderId === id) setSelectedFolderId("all");
    await deleteUserFolder(uid, id);
  };

  const handleDeleteFile = async (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    await deleteUserFile(uid, id);
  };

  const filteredFiles = selectedFolderId === "all"
    ? files
    : files.filter((f) => f.folderId === selectedFolderId);

  return (
    <Card className="rounded-2xl border border-secondary/40 bg-card/70 backdrop-blur-md shadow-xs overflow-hidden">
      <CardHeader className="p-5 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] font-mono uppercase bg-primary/10 text-primary border-primary/20">
              Lab Storage &amp; Documents
            </Badge>
          </div>
          <CardTitle className="text-lg font-bold font-heading text-foreground mt-1 flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            <span>My Lab Files &amp; Manuals</span>
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Manage your lab PDFs, observation sheets, code submissions, and reference datasets.
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setNewFolderOpen(true)}
            className="text-xs font-semibold gap-1.5 h-8 border-border hover:bg-muted"
          >
            <FolderPlus className="h-3.5 w-3.5 text-primary" />
            <span>New Folder</span>
          </Button>

          <Button
            size="sm"
            onClick={() => setNewFileOpen(true)}
            className="text-xs font-bold gap-1.5 h-8 bg-primary hover:bg-primary/90 text-white shadow-xs"
          >
            <FilePlus className="h-3.5 w-3.5" />
            <span>Add File</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-xs text-muted-foreground font-mono">Syncing lab files with Firestore...</p>
          </div>
        ) : (
          <>
            {/* Folders Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              <button
                type="button"
                onClick={() => setSelectedFolderId("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  selectedFolderId === "all"
                    ? "bg-primary text-white shadow-xs"
                    : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>All Files ({files.length})</span>
              </button>

              {folders.map((f) => (
                <div
                  key={f.id}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 cursor-pointer group ${
                    selectedFolderId === f.id
                      ? "bg-primary text-white shadow-xs"
                      : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setSelectedFolderId(f.id)}
                >
                  <Folder className="h-3.5 w-3.5" />
                  <span>{f.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFolder(f.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 hover:text-rose-400 transition-opacity ml-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Files List */}
            {filteredFiles.length === 0 ? (
              <div className="py-10 border border-dashed border-border/80 rounded-xl text-center space-y-2 bg-muted/20">
                <FileText className="h-8 w-8 text-muted-foreground/60 mx-auto" />
                <p className="text-xs font-semibold text-foreground">No files in this folder yet</p>
                <p className="text-[11px] text-muted-foreground max-w-xs mx-auto">
                  Click &ldquo;Add File&rdquo; to attach your lab observation manual, dataset or source code.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-3.5 rounded-xl border border-border/60 bg-card hover:border-primary/50 transition-all shadow-xs flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                        {file.type === "Code" ? (
                          <FileCode className="h-4 w-4" />
                        ) : file.type === "Dataset" ? (
                          <FileSpreadsheet className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <h4 className="text-xs font-bold text-foreground truncate font-sans group-hover:text-primary transition-colors">
                          {file.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                          <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3.5">
                            {file.type || "PDF"}
                          </Badge>
                          <span>{file.size}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 rounded-lg"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>

      {/* In-App Modal: New Folder */}
      <Dialog open={newFolderOpen} onOpenChange={setNewFolderOpen}>
        <DialogContent className="max-w-sm p-5 bg-card/95 backdrop-blur-xl border border-border rounded-2xl">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-base font-bold font-heading text-foreground">
              Create New Folder
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Enter a name for your lab directory (e.g. &ldquo;Algorithms Lab Manuals&rdquo;).
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateFolder} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Folder Name</Label>
              <Input
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="e.g. ML Datasets & Observations"
                className="text-xs"
                required
                autoFocus
              />
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setNewFolderOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={folderSubmitting || !folderName.trim()}
                className="text-xs bg-primary text-white font-bold"
              >
                {folderSubmitting ? "Creating..." : "Create Folder"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* In-App Modal: Add File */}
      <Dialog open={newFileOpen} onOpenChange={setNewFileOpen}>
        <DialogContent className="max-w-md p-5 bg-card/95 backdrop-blur-xl border border-border rounded-2xl">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-base font-bold font-heading text-foreground">
              Add Lab File / Document
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Save metadata for lab PDFs, notes, or datasets under your account.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateFile} className="space-y-3 pt-2">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">File Name</Label>
              <Input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="e.g. Stack_Queue_Experiment_3.pdf"
                className="text-xs"
                required
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Folder Category</Label>
                <select
                  value={fileFolderId}
                  onChange={(e) => setFileFolderId(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">(Root / Unassigned)</option>
                  {folders.map((f) => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">File Type</Label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="PDF">PDF Document</option>
                  <option value="Code">Java / Python Code</option>
                  <option value="Dataset">CSV / Dataset</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Estimated File Size</Label>
              <Input
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="e.g. 2.4 MB"
                className="text-xs"
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setNewFileOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={fileSubmitting || !fileName.trim()}
                className="text-xs bg-primary text-white font-bold"
              >
                {fileSubmitting ? "Saving..." : "Save File Record"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
