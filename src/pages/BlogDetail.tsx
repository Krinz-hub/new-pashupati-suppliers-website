import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
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
      <main className="py-20 bg-brandBg min-h-[600px] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-brandRed border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="py-20 bg-brandBg min-h-[600px] flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto text-center bg-white rounded-3xl p-8 border border-brandBorder shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h1 className="text-xl font-bold text-navy">Article Not Found</h1>
            <p className="text-sm text-brandText-muted mt-2">
              The article you are looking for does not exist or has been removed.
            </p>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-brandRed text-white text-xs font-bold rounded-xl shadow-md"
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
    <main className="bg-brandBg py-8 sm:py-16 min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Back link */}
          <div>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brandText-muted hover:text-brandRed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </Link>
          </div>

          <article className="bg-white rounded-3xl border border-brandBorder shadow-md overflow-hidden">
            {/* Header info */}
            <div className="p-6 sm:p-10 border-b border-brandBorder/60">
              {blog.categoryName && (
                <span className="inline-block px-3 py-1 rounded-md bg-navy text-white text-xs font-bold uppercase tracking-wider mb-4">
                  {blog.categoryName}
                </span>
              )}

              <h1 className="text-2xl sm:text-4xl font-extrabold text-navy leading-tight">
                {blog.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-brandText-muted">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-brandRed" />
                  {new Date(blog.publishedAt || blog.createdAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="w-4 h-4 text-brandGold" />
                  {blog.authorName || 'New Pashupati Team'}
                </span>
              </div>
            </div>

            {/* Featured Image */}
            {blog.featuredImage && (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 border-b border-brandBorder/60">
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
            <div className="p-6 sm:p-10 text-brandText leading-relaxed space-y-4 text-sm sm:text-base font-normal">
              {blog.excerpt && (
                <p className="text-base sm:text-lg font-semibold text-navy italic border-l-4 border-brandRed pl-4 py-1">
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
