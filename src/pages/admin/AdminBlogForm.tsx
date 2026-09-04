import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { MediaPickerModal } from '../../components/admin/MediaPickerModal';
import { blogService } from '../../services/blogService';
import { categoryService } from '../../services/categoryService';
import { Category, BlogFormData } from '../../types';

export const AdminBlogForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '/assets/banner.png',
    categoryId: '',
    status: 'published',
    seoTitle: '',
    seoDescription: '',
  });

  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(isEditing);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const cats = await categoryService.getAllCategories();
        setCategories(cats);

        if (isEditing && id) {
          const blog = await blogService.getBlog(id);
          if (blog) {
            setFormData({
              title: blog.title,
              slug: blog.slug,
              excerpt: blog.excerpt || '',
              content: blog.content,
              featuredImage: blog.featuredImage || '',
              categoryId: blog.categoryId || '',
              status: blog.status,
              seoTitle: blog.seoTitle || blog.title,
              seoDescription: blog.seoDescription || blog.excerpt,
            });
          } else {
            setError('Blog post not found');
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load blog data');
      } finally {
        setFetching(false);
      }
    };

    init();
  }, [id, isEditing]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (!isEditing || !formData.slug) {
      const autoSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      setFormData((prev) => ({
        ...prev,
        title: newTitle,
        slug: autoSlug,
        seoTitle: newTitle,
      }));
    } else {
      setFormData((prev) => ({ ...prev, title: newTitle }));
    }
  };

  const handleSubmit = async (e: React.FormEvent, overrideStatus?: 'published' | 'draft') => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    const submissionData = {
      ...formData,
      status: overrideStatus || formData.status,
    };

    try {
      if (isEditing && id) {
        const res = await blogService.updateBlog(id, submissionData);
        if (res.success) {
          setSuccessMsg('Blog post updated successfully!');
          setTimeout(() => navigate('/admin/blogs'), 1000);
        } else {
          setError(res.error || 'Failed to update blog post');
        }
      } else {
        const res = await blogService.createBlog(submissionData);
        if (res.success) {
          setSuccessMsg('Blog post published successfully!');
          setTimeout(() => navigate('/admin/blogs'), 1000);
        } else {
          setError(res.error || 'Failed to create blog post');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 max-w-4xl w-full mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link
            to="/admin/blogs"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog List
          </Link>
          <span className="text-xs text-slate-500 font-mono">
            {isEditing ? `Editing Post ID: ${id}` : 'Writing New Post'}
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isEditing ? 'Edit Blog Post' : 'Create Blog Post'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Share news, industry updates, and household supply guides with your customers.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-400 text-sm">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Info */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Article Content
            </h2>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. Essential Household Cookware Guide for Every Family"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Slug & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="essential-cookware-guide"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Category (Optional)
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">No Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Summary Excerpt
              </label>
              <textarea
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="A brief 1-2 sentence preview for cards and social shares..."
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Full Body / Content */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Full Article Body *
                </label>
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                >
                  {previewMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {previewMode ? 'Edit Mode' : 'Preview Mode'}
                </button>
              </div>

              {previewMode ? (
                <div className="w-full p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-200 text-sm prose prose-invert max-w-none min-h-[250px] whitespace-pre-wrap">
                  {formData.content || '(No content written yet)'}
                </div>
              ) : (
                <textarea
                  rows={10}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write the full content of your article here. Supports paragraphs and line breaks..."
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Cover / Featured Image
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-40 h-24 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                {formData.featuredImage ? (
                  <img
                    src={formData.featuredImage}
                    alt="Cover Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.opacity = '0.3';
                    }}
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-600" />
                )}
              </div>

              <div className="flex-1 space-y-2 w-full">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                    placeholder="/assets/banner.png or media URL"
                    className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerOpen(true)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    Browse Media
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SEO & Publishing */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Publishing Options
            </h2>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={formData.status === 'published'}
                  onChange={() => setFormData({ ...formData, status: 'published' })}
                  className="text-emerald-500 focus:ring-emerald-500"
                />
                <span>Published (Live)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={() => setFormData({ ...formData, status: 'draft' })}
                  className="text-emerald-500 focus:ring-emerald-500"
                />
                <span>Draft (Hidden)</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'draft')}
              disabled={loading}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold transition-all disabled:opacity-50"
            >
              Save as Draft
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving Post...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? 'Save Changes' : 'Publish Article'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url) => setFormData({ ...formData, featuredImage: url })}
        title="Select Cover Image"
      />
    </AdminLayout>
  );
};
