import Image from 'next/image';
import LinkComponent from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a1612] text-[#FAF9F6] pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* 1. SMALL REFINED HEADING Section */}
        <div className="border-b border-white/10 pb-12 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <h2 className="text-[11px] uppercase tracking-[0.6em] font-medium text-white/90">
              Stay Chic <span className="mx-4 text-white/20">|</span> Stay Glam
            </h2>
            
            <div className="flex w-full max-w-sm border-b border-white/20 focus-within:border-white transition-all py-1">
              <input 
                type="email" 
                placeholder="JOIN OUR ELITE LIST" 
                className="bg-transparent w-full outline-none text-[9px] tracking-[0.2em] placeholder:text-white/20 text-white"
              />
              <button className="text-[9px] tracking-[0.2em] font-bold hover:text-white/50 transition-colors uppercase">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* 2. MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Logo & About */}
          <div className="md:col-span-4">
            <LinkComponent href="/" className="inline-block mb-8">
              <Image
                src="/chic.png"
                alt="Chic & Glam Logo"
                width={180}
                height={60}
                className="h-12 w-auto object-contain brightness-0 invert opacity-90"
              />
            </LinkComponent>
            <p className="text-white/40 text-[13px] leading-relaxed font-light mb-10 max-w-xs">
              Elevating the standards of beauty and wellness in Karachi. A sanctuary for those who seek excellence.
            </p>
            <div className="flex gap-8">
              {['Instagram', 'Facebook', 'WhatsApp'].map((social) => (
                <a key={social} href="#" className="text-white/30 hover:text-white transition-colors text-[9px] tracking-[0.2em] font-bold uppercase">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:block md:col-span-1"></div>

          {/* Links Sections */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] tracking-[0.3em] font-bold text-white/20 mb-8 uppercase">Services</h4>
            <ul className="space-y-4">
              <li><LinkComponent href="/beauty-salon" className="text-[11px] tracking-widest text-white/50 hover:text-white transition-all block">BEAUTY SALON</LinkComponent></li>
              <li><LinkComponent href="/fitness-gym" className="text-[11px] tracking-widest text-white/50 hover:text-white transition-all block">FITNESS GYM</LinkComponent></li>
              <li><LinkComponent href="/reviews" className="text-[11px] tracking-widest text-white/50 hover:text-white transition-all block">REVIEWS</LinkComponent></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] tracking-[0.3em] font-bold text-white/20 mb-8 uppercase">Company</h4>
            <ul className="space-y-4">
              <li><LinkComponent href="/about" className="text-[11px] tracking-widest text-white/50 hover:text-white transition-all block">OUR STORY</LinkComponent></li>
              <li><LinkComponent href="/contact" className="text-[11px] tracking-widest text-white/50 hover:text-white transition-all block">CONTACT</LinkComponent></li>
              <li><LinkComponent href="/auth/login" className="text-[11px] tracking-widest text-white/50 hover:text-white transition-all block">LOGIN</LinkComponent></li>
            </ul>
          </div>

          {/* Location */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] tracking-[0.3em] font-bold text-white/20 mb-8 uppercase">Location</h4>
            <address className="not-italic text-[13px] text-white/50 leading-relaxed font-light">
              FL 11/3 KDA Market,<br />
              Gulshan-e-Iqbal, Block 3,<br />
              Karachi, Pakistan
            </address>
          </div>
        </div>

        {/* 3. FINAL LOGO WATERMARK */}
        <div className="relative pt-16">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
            <h1 className="text-[15vw] font-serif leading-none whitespace-nowrap tracking-tighter">CHIC & GLAM</h1>
          </div>
          <div className="relative border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[8px] tracking-[0.2em] text-white/20 uppercase font-light">
              &copy; {new Date().getFullYear()} Chic & Glam by Ash Beauty Bar.
            </p>
            <p className="text-[8px] tracking-[0.2em] text-white/20 uppercase font-light">
              Excellence in every detail
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}