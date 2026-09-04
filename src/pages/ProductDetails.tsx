import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Container } from '../components/common/Container';
import { ProductCard } from '../components/products/ProductCard';
import { fetchProductBySlug, fetchProducts, ProductItem } from '../services/api';
import { SITE } from '../config/site';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    fetchProductBySlug(slug).then((prod) => {
      if (prod) {
        setProduct(prod);
        setSelectedImage(prod.image);

        fetchProducts({ category: prod.category, limit: 4 }).then((res) => {
          setRelatedProducts(res.data.filter((p) => p.slug !== prod.slug && p.id !== prod.id));
        });
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <main className="pt-24 pb-16 bg-slate-50 min-h-screen">
        <Container>
          <div className="max-w-5xl mx-auto h-96 bg-slate-200 animate-pulse rounded-3xl" />
        </Container>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pt-24 pb-16 bg-slate-50 min-h-screen text-center">
        <Container>
          <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200">
            <h2 className="text-xl font-bold text-navy mb-2">Product Not Found</h2>
            <p className="text-slate-500 text-sm mb-6">The requested product could not be located in our catalog.</p>
            <Link to="/products" className="inline-block px-5 py-2.5 bg-brandRed text-white font-semibold rounded-xl">
              Back to Catalog
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const whatsappHref = `https://wa.me/${SITE.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello New Pashupati Suppliers, I would like to ask about availability and wholesale rate for: ${product.name} (SKU: ${product.sku || product.slug}).`
  )}`;

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <main className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to="/" className="hover:text-brandRed">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-brandRed">Products</Link>
          <span>/</span>
          <Link to={`/categories/${product.category.toLowerCase()}`} className="hover:text-brandRed capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-navy truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 mb-12 shadow-sm border border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group">
                <img
                  src={selectedImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/banner.png';
                  }}
                />
                {product.available && (
                  <span className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    In Stock
                  </span>
                )}
              </div>

              {imagesList.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {imagesList.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-slate-50 ${
                        selectedImage === imgUrl ? 'border-brandRed scale-95' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={imgUrl} alt="" className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    {product.category}
                  </span>
                  {product.brand && (
                    <span className="text-xs font-medium text-slate-400">Brand: {product.brand}</span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight mb-4">
                  {product.name}
                </h1>

                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Specs Table */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 mb-6 space-y-2.5 text-xs sm:text-sm">
                  {product.sku && (
                    <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500 font-medium">SKU Reference:</span>
                      <span className="font-bold text-navy">{product.sku}</span>
                    </div>
                  )}
                  {product.unit && (
                    <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500 font-medium">Supply Unit:</span>
                      <span className="font-bold text-navy">{product.unit}</span>
                    </div>
                  )}
                  {product.packSize && (
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-500 font-medium">Wholesale Pack Size:</span>
                      <span className="font-bold text-navy">{product.packSize}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action CTAs */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate(`/contact?product=${encodeURIComponent(product.name)}`)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-brandRed text-white font-bold rounded-xl hover:bg-brandRed/90 active:scale-[0.98] transition-all shadow-md shadow-brandRed/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Ask About Product</span>
                  </button>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] active:scale-[0.98] transition-all shadow-md shadow-emerald-500/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>

                <p className="text-center text-xs text-slate-400 font-medium pt-1">
                  📍 Available at Hetauda Showroom & Wholesale Dispatch across Makawanpur
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-navy mb-6">Related Products in {product.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel._id || rel.id || rel.slug} product={{ ...rel, id: rel.id || rel.slug || rel._id || 'rel' }} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
};
