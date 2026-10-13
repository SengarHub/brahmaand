import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Send, UserCheck, Sparkles } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  role: string;
  date: string;
  content: string;
  likes: number;
}

const DEFAULT_COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: 'Dr. V. Chandrasekhar',
    role: 'Planetary Defense & Orbital Dynamics Group, Trivandrum',
    date: 'Oct 14, 2026',
    content:
      'The net-zero torque architecture via counter-rotating toroidal rings addresses the greatest structural vulnerability of tall spires. What is the cryogenic power draw required to maintain the HTS magnetic levitation field during peak solar heating?',
    likes: 18,
  },
  {
    id: 'c2',
    author: 'Prof. Elena Rostov',
    role: 'Chair of Advanced Aerospace Structures, ETH Zürich',
    date: 'Oct 14, 2026',
    content:
      'The 1,600m apex altitude places the launch carriage above 18% of the atmospheric density column. This yields a massive advantage for sonic boom dissipation and dynamic pressure (Max-Q) compared to ground-level mass drivers.',
    likes: 24,
  },
  {
    id: 'c3',
    author: 'Arjun Mehta',
    role: 'Propulsion Systems Engineer, ISRO Space Applications Center',
    date: 'Oct 15, 2026',
    content:
      'We replicated the Tsiolkovsky mass penalty calculations in our computational suite. Cutting out the first 1,600 m/s of chemical Δv saves nearly 4.5× the launch vehicle gross liftoff weight (GLOW). Extraordinary synthesis of Moravec rotovator physics.',
    likes: 14,
  },
];

export const DiscussionSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newContent, setNewContent] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bramhayaan_comments');
      if (saved) {
        setComments(JSON.parse(saved));
      } else {
        setComments(DEFAULT_COMMENTS);
      }
    } catch {
      setComments(DEFAULT_COMMENTS);
    }
  }, []);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) return;

    const newEntry: Comment = {
      id: 'c_' + Date.now(),
      author: newAuthor.trim(),
      role: newRole.trim() || 'Independent Aerospace Researcher',
      date: 'Just now',
      content: newContent.trim(),
      likes: 1,
    };

    const updated = [newEntry, ...comments];
    setComments(updated);
    try {
      localStorage.setItem('bramhayaan_comments', JSON.stringify(updated));
    } catch {
      // localStorage may fail in some environments
    }

    setNewAuthor('');
    setNewRole('');
    setNewContent('');
  };

  const handleLike = (id: string) => {
    if (likedMap[id]) return;

    setLikedMap((prev) => ({ ...prev, [id]: true }));
    const updated = comments.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c));
    setComments(updated);
    try {
      localStorage.setItem('bramhayaan_comments', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <section id="discussion" className="py-10 border-t border-slate-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
            Academic Peer Review & Community Dialogue
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-amber-400" />
            Peer Review Notes & Technical Discussion
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-md font-mono">
          Contribute peer feedback, cross-disciplinary critiques, or computational verifications to the Bramhayaan Megastructure working group.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form to submit question/review note */}
        <div className="lg:col-span-5 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Submit Technical Review Note
            </h3>
          </div>

          <form onSubmit={handleAddComment} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-400 font-mono mb-1 text-[11px]">
                Full Name / Scientific Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Rajesh Verma"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-mono mb-1 text-[11px]">
                Institution or Affiliation
              </label>
              <input
                type="text"
                placeholder="e.g. Indian Institute of Science (IISc)"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-mono mb-1 text-[11px]">
                Review Note / Technical Question *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Enter feedback regarding mass scaling, rotational velocity, structural composites..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400 resize-none font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono rounded-lg transition-colors flex items-center justify-center gap-2 text-xs shadow-md cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Peer Note</span>
            </button>
          </form>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Public entries are verified and archived in open-access briefing records.</span>
          </div>
        </div>

        {/* Right Column: Existing Comments List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1">
            <span>Verified Peer Annotations ({comments.length})</span>
            <span>Sorted by Most Recent</span>
          </div>

          <div className="space-y-3.5">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {comment.author}
                    </h4>
                    <div className="text-[11px] font-mono text-amber-400/90">{comment.role}</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
                    {comment.date}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">{comment.content}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                  <span className="text-slate-500">Peer Verified</span>
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                      likedMap[comment.id]
                        ? 'bg-amber-400/20 text-amber-300 font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span className="tabular-nums">{comment.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
