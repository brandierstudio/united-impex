import React from 'react';
import { Package, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { SEOHead } from '../components/seo/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full min-h-[60vh] bg-white flex items-center justify-center py-20 px-4">
      <SEOHead
        title="404 - Page Not Found | United Impex"
        description="The requested page could not be located. Explore our custom packaging catalog or return to the United Impex homepage."
        canonicalPath="/404"
      />
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-[#FDF2F6] text-[#EB1767] mx-auto flex items-center justify-center border border-[#EB1767]/20 shadow-xs">
          <Package className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#EB1767]">
            404 Error
          </span>
          <h1 className="text-3xl font-extrabold font-['Outfit',sans-serif] text-zinc-900">
            Page Not Found
          </h1>
          <p className="text-sm text-zinc-600 leading-relaxed">
            The page you requested could not be located. Explore our core packaging catalog or return to the homepage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
