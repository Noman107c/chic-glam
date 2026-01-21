import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Cinematic Header */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1497339100210-9e87df79c218?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Studio Ambience" 
          fill 
          className="object-cover opacity-60 grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-white"></div>
        <div className="relative z-10 text-center px-6">
          <span className="text-[11px] uppercase tracking-[0.6em] text-white/80 mb-4 block">Est. Karachi</span>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-4">Our <span className="italic">Heritage</span></h1>
        </div>
      </section>

      {/* 2. The Narrative Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Big Statement */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl font-serif text-[#392d22] leading-tight mb-8">
              Chic & Glam is a <span className="italic text-gray-400">sanctuary</span> where self-care meets empowerment.
            </h2>
            <div className="w-24 h-[1px] bg-[#392d22] mb-8"></div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 font-bold">The Ash Beauty Bar Signature</p>
          </div>

          {/* Right: Detailed Story */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              Located in the heart of Karachi, we have redefined the boundaries of traditional grooming. By merging the artistry of a high-end salon with the discipline of an elite fitness club, we provide a holistic journey for the modern individual.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#392d22]">The Beauty Mission</h4>
                <p className="text-sm text-gray-500 leading-loose">
                  Our stylists and artists are craftsmen. We don't believe in "one size fits all"—every look is a bespoke creation designed to mirror your inner confidence.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#392d22]">The Fitness Ethos</h4>
                <p className="text-sm text-gray-500 leading-loose">
                  Strength is a luxury. Our gym is designed to be your private lab for transformation, led by trainers who prioritize longevity and science-backed results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The "Why" - Modern Values Grid */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
             <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-2 block">Why Choose Us</span>
             <h2 className="text-3xl font-serif text-[#392d22]">The Pillars of Excellence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {[
              { title: "Bespoke Service", desc: "No two clients are the same. We tailor every treatment to your unique biology and style." },
              { title: "Elite Professionals", desc: "Our team consists of certified masters in cosmetology and sports science." },
              { title: "Premium Products", desc: "Only world-class, clinical-grade products and equipment touch our clients." },
              { title: "Karachi Heritage", desc: "Proudly serving the Gulshan-e-Iqbal community with international standards." },
              { title: "Proven Results", desc: "413+ verified 5-star experiences with a 100% recommendation rate." },
              { title: "Luxurious Privacy", desc: "A serene environment designed for focus, relaxation, and transformation." }
            ].map((value, i) => (
              <div key={i} className="bg-white p-12 hover:bg-[#392d22] group transition-all duration-500">
                <h4 className="text-[#392d22] group-hover:text-white font-serif text-lg mb-4 transition-colors">{value.title}</h4>
                <p className="text-gray-500 group-hover:text-white/70 text-sm leading-relaxed transition-colors font-light">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="py-32 text-center">
        <h3 className="text-4xl font-serif text-[#392d22] mb-12 italic">Join the movement.</h3>
        <Link 
          href="/contact" 
          className="bg-[#392d22] text-white px-14 py-6 text-[11px] uppercase tracking-[0.4em] font-bold hover:shadow-2xl transition-all"
        >
          Book Your Experience
        </Link>
      </section>
    </main>
  );
}