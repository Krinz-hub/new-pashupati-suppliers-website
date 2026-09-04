import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="group bg-white rounded-2xl border border-brandBorder shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 h-full">
      <div>
        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 border-b border-brandBorder/60">
          <ImageWithFallback
            src={post.featuredImage || '/assets/banner.png'}
            alt={post.title}
            category={post.categoryName || 'Blog'}
            title={post.title}
            aspectRatio="video"
            containerClassName="w-full h-full group-hover:scale-105 transition-transform duration-500"
          />

          {post.categoryName && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-navy/85 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-wider">
              {post.categoryName}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-3 text-xs text-brandText-muted mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brandRed" />
              {new Date(post.publishedAt || post.createdAt || Date.now()).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-brandGold" />
              {post.authorName || 'New Pashupati Team'}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-navy group-hover:text-brandRed transition-colors leading-snug line-clamp-2">
            <Link to={`/blogs/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-brandText-muted leading-relaxed line-clamp-3">
            {post.excerpt || post.content.slice(0, 120) + '...'}
          </p>
        </div>
      </div>

      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2">
        <Link
          to={`/blogs/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brandRed group-hover:text-brandRed-dark transition-colors"
        >
          <span>Read Full Article</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};
