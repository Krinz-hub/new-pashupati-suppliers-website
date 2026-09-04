import React, { useState, useEffect } from 'react';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/common/PageHero';
import { Reveal } from '../components/common/Reveal';
import { BlogCard } from '../components/blogs/BlogCard';
import { useBlogs } from '../hooks/useBlogs';
import { setPageTitle } from '../utils/helpers';
import { BookOpen, Search } from 'lucide-react';

export const Blogs: React.FC = () => {
  const { blogs, loading } = useBlogs({ status: 'published' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPageTitle('News & Supply Guides | New Pashupati Suppliers');
  }, []);

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      (b.excerpt && b.excerpt.toLowerCase().includes(search.toLowerCase())) ||
      (b.categoryName && b.categoryName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main>
      <Reveal variant="fade-in">
        <PageHero
          eyebrow="SUPPLY INSIGHTS &amp; UPDATES"
          title="Articles &amp; Product Guides"
          description="Explore guides on cookware care, bulk ordering strategies, storage organization, and the latest updates from New Pashupati Suppliers."
        />
      </Reveal>

      <section className="py-10 sm:py-16 bg-brandBg min-h-[500px]">
        <Container>
          {/* Search bar */}
          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brandText-muted" />
              <input
                type="text"
                placeholder="Search articles by topic..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-brandBorder rounded-xl text-sm text-navy placeholder-brandText-muted focus:outline-none focus:ring-2 focus:ring-brandRed shadow-sm"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-brandRed border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-brandText-muted">Loading articles...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-brandBorder p-8 max-w-lg mx-auto">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-navy">No articles available yet</h3>
              <p className="text-xs text-brandText-muted mt-1">
                We are currently crafting helpful supply guides and store updates. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredBlogs.map((post) => (
                <Reveal key={post.id} variant="fade-up">
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
};
