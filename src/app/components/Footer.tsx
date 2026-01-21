import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#FAF9F6] border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Brand & Logo Section */}
          <div className="md:col-span-5">
            <div className="mb-8">
              {/* Header wala same logo yahan apply kar diya hai */}
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/chic.png"
                  alt="Chic & Glam Logo"
                  width={180}
                  height={55}
                  className="h-14 w-auto object-contain brightness-[0.9] hover:brightness-100 transition-all"
                />
              </Link>
              <div className="h-[1px] w-12 bg-[#392d22]/30"></div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-light italic mb-8">
              "Where chic meets glam. We don’t just style — we create confidence through curated beauty and elite fitness experiences."
            </p>
            {/* Social Icons */}
            <div className="flex gap-6">
              <Link href="https://instagram.com/chic_glamofficial" className="text-[#392d22] hover:opacity-50 transition-opacity" target="_blank">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </Link>
              <Link href="#" className="text-[#392d22] hover:opacity-50 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#392d22] mb-8">Studio</h4>
            <ul className="space-y-4">
              <li><Link href="/beauty-salon" className="text-[12px] uppercase tracking-widest text-gray-500 hover:text-[#392d22] transition-colors">Beauty Salon</Link></li>
              <li><Link href="/fitness-gym" className="text-[12px] uppercase tracking-widest text-gray-500 hover:text-[#392d22] transition-colors">Fitness Gym</Link></li>
              <li><Link href="/reviews" className="text-[12px] uppercase tracking-widest text-gray-500 hover:text-[#392d22] transition-colors">Client Reviews</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#392d22] mb-8">Contact</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-[12px] uppercase tracking-widest text-gray-500 hover:text-[#392d22] transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="text-[12px] uppercase tracking-widest text-gray-500 hover:text-[#392d22] transition-colors">Appointments</Link></li>
            </ul>
          </div>

          {/* Location / Address */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#392d22] mb-8">Find Us</h4>
            <div className="space-y-6">
              <p className="text-xs text-gray-500 leading-loose tracking-wide font-light">
                FL 11/3 KDA Market, Gulshan-e-Iqbal,<br/> Block 3, Karachi, Pakistan (75050)
              </p>
              <div className="flex flex-col gap-2">
                <a href="tel:03313386136" className="text-sm font-serif text-[#392d22]">0331 3386136</a>
                <a href="mailto:chicglam9@gmail.com" className="text-xs text-gray-400 border-b border-gray-200 pb-1 w-fit hover:border-[#392d22] transition-all">chicglam9@gmail.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Chic & Glam by Ash Beauty Bar.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-gray-400">
            <span className="hover:text-[#392d22] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#392d22] cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}