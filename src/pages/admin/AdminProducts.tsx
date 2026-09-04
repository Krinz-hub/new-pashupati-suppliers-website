import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Star,
  ExternalLink,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { Product, Category } from '../../types';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Deletion modal
  const [deleteProductTarget, setDeleteProductTarget] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([
        productService.getProducts({ status: 'all' }),
        categoryService.getAllCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      console.error('Failed to load products list:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteProductTarget) return;
    setIsDeleting(true);
    try {
      const res = await productService.deleteProduct(deleteProductTarget.id);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p.id !== deleteProductTarget.id));
        setDeleteProductTarget(null);
      } else {
        alert(res.error || 'Failed to delete product');
      }
    } catch (err: any) {
      alert(err.message || 'Error deleting product');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        product.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (product as any).categoryId === selectedCategory;

      const matchesStatus =
        selectedStatus === 'all' || (product.status || 'published') === selectedStatus;

      const matchesSearch =
        !search.trim() ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [products, selectedCategory, selectedStatus, search]);

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Package className="w-7 h-7 text-brandRed" />
              Products Management
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Add, update, filter, publish, or remove items from your wholesale and retail catalog.
            </p>
          </div>

          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-brandRed hover:bg-brandRed-dark rounded-xl shadow-lg shadow-brandRed/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </Link>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by product name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brandRed"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug || c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brandRed"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-brandRed border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-slate-400">Loading catalog...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center">
              <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-300">No products found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No items match your current filter criteria. Try resetting your search query or add a new product.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-slate-900/80 text-slate-400 border-b border-slate-800 tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Product</th>
                    <th className="py-3.5 px-4 font-semibold">Category</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold">Featured</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((product) => {
                    const isDraft = product.status === 'draft';
                    return (
                      <tr
                        key={product.id}
                        className="hover:bg-slate-900/40 transition-colors group"
                      >
                        {/* Name & Image */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3.5 max-w-md">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-xl object-cover bg-slate-800 flex-shrink-0 border border-slate-800"
                              onError={(e) => {
                                (e.target as HTMLElement).style.opacity = '0.3';
                              }}
                            />
                            <div className="overflow-hidden">
                              <p className="font-bold text-white group-hover:text-brandRed transition-colors line-clamp-1">
                                {product.name}
                              </p>
                              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 text-slate-200 uppercase tracking-wider">
                            {product.category}
                          </span>
                        </td>

                        {/* Status */}
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

                        {/* Featured */}
                        <td className="py-3.5 px-4">
                          {product.featured ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-brandGold">
                              <Star className="w-4 h-4 fill-brandGold" />
                              Featured
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500">—</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/products?category=${product.category}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View on live store"
                              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

                            <Link
                              to={`/admin/products/${product.id}/edit`}
                              title="Edit product"
                              className="p-2 text-slate-400 hover:text-brandGold hover:bg-slate-800 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Link>

                            <button
                              onClick={() => setDeleteProductTarget(product)}
                              title="Delete product"
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

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteProductTarget}
        title="Delete Product"
        message={`Are you sure you want to permanently delete "${deleteProductTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete Product"
        isDestructive={true}
        loading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteProductTarget(null)}
      />
    </AdminLayout>
  );
};
