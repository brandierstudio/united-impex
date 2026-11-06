import React, { useState } from 'react';
import { Link } from 'wouter';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Package, 
  PhoneCall, 
  Info
} from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { useCart, type CartItem } from '../context/CartContext';
import { ECOMMERCE_PRODUCTS } from '../data/ecommerceProductsData';

export const CartPage: React.FC = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    totalItemsCount, 
    subtotalPKR,
    formatWhatsAppQuoteUrl 
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerNote, setCustomerNote] = useState('');

  // 4 Recommended Add-on Products for Bottom Row (Matching 04_cart_quote_experience.png)
  const recommendations = ECOMMERCE_PRODUCTS.filter(
    p => !items.some(item => item.productId === p.id)
  ).slice(0, 4);

  return (
    <div className="w-full bg-white selection:bg-[#EB1767] selection:text-white pt-6 sm:pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. BREADCRUMB & HEADER
            ========================================================================= */}
        <div className="mb-8 sm:mb-12">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-zinc-500">
            <Link href="/" className="hover:text-[#EB1767] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-900 font-semibold">Your Cart</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight leading-tight">
              Your Cart
            </h1>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 leading-relaxed font-['Inter',sans-serif]">
              Review your selected packaging products and request an official itemized quotation from our coordination desk.
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          /* =======================================================================
             EMPTY CART STATE
             ======================================================================= */
          <div className="p-12 sm:p-16 text-center rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-5 my-8">
            <div className="w-16 h-16 rounded-full bg-pink-100 text-[#EB1767] flex items-center justify-center mx-auto shadow-xs">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-zinc-900">
                Your Quotation Cart is Empty
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
                Explore our commercial coffee cups, carton packaging boxes, kraft carry bags, and executive corporate stationery.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/products"
                className="btn-primary text-xs sm:text-sm font-semibold py-3 px-6 inline-flex items-center gap-2"
              >
                <span>Browse Products Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* =======================================================================
             ACTIVE CART EXPERIENCE: 12-COLUMN RESPONSIVE LAYOUT
             (Matching 04_cart_quote_experience.png)
             ======================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20 sm:mb-28">
            
            {/* ===================================================================
                LEFT 8 COLS: ITEM TABLE / CARD ROWS
                =================================================================== */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Desktop Table Header */}
              <div className="hidden sm:grid sm:grid-cols-12 gap-4 pb-3 border-b border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
                <div className="col-span-6">Product &amp; Specification</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Line Est.</div>
                <div className="col-span-1 text-right">Remove</div>
              </div>

              {/* Cart Item Rows */}
              <div className="space-y-4">
                {items.map((item: CartItem) => {
                  const lineTotal = item.unitPricePKR * item.quantity;
                  return (
                    <div 
                      key={item.id}
                      className="p-4 sm:p-6 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs hover:border-[#EB1767]/30 transition-all flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center justify-between"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="col-span-6 flex items-center gap-4 w-full">
                        <Link 
                          href={`/products/${item.slug}`}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-zinc-50 border border-zinc-200/80 p-2 shrink-0 flex items-center justify-center overflow-hidden hover:opacity-90"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain"
                          />
                        </Link>

                        <div className="min-w-0 flex-1 space-y-1">
                          <Link
                            href={`/products/${item.slug}`}
                            className="text-sm sm:text-base font-bold font-['Outfit',sans-serif] text-zinc-900 hover:text-[#EB1767] transition-colors leading-tight line-clamp-1 block"
                          >
                            {item.title}
                          </Link>

                          <div className="inline-block px-2.5 py-0.5 rounded-md bg-[#FDF2F6] text-[#EB1767] text-[11px] font-semibold">
                            {item.variantName}
                          </div>

                          <p className="text-[11px] text-zinc-500 font-mono">
                            PKR {item.unitPricePKR.toFixed(2)} / {item.priceUnit}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="col-span-3 flex items-center justify-center w-full sm:w-auto">
                        <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, Math.max(item.minOrderQuantity, item.quantity - (item.quantity > 2000 ? 500 : 250)))}
                            className="p-2 hover:bg-zinc-200 text-zinc-600 transition-colors"
                            aria-label={`Decrease ${item.title} quantity`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-16 text-center text-xs font-bold font-mono text-zinc-900">
                            {item.quantity.toLocaleString()}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + (item.quantity >= 2000 ? 500 : 250))}
                            className="p-2 hover:bg-zinc-200 text-zinc-600 transition-colors"
                            aria-label={`Increase ${item.title} quantity`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="col-span-2 text-right w-full sm:w-auto flex sm:block justify-between items-baseline">
                        <span className="sm:hidden text-xs text-zinc-500">Line Estimate:</span>
                        <div>
                          <p className="text-sm sm:text-base font-extrabold font-['Outfit',sans-serif] text-zinc-900">
                            PKR {lineTotal.toLocaleString()}
                          </p>
                          <span className="text-[10px] text-zinc-400 font-mono">Demo Price</span>
                        </div>
                      </div>

                      {/* Remove Trash Button */}
                      <div className="col-span-1 text-right w-full sm:w-auto flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.title} from cart`}
                          className="p-2 rounded-xl text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Cart Footer Options */}
              <div className="pt-4 flex items-center justify-between text-xs">
                <Link
                  href="/products"
                  className="font-semibold text-zinc-600 hover:text-[#EB1767] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>&larr; Continue Exploring Products</span>
                </Link>

                <button
                  type="button"
                  onClick={clearCart}
                  className="text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  Clear All Cart Items
                </button>
              </div>

            </div>

            {/* ===================================================================
                RIGHT 4 COLS: STICKY ORDER SUMMARY & WHATSAPP QUOTATION HANDOFF
                =================================================================== */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200/90 shadow-sm space-y-6">
                <h2 className="text-lg sm:text-xl font-bold font-['Outfit',sans-serif] text-zinc-900 pb-3 border-b border-zinc-200">
                  Order Summary
                </h2>

                {/* Subtotal & Notes */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-600">Subtotal ({totalItemsCount.toLocaleString()} units):</span>
                    <span className="font-bold text-zinc-900 font-mono">
                      PKR {subtotalPKR.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-500">
                    <span className="flex items-center gap-1">
                      <span>Production &amp; Shipping:</span>
                      <Info className="w-3.5 h-3.5 text-zinc-400" />
                    </span>
                    <span className="font-medium">Calculated upon quote</span>
                  </div>
                </div>

                {/* Total Line */}
                <div className="pt-4 border-t border-zinc-200 flex items-baseline justify-between">
                  <div>
                    <span className="text-base font-bold font-['Outfit',sans-serif] text-zinc-900 block">
                      Estimated Total
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      Illustrative non-binding estimate
                    </span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#EB1767] font-['Outfit',sans-serif]">
                    PKR {subtotalPKR.toLocaleString()}
                  </span>
                </div>

                {/* Optional Inquiry Details */}
                <div className="space-y-3 pt-2">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name / Business Name (Optional)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#EB1767]"
                  />
                  <textarea
                    rows={2}
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="Specific delivery date, dieline requests, or questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#EB1767]"
                  />
                </div>

                {/* PRIMARY ACTION: REQUEST QUOTE VIA WHATSAPP */}
                <div className="space-y-2.5 pt-2">
                  <a
                    href={formatWhatsAppQuoteUrl(customerName, customerNote)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary text-xs sm:text-sm font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all min-h-[48px]"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-current text-white" />
                    <span>Request Quote for Cart</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <Link
                    href="/quote"
                    className="w-full py-2.5 px-4 rounded-full text-xs font-semibold text-zinc-700 hover:text-zinc-900 bg-white hover:bg-zinc-100 border border-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Use Step-by-Step Quotation Wizard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Trust Badges (Matching 04_cart_quote_experience) */}
                <div className="pt-4 border-t border-zinc-200 grid grid-cols-3 gap-2 text-center text-[10px] text-zinc-500">
                  <div className="space-y-1">
                    <ShieldCheck className="w-4 h-4 text-[#EB1767] mx-auto" />
                    <p className="font-semibold text-zinc-700 leading-tight">Direct Desk</p>
                    <p>Karachi &amp; Multan</p>
                  </div>
                  <div className="space-y-1">
                    <Package className="w-4 h-4 text-[#EB1767] mx-auto" />
                    <p className="font-semibold text-zinc-700 leading-tight">Bulk Orders</p>
                    <p>Volume Tiers</p>
                  </div>
                  <div className="space-y-1">
                    <PhoneCall className="w-4 h-4 text-[#EB1767] mx-auto" />
                    <p className="font-semibold text-zinc-700 leading-tight">Press Team</p>
                    <p>Color Checked</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* =========================================================================
            4. YOU MAY ALSO LIKE (Matching 04_cart_quote_experience bottom row)
            ========================================================================= */}
        {recommendations.length > 0 && (
          <section className="pt-12 border-t border-zinc-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-zinc-900">
                  You May Also Like
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Complement your order with these related packaging products.
                </p>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EB1767] hover:underline"
              >
                <span>View All Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {recommendations.map(p => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="group p-4 rounded-3xl bg-zinc-50 border border-zinc-200/80 hover:border-[#EB1767]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-3 cursor-pointer"
                >
                  <div className="aspect-square w-full rounded-2xl bg-white border border-zinc-200/80 p-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={p.primaryImage}
                      alt={p.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#EB1767]">
                      {p.categoryLabel}
                    </span>
                    <h3 className="text-sm font-bold font-['Outfit',sans-serif] text-zinc-900 group-hover:text-[#EB1767] transition-colors truncate">
                      {p.title}
                    </h3>
                    <p className="text-xs font-bold text-zinc-900 font-mono">
                      PKR {p.startingPricePKR.toFixed(2)} / {p.priceUnit}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default CartPage;
