import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  ExternalLink,
  Calendar,
  User,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { blogService } from '../../services/blogService';
import { BlogPost } from '../../types';

export const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [deleteBlogTarget, setDeleteBlogTarget] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const list = await blogService.getBlogs({ status: 'all' });
      setBlogs(list);
    } catch (err) {
      console.error('Failed to load blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteBlogTarget) return;
    setIsDeleting(true);
    try {
      const res = await blogService.deleteBlog(deleteBlogTarget.id);
      if (res.success) {
        setBlogs((prev) => prev.filter((b) => b.id !== deleteBlogTarget.id));
        setDeleteBlogTarget(null);
      } else {
        alert(res.error || 'Failed to delete blog post');
      }
    } catch (err: any) {
      alert(err.message || 'Error deleting blog');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      (b.excerpt && b.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-emerald-400" />
              Blog &amp; Articles Management
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Publish news, wholesale guides, cleaning tips, and product spotlights.
            </p>
          </div>

          <Link
            to="/admin/blogs/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-600/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Write New Post
          </Link>
        </div>

        {/* Search */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search blog articles by title or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Blogs List */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-slate-400">Loading articles...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-16 text-center">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-300">No blog posts found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No articles yet. Click "Write New Post" to publish your first store update!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-slate-900/80 text-slate-400 border-b border-slate-800 tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Article</th>
                    <th className="py-3.5 px-4 font-semibold">Author</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold">Date</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredBlogs.map((post) => {
                    const isDraft = post.status === 'draft';
                    return (
                      <tr key={post.id} className="hover:bg-slate-900/40 transition-colors group">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3.5 max-w-md">
                            {post.featuredImage && (
                              <img
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-12 h-12 rounded-xl object-cover bg-slate-800 flex-shrink-0 border border-slate-800"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            )}
                            <div className="overflow-hidden">
                              <p className="font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                                {post.title}
                              </p>
                              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                                {post.excerpt || post.content.slice(0, 80)}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="flex items-center gap-1.5 text-xs text-slate-300">
                            <User className="w-3.5 h-3.5 text-slate-500" />
                            {post.authorName || 'Admin'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          {isDraft ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              <Clock className="w-3 h-3" />
                              Draft
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <CheckCircle className="w-3 h-3" />
                              Published
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.publishedAt || post.createdAt || Date.now()).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/blogs/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View on live website"
                              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

                            <Link
                              to={`/admin/blogs/${post.id}/edit`}
                              title="Edit post"
                              className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Link>

                            <button
                              onClick={() => setDeleteBlogTarget(post)}
                              title="Delete post"
                              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteBlogTarget}
        title="Delete Blog Post"
        message={`Are you sure you want to permanently delete "${deleteBlogTarget?.title}"?`}
        confirmLabel="Delete Post"
        isDestructive={true}
        loading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteBlogTarget(null)}
      />
    </AdminLayout>
  );
};
