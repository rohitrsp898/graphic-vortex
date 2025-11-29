import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { uploadProject } from '../services/projectService';
import { Lock, Loader2, Plus, LogOut, Link as LinkIcon, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { getDriveDirectLink } from '../constants';

export const Admin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form States
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [tools, setTools] = useState('');
  const [tags, setTags] = useState('');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [successMsg, setSuccessMsg] = useState('');

  // Derived state for preview
  const [previewLink, setPreviewLink] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (imageLink) {
        setPreviewLink(getDriveDirectLink(imageLink));
    } else {
        setPreviewLink('');
    }
  }, [imageLink]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageLink || !title || !category) {
      setError("Please fill in required fields and provide an image link.");
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      await uploadProject(imageLink, {
        title,
        category,
        description,
        tools: tools.split(',').map(t => t.trim()),
        tags: tags.split(',').map(t => t.trim()),
        orientation,
        year: new Date().getFullYear().toString()
      });

      setSuccessMsg("Project uploaded successfully!");
      // Reset form
      setTitle('');
      setDescription('');
      setImageLink('');
      setTools('');
      setTags('');
    } catch (err) {
      console.error(err);
      setError("Failed to upload project.");
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => {
      window.location.hash = '';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl relative">
          <button
            onClick={goHome}
            className="absolute top-4 right-4 text-neutral-500 hover:text-white"
          >
            <Home className="w-5 h-5" />
          </button>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white">Admin Access</h2>
            <p className="text-neutral-400">Login to manage your portfolio</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none"
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none"
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-violet-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto"/> : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 p-6 pt-24">
      <div className="container mx-auto max-w-2xl">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-white">Add New Project</h1>
            <div className="flex gap-4">
                <button
                    onClick={goHome}
                    className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                >
                    <Home className="w-4 h-4" /> View Site
                </button>
                <button
                    onClick={() => signOut(auth)}
                    className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                >
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </div>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8"
        >
            <form onSubmit={handleUpload} className="space-y-6">
                {/* Image Link Input */}
                <div>
                     <label className="block text-sm text-neutral-400 mb-2">Google Drive Image Link</label>
                     <div className="relative">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Paste Google Drive sharing link here..."
                            value={imageLink}
                            onChange={(e) => setImageLink(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-12 pr-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none"
                        />
                     </div>
                     <p className="text-xs text-neutral-500 mt-2">
                        Upload to Google Drive → Right Click → Share → Copy Link.
                     </p>
                </div>

                {/* Preview */}
                {previewLink && (
                    <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-center">
                        <p className="text-sm text-neutral-400 mb-2">Preview:</p>
                        <img src={previewLink} alt="Preview" className="h-48 mx-auto rounded-lg object-contain" />
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Project Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none"
                    />
                     <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none"
                    >
                        <option value="">Select Category</option>
                        <option value="Science Illustration">Science Illustration</option>
                        <option value="Food Advertisement">Food Advertisement</option>
                        <option value="Product Advertisement">Product Advertisement</option>
                        <option value="Brand Advertisement">Brand Advertisement</option>
                        <option value="Fantasy Illustration">Fantasy Illustration</option>
                        <option value="Movie Poster">Movie Poster</option>
                    </select>
                </div>

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none resize-none"
                />

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Tools (comma separated)"
                        value={tools}
                        onChange={(e) => setTools(e.target.value)}
                        className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-primary outline-none"
                    />
                </div>

                {error && <p className="text-red-500 bg-red-500/10 p-3 rounded-lg text-sm">{error}</p>}
                {successMsg && <p className="text-green-500 bg-green-500/10 p-3 rounded-lg text-sm">{successMsg}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-violet-600 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : <><Plus className="w-5 h-5"/> Add Project</>}
                </button>
            </form>
        </motion.div>
      </div>
    </div>
  );
};