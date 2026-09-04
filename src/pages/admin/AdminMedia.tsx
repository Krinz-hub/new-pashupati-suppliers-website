import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  AlertCircle,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { mediaService } from '../../services/mediaService';
import { MediaItem } from '../../types';

export const AdminMedia: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const items = await mediaService.getMedia();
      setMediaList(items);
    } catch (err: any) {
      setError(err.message || 'Failed to load media files');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const res = await mediaService.uploadMedia(file);
        if (res.success && res.media) {
          setMediaList((prev) => [res.media!, ...prev]);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload media file');
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await mediaService.deleteMedia(deleteTarget.id);
      if (res.success) {
        setMediaList((prev) => prev.filter((m) => m.id !== deleteTarget.id));
        setDeleteTarget(null);
      } else {
        alert(res.error || 'Failed to delete media item');
      }
    } catch (err: any) {
      alert(err.message || 'Error deleting media item');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredMedia = mediaList.filter((m) =>
    m.fileName.toLowerCase().includes(search.toLowerCase()) ||
    (m.altText && m.altText.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <ImageIcon className="w-7 h-7 text-purple-400" />
              Media &amp; Asset Library
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Upload, preview, and manage product photos, gallery images, and blog graphics.
            </p>
          </div>

          <label className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-lg shadow-purple-600/20 cursor-pointer transition-all self-start sm:self-auto">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Upload Photos'}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Upload Zone & Search */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Card */}
          <div className="bg-slate-950/60 border border-dashed border-slate-700 hover:border-purple-500/60 rounded-3xl p-6 text-center transition-all flex flex-col items-center justify-center relative group">
            <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400 mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">Upload New Files</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">PNG, JPG, WebP, SVG up to 5MB</p>
            <label className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 cursor-pointer transition-colors">
              Browse From Computer
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>
          </div>

          {/* Search & Info */}
          <div className="lg:col-span-2 bg-slate-950/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white mb-2">Search Library</h3>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by file name or alt description..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span>{mediaList.length} total media item(s)</span>
              <span>Fast Edge Delivery</span>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 shadow-xl">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-slate-400">Loading media library...</p>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="py-16 text-center">
              <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-300">No media items found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Upload your first image to use across products, categories, and blog articles.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMedia.map((media) => {
                const isCopied = copiedId === media.id;
                return (
                  <div
                    key={media.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-purple-500/50 transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
                      <img
                        src={media.url}
                        alt={media.altText || media.fileName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.opacity = '0.3';
                        }}
                      />

                      {/* Quick Action Overlay */}
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleCopy(media.url, media.id)}
                          title="Copy URL"
                          className="p-2 bg-slate-900 text-white rounded-xl hover:bg-purple-600 transition-colors shadow"
                        >
                          {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setDeleteTarget(media)}
                          title="Delete File"
                          className="p-2 bg-slate-900 text-white rounded-xl hover:bg-red-600 transition-colors shadow"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-2.5">
                      <p className="text-xs font-bold text-slate-200 truncate">{media.fileName}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                        <span>{media.fileSize ? `${Math.round(media.fileSize / 1024)} KB` : 'Asset'}</span>
                        {isCopied && <span className="text-emerald-400 font-semibold">Copied!</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Media File"
        message={`Are you sure you want to permanently delete "${deleteTarget?.fileName}"?`}
        confirmLabel="Delete File"
        isDestructive={true}
        loading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminLayout>
  );
};
