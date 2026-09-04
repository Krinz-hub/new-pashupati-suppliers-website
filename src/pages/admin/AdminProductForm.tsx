import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { MediaPickerModal } from '../../components/admin/MediaPickerModal';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { Category, ProductFormData } from '../../types';

export const AdminProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    slug: '',
    category: 'kitchen',
    categoryId: 'kitchen',
    description: '',
    shortDescription: '',
    image: '/assets/products/cooking-pot.jpg',
    featured: false,
    status: 'published',
    seoTitle: '',
    seoDescription: '',
  });

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
          const product = await productService.getProduct(id);
          if (product) {
            setFormData({
              name: product.name,
              slug: product.slug || product.id,
              category: product.category,
              categoryId: product.categoryId || product.category,
              description: product.description || '',
              shortDescription: product.shortDescription || product.description || '',
              image: product.image,
              featured: Boolean(product.featured),
              status: product.status || 'published',
              seoTitle: product.seoTitle || product.name,
              seoDescription: product.seoDescription || product.description,
            });
          } else {
            setError('Product not found');
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load initial data');
      } finally {
        setFetching(false);
      }
    };

    init();
  }, [id, isEditing]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (!isEditing || !formData.slug) {
      const autoSlug = newName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      setFormData((prev) => ({
        ...prev,
        name: newName,
        slug: autoSlug,
        seoTitle: newName,
      }));
    } else {
      setFormData((prev) => ({ ...prev, name: newName }));
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
        const res = await productService.updateProduct(id, submissionData);
        if (res.success) {
          setSuccessMsg('Product updated successfully!');
          setTimeout(() => navigate('/admin/products'), 1000);
        } else {
          setError(res.error || 'Failed to update product');
        }
      } else {
        const res = await productService.createProduct(submissionData);
        if (res.success) {
          setSuccessMsg('Product created successfully!');
          setTimeout(() => navigate('/admin/products'), 1000);
        } else {
          setError(res.error || 'Failed to create product');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-brandRed border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 max-w-4xl w-full mx-auto space-y-6">
        {/* Top bar & back button */}
        <div className="flex items-center justify-between">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products List
          </Link>
          <span className="text-xs text-slate-500 font-mono">
            {isEditing ? `Editing Product ID: ${id}` : 'Creating New Product'}
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Fill in the details below to update your live website catalog.
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
          {/* Main Card */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              General Information
            </h2>

            {/* Product Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. Stainless Steel Heavy Cooking Pot"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brandRed"
              />
            </div>

            {/* Slug & Category Row */}
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
                  placeholder="stainless-steel-cooking-pot"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brandRed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  value={formData.categoryId || formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      categoryId: e.target.value,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandRed"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug || cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Product Description *
              </label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed specifications, material grade, features, and utility..."
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brandRed"
              />
            </div>
          </div>

          {/* Media & Image Card */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Product Image
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Preview Thumbnail */}
              <div className="w-32 h-32 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex-shrink-0 flex items-center justify-center relative group">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.name || 'Preview'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.opacity = '0.3';
                    }}
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-600" />
                )}
              </div>

              {/* URL Input & Selector */}
              <div className="flex-1 space-y-3 w-full">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Image URL or Path *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/assets/products/cooking-pot.jpg or https://..."
                      className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brandRed"
                    />
                    <button
                      type="button"
                      onClick={() => setMediaPickerOpen(true)}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors whitespace-nowrap"
                    >
                      <ImageIcon className="w-4 h-4 text-brandGold" />
                      Browse Media
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Select an existing catalog image or upload a fresh photo from your device.
                </p>
              </div>
            </div>
          </div>

          {/* Visibility & Settings Card */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Publishing & Status
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Status Radio */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Publication Status
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={formData.status === 'published'}
                      onChange={() => setFormData({ ...formData, status: 'published' })}
                      className="text-brandRed focus:ring-brandRed"
                    />
                    <span>Published</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={formData.status === 'draft'}
                      onChange={() => setFormData({ ...formData, status: 'draft' })}
                      className="text-brandRed focus:ring-brandRed"
                    />
                    <span>Draft (Hidden)</span>
                  </label>
                </div>
              </div>

              {/* Featured Checkbox */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Storefront Highlight
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-brandRed focus:ring-brandRed bg-slate-900 border-slate-800"
                  />
                  <span className="flex items-center gap-1.5 font-semibold text-brandGold">
                    <Sparkles className="w-4 h-4" />
                    Feature this product on homepage
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* SEO Metadata Card */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              SEO Metadata (Optional)
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                SEO Title
              </label>
              <input
                type="text"
                value={formData.seoTitle || ''}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                placeholder="Custom browser page title"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brandRed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                SEO Meta Description
              </label>
              <textarea
                rows={2}
                value={formData.seoDescription || ''}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                placeholder="Meta summary for search engines (Google, Bing)..."
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brandRed"
              />
            </div>
          </div>

          {/* Submit Actions */}
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
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brandRed hover:bg-brandRed-dark text-white text-sm font-bold shadow-lg shadow-brandRed/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving Product...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? 'Save Changes' : 'Publish Product'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url) => setFormData({ ...formData, image: url })}
        title="Select Product Image"
      />
    </AdminLayout>
  );
};
