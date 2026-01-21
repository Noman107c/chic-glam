import Image from 'next/image';
import Link from 'next/link';

export default function FitnessGym() {
  const services = [
    {
      title: 'Elite Personal Training',
      category: '1-on-1 Performance',
      description: 'Bespoke coaching from certified experts. We analyze your biomechanics and lifestyle to create a roadmap for elite results.',
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Strength & Conditioning',
      category: 'Power & Longevity',
      description: 'Master the fundamentals of resistance training. Build a resilient physique with our state-of-the-art free weights and machines.',
      image: 'https://images.unsplash.com/photo-1534367507873-d2d7e2495992?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Advanced Cardio Flow',
      category: 'Endurance & V02 Max',
      description: 'High-intensity metabolic conditioning designed to improve heart health and incinerate body fat through smart programming.',
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'The Transformation Lab',
      category: 'Complete Body Shift',
      description: 'A data-driven approach to body composition. This 12-week intensive program covers everything from movement to recovery.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Wellness & Nutrition',
      category: 'Holistic Blueprint',
      description: 'Performance doesn’t end at the gym. Get precision nutrition guidance and lifestyle coaching to sustain your new self.',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      {/* 1. High-Impact Header */}
      <section className="relative py-28 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-start max-w-4xl">
            <span className="text-[11px] uppercase tracking-[0.6em] text-gray-500 font-bold mb-4">Elite Fitness Club</span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight mb-8">
              Power <span className="italic font-light text-zinc-600">&</span> Results
            </h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
              Elevate your physical potential in a space designed for focus. 
              State-of-the-art equipment meets world-class coaching to create the ultimate training environment.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Modern Dynamic List */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-24">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`flex flex-col lg:flex-row items-center gap-16 group ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image with Industrial Border */}
              <div className="w-full lg:w-3/5 aspect-[16/9] relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  className="object-cover transform group-hover:scale-105 transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors"></div>
              </div>

              {/* Text Content */}
              <div className="w-full lg:w-2/5">
                <div className="text-emerald-500 font-mono text-[10px] tracking-[0.3em] mb-4 uppercase">
                  Service 0{index + 1} // {service.category}
                </div>
                <h3 className="text-4xl font-serif mb-6 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed font-light mb-10">
                  {service.description}
                </p>
                <Link 
                  href="/contact" 
                  className="inline-block border border-white/20 px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all"
                >
                  Join the Club
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Strength Stats Strip */}
      <section className="bg-zinc-900/50 py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-around gap-12 text-center">
            <div>
                <div className="text-4xl font-serif mb-2 text-white">24/7</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500">Access Available</div>
            </div>
            <div className="w-[1px] h-12 bg-white/10 hidden md:block"></div>
            <div>
                <div className="text-4xl font-serif mb-2 text-white">10+</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500">Expert Coaches</div>
            </div>
            <div className="w-[1px] h-12 bg-white/10 hidden md:block"></div>
            <div>
                <div className="text-4xl font-serif mb-2 text-white">400m²</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500">Premium Space</div>
            </div>
        </div>
      </section>

      {/* 4. Contact Teaser */}
      <section className="py-32 text-center">
        <h2 className="text-3xl font-serif italic text-gray-400 mb-10 tracking-wide">
            Your transformation starts with the first step.
        </h2>
        <Link 
            href="/contact" 
            className="group inline-flex flex-col items-center gap-4"
        >
            <span className="text-white text-[12px] uppercase tracking-[0.5em] font-bold">Book a Free Session</span>
            <div className="h-[2px] w-12 bg-emerald-500 group-hover:w-24 transition-all"></div>
        </Link>
      </section>
    </main>
  );
}