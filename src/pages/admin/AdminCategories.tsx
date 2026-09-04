import React, { useState, useEffect } from 'react';
import {
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle,
  Package,
  Image as ImageIcon,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { MediaPickerModal } from '../../components/admin/MediaPickerModal';
import { categoryService } from '../../services/categoryService';
import { Category, CategoryFormData } from '../../types';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form modal state
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
    image: '/assets/categories/kitchen.jpg',
    iconName: 'Layers',
  });
  const [saving, setSaving] = useState<boolean>(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState<boolean>(false);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const list = await categoryService.getAllCategories();
      setCategories(list);
    } catch (err: any) {
      setError(err.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: '/assets/categories/general.jpg',
      iconName: 'Layers',
    });
    setFormOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || '/assets/categories/general.jpg',
      iconName: cat.iconName || 'Layers',
    });
    setFormOpen(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (!editingCategory) {
      const autoSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData((prev) => ({ ...prev, name, slug: autoSlug }));
    } else {
      setFormData((prev) => ({ ...prev, name }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (editingCategory) {
        const res = await categoryService.updateCategory(editingCategory.id, formData);
        if (res.success) {
          setSuccessMsg('Category updated successfully');
          setFormOpen(false);
          await loadCategories();
        } else {
          setError(res.error || 'Failed to update category');
        }
      } else {
        const res = await categoryService.createCategory(formData);
        if (res.success) {
          setSuccessMsg('Category created successfully');
          setFormOpen(false);
          await loadCategories();
        } else {
          setError(res.error || 'Failed to create category');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error saving category');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await categoryService.deleteCategory(deleteTarget.id);
      if (res.success) {
        setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
        setDeleteTarget(null);
        setSuccessMsg('Category deleted');
      } else {
        alert(res.error || 'Cannot delete category');
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete category');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <FolderTree className="w-7 h-7 text-brandGold" />
              Category Management
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Organize products into intuitive store aisles and product catalog groups.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-brandRed hover:bg-brandRed-dark rounded-xl shadow-lg shadow-brandRed/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Add New Category
          </button>
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

        {/* Categories Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-brandGold border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-400">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="py-16 text-center bg-slate-950/60 border border-slate-800 rounded-3xl">
            <FolderTree className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-300">No categories found</h3>
            <p className="text-xs text-slate-500 mt-1">Click "Add New Category" to create one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-slate-950/60 border border-slate-800 rounded-3xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex-shrink-0">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(category)}
                        title="Edit category"
                        className="p-2 text-slate-400 hover:text-brandGold hover:bg-slate-900 rounded-xl transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(category)}
                        title="Delete category"
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-base font-bold text-white group-hover:text-brandGold transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 mt-0.5">/{category.slug}</p>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                      {category.description || 'No description provided.'}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium text-slate-300">
                    <Package className="w-3.5 h-3.5 text-brandGold" />
                    {category.productCount ?? 0} Product(s)
                  </span>
                  <span className="text-[11px] bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800 text-slate-400 font-mono">
                    {category.iconName || 'Layers'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Add/Edit Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="e.g. Kitchenware"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="kitchenware"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brandGold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Image Path / URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/assets/categories/kitchen.jpg"
                    className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerOpen(true)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1"
                  >
                    <ImageIcon className="w-4 h-4 text-brandGold" />
                    Browse
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short description of items in this category..."
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-brandGold"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-brandRed hover:bg-brandRed-dark rounded-xl shadow-md transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Category"
        message={`Are you sure you want to delete the "${deleteTarget?.name}" category? Please make sure no active products are assigned to this category.`}
        confirmLabel="Delete Category"
        isDestructive={true}
        loading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url) => setFormData({ ...formData, image: url })}
        title="Select Category Image"
      />
    </AdminLayout>
  );
};
