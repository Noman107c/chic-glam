import Image from 'next/image';
import Link from 'next/link';

export default function BeautySalon() {
  const services = [
    {
      title: 'Hair Artistry',
      category: 'Styling & Treatments',
      description: 'Precision cuts, couture coloring, and restorative therapy designed to enhance your hair’s natural vitality.',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Bridal & Party Makeup',
      category: 'Premium Artistry',
      description: 'Expert makeup application for your most significant moments, using world-class luxury products for a flawless finish.',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Nail Couture',
      category: 'Manicure & Pedicure',
      description: 'Sophisticated nail care including bespoke nail art and rejuvenating spa treatments for hands and feet.',
      image: 'https://images.unsplash.com/photo-1604654894610-df490651e12c?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Skin Rejuvenation',
      category: 'Facials & Skincare',
      description: 'Advanced facial treatments tailored to your skin type, promoting a healthy, radiant, and timeless glow.',
      image: 'https://images.unsplash.com/photo-1570172234562-969c67a0b160?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Silk Smooth Care',
      category: 'Waxing & Threading',
      description: 'Precise and gentle hair removal services providing long-lasting smoothness with clinical care.',
      image: 'https://images.unsplash.com/photo-1590439474864-192d2d9a91b1?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Elegant Header */}
      <section className="relative py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-[11px] uppercase tracking-[0.5em] text-[#392d22] font-bold mb-4 block">The Art of Beauty</span>
          <h1 className="text-5xl md:text-7xl font-serif text-[#392d22] mb-8">Beauty <span className="italic font-light text-gray-400">Salon</span></h1>
          <div className="w-20 h-[1px] bg-[#392d22] mx-auto mb-8"></div>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Where luxury meets artistry. We curate a personalized beauty experience designed to empower your inner confidence and radiate elegance.
          </p>
        </div>
      </section>

      {/* 2. Services Menu Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {services.map((service, index) => (
            <div key={index} className="group flex flex-col md:flex-row gap-8 items-center border-b border-gray-100 pb-16 last:border-0">
              {/* Image Container */}
              <div className="w-full md:w-1/2 aspect-square relative overflow-hidden">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              {/* Content Container */}
              <div className="w-full md:w-1/2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2 block">{service.category}</span>
                <h3 className="text-3xl font-serif text-[#392d22] mb-4 group-hover:italic transition-all">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 font-light">
                  {service.description}
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] font-bold text-[#392d22] group/btn"
                >
                  Book Treatment
                  <div className="w-8 h-[1px] bg-[#392d22] group-hover/btn:w-12 transition-all"></div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Final Call to Action */}
      <section className="bg-[#FAF9F6] py-20 text-center border-y border-gray-100">
        <h2 className="text-2xl font-serif text-[#392d22] mb-6 tracking-wide italic">"Experience the Chic & Glam transformation."</h2>
        <Link 
          href="/contact" 
          className="bg-[#392d22] text-white px-12 py-5 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-[#524132] transition-colors inline-block"
        >
          View Full Price List
        </Link>
      </section>
    </main>
  );
}