import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { blogService } from '../services/blogService';
import { BlogPost } from '../types';
import { setPageTitle } from '../utils/helpers';
import { Calendar, User, ArrowLeft, BookOpen } from 'lucide-react';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const post = await blogService.getBlog(slug);
        if (post) {
          setBlog(post);
          setPageTitle(`${post.seoTitle || post.title} | New Pashupati Suppliers`);
        } else {
          setError('Article not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="py-20 bg-white min-h-[600px] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#F58220] border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="py-20 bg-white min-h-[600px] flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto text-center bg-white rounded-[16px] p-8 border border-[#EEEEF0] shadow-xs">
            <BookOpen className="w-12 h-12 text-[#777777] mx-auto mb-3" />
            <h1 className="text-xl font-bold text-[#09132F]">Article Not Found</h1>
            <p className="text-sm text-[#777777] mt-2">
              The article you are looking for does not exist or has been removed.
            </p>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-[#F58220] text-white text-xs font-bold rounded-full shadow-xs hover:bg-[#E97516] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="bg-white py-6 sm:py-10 min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Unified Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Articles', path: '/blogs' },
              { label: blog.categoryName || 'Guide', path: '/blogs' },
              { label: blog.title },
            ]}
          />

          <article className="bg-white rounded-[16px] border border-[#EEEEF0] shadow-soft-xs overflow-hidden">
            {/* Header info */}
            <div className="p-6 sm:p-10 border-b border-[#EEEEF0]">
              {blog.categoryName && (
                <span className="inline-block px-3 py-1 rounded-full bg-[#F8F8F9] border border-[#EEEEF0] text-[#09132F] text-xs font-bold uppercase tracking-wider mb-4">
                  {blog.categoryName}
                </span>
              )}

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#09132F] leading-tight">
                {blog.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#777777]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-[#F58220]" />
                  {new Date(blog.publishedAt || blog.createdAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="w-4 h-4 text-[#09132F]" />
                  {blog.authorName || 'New Pashupati Team'}
                </span>
              </div>
            </div>

            {/* Featured Image */}
            {blog.featuredImage && (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F8F8F9] border-b border-[#EEEEF0]">
                <ImageWithFallback
                  src={blog.featuredImage}
                  alt={blog.title}
                  category={blog.categoryName || 'Blog'}
                  title={blog.title}
                  aspectRatio="video"
                  containerClassName="w-full h-full"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="p-6 sm:p-10 text-[#171717] leading-relaxed space-y-4 text-sm sm:text-base font-normal">
              {blog.excerpt && (
                <p className="text-base sm:text-lg font-semibold text-[#09132F] italic border-l-4 border-[#F58220] pl-4 py-1">
                  {blog.excerpt}
                </p>
              )}

              <div className="whitespace-pre-wrap leading-relaxed space-y-4 pt-2">
                {blog.content}
              </div>
            </div>
          </article>
        </div>
      </Container>
    </main>
  );
};
