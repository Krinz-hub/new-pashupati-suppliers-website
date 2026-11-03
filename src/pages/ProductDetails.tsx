import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Send, CheckCircle, ShieldCheck, Truck } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/products/ProductGrid';
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
      <main className="py-12 bg-white min-h-screen">
        <Container>
          <div className="max-w-4xl mx-auto h-96 bg-[#F8F8F9] animate-pulse rounded-[16px]" />
        </Container>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="py-16 bg-white min-h-screen text-center">
        <Container>
          <div className="max-w-md mx-auto bg-white p-8 rounded-[16px] border border-[#EEEEF0] shadow-xs">
            <h2 className="text-xl font-bold text-[#09132F] mb-2">Product Not Found</h2>
            <p className="text-[#777777] text-sm mb-6">The requested product could not be located in our catalog.</p>
            <Link to="/products" className="inline-block px-5 py-2.5 bg-[#F58220] hover:bg-[#E97516] text-white font-semibold rounded-full text-sm">
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
  const priceDisplay = product.price ? `रू ${product.price}` : 'Wholesale Quote Available';

  return (
    <main className="py-6 sm:py-10 bg-white min-h-screen">
      <Container>
        {/* Unified Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Products', path: '/products' },
            { label: product.category, path: `/products?category=${product.category.toLowerCase()}` },
            { label: product.name },
          ]}
        />

        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-[16px] p-5 sm:p-8 mb-10 border border-[#EEEEF0] shadow-soft-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-3">
              <div className="aspect-square rounded-[16px] overflow-hidden bg-white border border-[#EEEEF0] relative flex items-center justify-center p-6">
                <img
                  src={selectedImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/banner.png';
                  }}
                />
                {product.available && (
                  <span className="absolute top-3 left-3 bg-[#13984B] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Available in Stock
                  </span>
                )}
              </div>

              {imagesList.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {imagesList.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`w-16 h-16 rounded-[12px] overflow-hidden border transition-all shrink-0 bg-white p-1.5 ${
                        selectedImage === imgUrl ? 'border-[#F58220] ring-1 ring-[#F58220]' : 'border-[#EEEEF0] hover:border-slate-300'
                      }`}
                    >
                      <img src={imgUrl} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="px-2.5 py-0.5 bg-[#F8F8F9] text-[#09132F] text-[11px] font-bold rounded-full uppercase tracking-wider border border-[#EEEEF0]">
                    {product.category}
                  </span>
                  {product.brand && (
                    <span className="text-xs font-medium text-[#777777]">Brand: <strong className="text-[#09132F]">{product.brand}</strong></span>
                  )}
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#09132F] leading-tight mb-3">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="p-3.5 rounded-[12px] bg-[#FFF4EB] border border-[#F58220]/20 mb-4 inline-block">
                  <span className="text-[11px] uppercase tracking-wider text-[#777777] font-semibold block mb-0.5">
                    Pricing &amp; Procurement
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#F58220]">
                    {priceDisplay}
                  </span>
                  <p className="text-[11px] text-[#777777] mt-1">
                    Wholesale volume tiers available for shops and bulk procurement.
                  </p>
                </div>

                <p className="text-[#777777] text-xs sm:text-sm leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Specs Table */}
                <div className="bg-[#F8F8F9] rounded-[14px] p-4 border border-[#EEEEF0] mb-5 space-y-2 text-xs">
                  {product.sku && (
                    <div className="flex items-center justify-between py-1 border-b border-[#EEEEF0]">
                      <span className="text-[#777777] font-medium">SKU Reference:</span>
                      <span className="font-bold text-[#09132F]">{product.sku}</span>
                    </div>
                  )}
                  {product.unit && (
                    <div className="flex items-center justify-between py-1 border-b border-[#EEEEF0]">
                      <span className="text-[#777777] font-medium">Supply Unit:</span>
                      <span className="font-bold text-[#09132F]">{product.unit}</span>
                    </div>
                  )}
                  {product.packSize && (
                    <div className="flex items-center justify-between py-1">
                      <span className="text-[#777777] font-medium">Wholesale Pack Size:</span>
                      <span className="font-bold text-[#09132F]">{product.packSize}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action CTAs */}
              <div className="space-y-3 pt-3 border-t border-[#EEEEF0]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate(`/contact?product=${encodeURIComponent(product.name)}`)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#F58220] hover:bg-[#E97516] text-white font-bold rounded-full text-xs sm:text-sm shadow-xs transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Inquire Best Price</span>
                  </button>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#13984B] hover:bg-[#0f7a3b] text-white font-bold rounded-full text-xs sm:text-sm shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs text-[#777777] pt-2">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#13984B]" />
                    Genuine Quality Assured
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#F58220]" />
                    Makawanpur &amp; Nepal Dispatch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="pt-6 border-t border-[#EEEEF0]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-xl font-bold text-[#09132F]">
                Related Products in {product.category}
              </h2>
              <Link
                to={`/products?category=${product.category.toLowerCase()}`}
                className="text-xs font-semibold text-[#F58220] hover:text-[#E97516]"
              >
                View Category
              </Link>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </Container>
    </main>
  );
};
