import Hero from './components/Hero';
import { ServiceSection } from './components/ServiceSection';
import ReviewsSection from './components/ReviewsSection';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const beautyServices = [
    'Hair Styling & Treatments',
    'Makeup (Bridal / Party)',
    'Nails & Manicure',
    'Skincare & Facials',
    'Waxing & Threading'
  ];

  const fitnessServices = [
    'Personal Training',
    'Strength Training',
    'Cardio Programs',
    'Body Transformation',
    'Healthy Lifestyle Focus'
  ];

  return (
    <main className="bg-white selection:bg-[#392d22] selection:text-white">
      {/* 1. CINEMATIC HERO */}
      <Hero />

      {/* 2. TRUST STRIP */}
      <section className="border-y border-gray-100 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap justify-between items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#392d22]">Studio Open Now</span>
            </div>
            
            <div className="hidden lg:block h-8 w-[1px] bg-gray-100"></div>

            <div className="flex items-center gap-6">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#392d22" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
               <span className="text-[11px] uppercase tracking-[0.3em] text-gray-500">Gulshan-e-Iqbal, Karachi</span>
            </div>

            <div className="hidden lg:block h-8 w-[1px] bg-gray-100"></div>

            <div className="flex items-center gap-4">
               <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#392d22]">Inquiries</span>
               <a href="tel:03313386136" className="text-[12px] font-serif hover:italic transition-all">0331 3386136</a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BRAND PHILOSOPHY */}
      <section className="relative py-32 overflow-hidden bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <span className="text-[11px] uppercase tracking-[0.6em] text-gray-400 mb-8 block">Our Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#392d22] leading-[1.2] mb-10">
            Crafting <span className="italic font-light">Confidence</span> Through Artistry & Discipline.
          </h2>
          <div className="w-16 h-[1px] bg-[#392d22] mx-auto mb-10"></div>
          <p className="text-gray-500 font-light leading-relaxed text-lg max-w-2xl mx-auto italic">
            "We believe self-care is not a luxury, but a lifestyle. At Chic & Glam, we merge the sophistication of a boutique salon with the power of an elite fitness studio."
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif text-[#392d22]/[0.02] whitespace-nowrap select-none pointer-events-none">
          CHIC & GLAM
        </div>
      </section>

      {/* 4. BEAUTY SALON SECTION - IMAGE APPLIED */}
      <ServiceSection
        title="Beauty Salon"
        description="Experience a sanctuary of elegance. From couture hair artistry to clinical skincare, we define the new standard of beauty in Karachi."
        services={beautyServices}
        link="/beauty-salon"
        bgColor="bg-white"
        isReversed={false}
        image="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1170&auto=format&fit=crop"
      />

      {/* 5. VISUAL INTERMISSION */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1170&auto=format&fit=crop" 
          alt="Luxury Ambience"
          fill
          priority
          className="object-cover grayscale brightness-75 transition-transform duration-[10s] hover:scale-110"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
            <div className="w-[1px] h-24 bg-white/50 mb-8"></div>
            <h3 className="text-[12px] uppercase tracking-[0.8em] font-light italic mb-4">The Art of Transformation</h3>
            <p className="text-white/60 text-[10px] uppercase tracking-[0.3em]">Established 2024 • Karachi</p>
        </div>
      </div>

      {/* 6. FITNESS GYM SECTION - IMAGE APPLIED */}
      <ServiceSection
        title="Fitness Gym"
        description="Elite personal coaching meets world-class equipment. Transform your physique in an environment designed for maximum focus."
        services={fitnessServices}
        link="/fitness-gym"
        bgColor="bg-[#FAF9F6]"
        isReversed={true}
        image="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=775&auto=format&fit=crop"
      />

      {/* 7. TRUST & TESTIMONIALS */}
      <ReviewsSection />

      {/* 8. FINAL CLOSING STATEMENT */}
      <section className="relative py-40 bg-[#392d22] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <Image 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop" 
                alt="Fitness Texture" 
                fill 
                className="object-cover"
            />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-5xl md:text-7xl font-serif mb-16 tracking-tight">
            Ready for your <br/> <span className="italic font-light">Transformation?</span>
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
            <Link 
              href="/contact" 
              className="group relative px-14 py-6 bg-white text-[#392d22] text-[11px] uppercase tracking-[0.4em] font-bold transition-all hover:bg-zinc-100"
            >
              Book Appointment
            </Link>

            <Link 
              href="/contact" 
              className="text-[11px] uppercase tracking-[0.4em] text-white/70 border-b border-white/20 pb-2 hover:text-white hover:border-white transition-all"
            >
              Consult an Expert
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
