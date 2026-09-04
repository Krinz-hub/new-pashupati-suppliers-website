import React, { useState, useEffect } from 'react';
import { X, Upload, Check, Image as ImageIcon, Search } from 'lucide-react';
import { mediaService } from '../../services/mediaService';
import { MediaItem } from '../../types';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
  title?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  title = 'Select Image',
}) => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [selectedUrl, setSelectedUrl] = useState<string>('');
  const [customUrl, setCustomUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen]);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const items = await mediaService.getMedia();
      setMediaList(items);
    } catch (err) {
      console.error('Failed to fetch media:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await mediaService.uploadMedia(file);
      if (res.success && res.media) {
        setMediaList((prev) => [res.media!, ...prev]);
        setSelectedUrl(res.media.url);
      }
    } catch (err) {
      console.error('Failed to upload image:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleConfirm = () => {
    const finalUrl = customUrl.trim() || selectedUrl;
    if (finalUrl) {
      onSelect(finalUrl);
      onClose();
    }
  };

  if (!isOpen) return null;

  const filteredMedia = mediaList.filter((m) =>
    m.fileName.toLowerCase().includes(search.toLowerCase()) ||
    (m.altText && m.altText.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ImageIcon className="w-5 h-5 text-brandRed" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search images..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed/20 focus:border-brandRed"
            />
          </div>

          <label className="flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-semibold text-white bg-navy hover:bg-navy-dark rounded-xl cursor-pointer transition-colors shadow-sm">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>

        {/* Media Grid */}
        <div className="flex-1 p-4 overflow-y-auto min-h-[250px]">
          {loading ? (
            <div className="h-48 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-brandRed border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-600">No uploaded media found</p>
              <p className="text-xs text-slate-400 mt-1">Upload an image or enter a URL below</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {filteredMedia.map((media) => {
                const isSelected = selectedUrl === media.url;
                return (
                  <div
                    key={media.id}
                    onClick={() => {
                      setSelectedUrl(media.url);
                      setCustomUrl('');
                    }}
                    className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      isSelected
                        ? 'border-brandRed ring-2 ring-brandRed/20 shadow-md'
                        : 'border-slate-200 hover:border-brandRed/50'
                    }`}
                  >
                    <img
                      src={media.url}
                      alt={media.altText || media.fileName}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-brandRed/20 flex items-center justify-center">
                        <div className="bg-brandRed text-white p-1 rounded-full shadow">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                      <p className="text-[10px] font-medium text-white truncate">{media.fileName}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Custom URL Input & Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Or enter direct image URL (e.g. /assets/products/cooking-pot.jpg)"
              value={customUrl}
              onChange={(e) => {
                setCustomUrl(e.target.value);
                if (e.target.value) setSelectedUrl('');
              }}
              className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed/20 focus:border-brandRed"
            />
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedUrl && !customUrl.trim()}
              className="px-5 py-1.5 text-sm font-semibold text-white bg-brandRed hover:bg-brandRed-dark disabled:opacity-50 rounded-xl shadow-sm transition-all"
            >
              Choose Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
