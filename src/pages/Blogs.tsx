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
    <main className="bg-white min-h-screen">
      <Reveal variant="fade-in">
        <PageHero
          eyebrow="SUPPLY INSIGHTS &amp; UPDATES"
          title="Articles &amp; Product Guides"
          description="Explore guides on cookware care, bulk ordering strategies, storage organization, and the latest updates from New Pashupati Suppliers."
        />
      </Reveal>

      <section className="py-8 sm:py-14 bg-[#F8F8F9] min-h-[500px]">
        <Container>
          {/* Search bar */}
          <div className="max-w-md mx-auto mb-8 sm:mb-10">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]" />
              <input
                type="text"
                placeholder="Search articles by topic..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EEEEF0] rounded-full text-xs sm:text-sm text-[#09132F] placeholder-[#777777] focus:outline-none focus:ring-1 focus:ring-[#F58220] focus:border-[#F58220] shadow-soft-xs"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-[#F58220] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs sm:text-sm text-[#777777]">Loading articles...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-[16px] border border-[#EEEEF0] p-8 max-w-lg mx-auto shadow-soft-xs">
              <BookOpen className="w-12 h-12 text-[#CCCCCC] mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#09132F]">No articles available yet</h3>
              <p className="text-xs text-[#777777] mt-1">
                We are currently crafting helpful supply guides and store updates. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
