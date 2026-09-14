"use client";

import { useState, useEffect } from "react";
import { Lock, LogOut, ShieldCheck, UploadCloud, Trash2, Edit3, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminUploadPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(false);

  // Projects list state
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Embedded Systems");
  const [summary, setSummary] = useState("");
  const [challenge, setChallenge] = useState("");
  const [solution, setSolution] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjectsList(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/check");
        if (res.ok) {
          setIsAuthenticated(true);
          fetchProjects();
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");
    setLoadingAuth(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        fetchProjects();
      } else {
        setPinError("Invalid Admin PIN / Password. Access Denied.");
      }
    } catch {
      setPinError("Connection error. Try again.");
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setPinInput("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setImageUrls((prev) => [...prev, data.url]);
    }
    setUploading(false);
  };

  const startEdit = (p: any) => {
    setEditingId(p.id);
    setTitle(p.title);
    setCategory(p.category);
    setSummary(p.summary || "");
    setChallenge(p.challenge || "");
    setSolution(p.solution || "");
    setImageUrls(p.images || []);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setSummary("");
    setChallenge("");
    setSolution("");
    setImageUrls([]);
    setStatus("");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const res = await fetch("/api/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setProjectsList((prev) => prev.filter((p) => p.id !== id));
      if (editingId === id) cancelEdit();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(editingId ? "Updating project..." : "Saving project...");

    const method = editingId ? "PUT" : "POST";
    const bodyPayload = {
      ...(editingId ? { id: editingId } : {}),
      title,
      category,
      summary,
      challenge,
      solution,
      images: imageUrls,
      published: true,
    };

    const res = await fetch("/api/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyPayload),
    });

    if (res.ok) {
      setStatus(editingId ? "Project updated successfully!" : "Project published successfully!");
      cancelEdit();
      fetchProjects();
    } else {
      setStatus("Error saving project.");
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-mono text-sm">
        Verifying authorization...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto mb-4 border border-sky-500/20">
            <Lock size={22} />
          </div>
          <h2 className="text-xl font-bold text-center text-white">Admin Authentication</h2>
          <p className="text-xs text-slate-400 text-center mt-1 mb-6">
            Enter private PIN to manage portfolio case studies.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin PIN / Password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-center tracking-widest text-lg text-white focus:outline-none focus:border-sky-500"
              autoFocus
              required
            />
            {pinError && <p className="text-xs text-rose-400 text-center font-mono">{pinError}</p>}
            <button
              type="submit"
              disabled={loadingAuth}
              className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-3 rounded-lg transition text-sm disabled:opacity-50"
            >
              {loadingAuth ? "Verifying..." : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-slate-400 hover:text-white transition flex items-center gap-1 text-xs font-mono mr-2">
              <ArrowLeft size={14} /> Back to Site
            </Link>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck size={20} className="text-sky-400" /> CMS Console
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-mono transition bg-rose-500/10 px-3 py-1.5 rounded-md border border-rose-500/20"
          >
            <LogOut size={14} /> Exit
          </button>
        </div>

        {/* Project Form (Create / Edit) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-sky-400">
              {editingId ? "Update Project Case Study" : "Add New Project"}
            </h2>
            {editingId && (
              <button
                onClick={cancelEdit}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded"
              >
                <X size={12} /> Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase text-slate-400 mb-1 font-mono">Project Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white focus:border-sky-500 focus:outline-none text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-400 mb-1 font-mono">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white focus:border-sky-500 focus:outline-none text-sm"
              >
                <option>Embedded Systems</option>
                <option>CAD & Prototyping</option>
                <option>TinyML / Edge AI</option>
                <option>Industrial Automation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-400 mb-1 font-mono">Upload Project Images</label>
              <input
                type="file"
                onChange={handleFileUpload}
                className="w-full text-slate-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sky-500 file:text-slate-950 hover:file:bg-sky-400 file:cursor-pointer"
              />
              {uploading && <p className="text-xs text-amber-400 mt-1 font-mono">Uploading image...</p>}
              
              <div className="flex gap-3 mt-3 flex-wrap">
                {imageUrls.map((url, i) => (
                  <div key={i} className="relative group">
                    <img src={url} alt="Upload Preview" className="w-20 h-20 object-cover rounded-lg border border-slate-700" />
                    <button
                      type="button"
                      onClick={() => setImageUrls(imageUrls.filter((_, idx) => idx !== i))}
                      className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-400 mb-1 font-mono">Summary</label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-white h-20 text-sm focus:border-sky-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-400 mb-1 font-mono">Engineering Challenge</label>
              <textarea
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-white h-20 text-sm focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-400 mb-1 font-mono">Solution & Architecture</label>
              <textarea
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-white h-20 text-sm focus:border-sky-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-3 rounded-lg transition text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
            >
              <UploadCloud size={18} /> {editingId ? "Update Project" : "Publish Project"}
            </button>

            {status && <p className="text-sm font-medium text-emerald-400 mt-2 font-mono text-center">{status}</p>}
          </form>
        </div>

        {/* Existing Projects Management List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold mb-4 text-white flex items-center justify-between">
            <span>Manage Existing Projects</span>
            <span className="text-xs font-mono text-slate-400">{projectsList.length} items</span>
          </h2>

          <div className="divide-y divide-slate-800">
            {projectsList.map((project) => (
              <div key={project.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-white">{project.title}</h4>
                  <p className="text-xs text-sky-400 font-mono mt-0.5">{project.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(project)}
                    className="p-2 text-sky-400 hover:bg-sky-500/10 rounded-lg border border-sky-500/20 transition"
                    title="Edit project"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg border border-rose-500/20 transition"
                    title="Delete project"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}