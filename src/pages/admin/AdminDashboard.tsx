import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  BookOpen,
  FolderTree,
  Image as ImageIcon,
  Plus,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiClient } from '../../services/apiClient';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>({
    totalProducts: 0,
    publishedProducts: 0,
    draftProducts: 0,
    featuredProducts: 0,
    totalCategories: 0,
    totalBlogs: 0,
    publishedBlogs: 0,
    totalMedia: 0,
  });
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.request<any>('/api/admin/stats');
      if (data?.stats) {
        setStats(data.stats);
        setRecentProducts(data.recentProducts || []);
        setRecentBlogs(data.recentBlogs || []);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      subtitle: `${stats.publishedProducts} published • ${stats.draftProducts} drafts`,
      icon: Package,
      color: 'from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30',
      to: '/admin/products',
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      subtitle: 'Active product groupings',
      icon: FolderTree,
      color: 'from-brandGold/20 to-brandGold-dark/10 text-brandGold border-brandGold/30',
      to: '/admin/categories',
    },
    {
      title: 'Blog Articles',
      value: stats.totalBlogs,
      subtitle: `${stats.publishedBlogs} live articles`,
      icon: BookOpen,
      color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30',
      to: '/admin/blogs',
    },
    {
      title: 'Media Files',
      value: stats.totalMedia,
      subtitle: 'Images & brand assets',
      icon: ImageIcon,
      color: 'from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/30',
      to: '/admin/media',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Welcome back to New Pashupati Suppliers content management system.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/admin/products/new"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-brandRed hover:bg-brandRed-dark rounded-xl shadow-lg shadow-brandRed/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Link>
            <Link
              to="/admin/blogs/new"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-xl border border-slate-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              New Blog
            </Link>
          </div>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Link
                key={i}
                to={card.to}
                className={`p-5 rounded-2xl bg-gradient-to-br ${card.color} border backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl group`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    {card.title}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-900/60 text-current">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">
                    {loading ? '...' : card.value}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                  {card.subtitle}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Two Column Layout: Recent Products & Recent Blogs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Products */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Package className="w-5 h-5 text-blue-400" />
                  <h2 className="text-base font-bold text-white">Recent Products</h2>
                </div>
                <Link
                  to="/admin/products"
                  className="text-xs font-semibold text-brandGold hover:text-white flex items-center gap-1 transition-colors"
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-slate-800/60 mt-2">
                {loading ? (
                  <div className="py-8 text-center text-xs text-slate-500">Loading products...</div>
                ) : recentProducts.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500">No products added yet.</div>
                ) : (
                  recentProducts.map((p) => (
                    <div key={p.id} className="py-3 flex items-center justify-between group">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-800 flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-slate-200 truncate group-hover:text-brandRed transition-colors">
                            {p.name}
                          </p>
                          <p className="text-[11px] text-slate-400">{p.categoryName || 'General'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                            p.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {p.status}
                        </span>
                        <Link
                          to={`/admin/products/${p.id}/edit`}
                          className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-900 rounded-lg border border-slate-800"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recent Blogs */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-base font-bold text-white">Recent Blog Posts</h2>
                </div>
                <Link
                  to="/admin/blogs"
                  className="text-xs font-semibold text-brandGold hover:text-white flex items-center gap-1 transition-colors"
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-slate-800/60 mt-2">
                {loading ? (
                  <div className="py-8 text-center text-xs text-slate-500">Loading blogs...</div>
                ) : recentBlogs.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No blog posts published yet. Click "New Blog" to start sharing supply tips and product guides!
                  </div>
                ) : (
                  recentBlogs.map((b) => (
                    <div key={b.id} className="py-3 flex items-center justify-between group">
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-200 truncate group-hover:text-brandRed transition-colors">
                          {b.title}
                        </p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(b.createdAt || Date.now()).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                            b.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {b.status}
                        </span>
                        <Link
                          to={`/admin/blogs/${b.id}/edit`}
                          className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-900 rounded-lg border border-slate-800"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fast Management Quick Navigation */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brandGold/10 text-brandGold rounded-2xl border border-brandGold/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Need to upload batch photos or update categories?</h3>
              <p className="text-xs text-slate-400">
                Manage your whole product catalog in real time without waiting for code redeployments.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Link
              to="/admin/media"
              className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-center flex-1 md:flex-none"
            >
              Open Media Library
            </Link>
            <Link
              to="/admin/categories"
              className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-dark rounded-xl transition-colors text-center flex-1 md:flex-none"
            >
              Manage Categories
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
