import Image from 'next/image';

const reviews = [
  {
    name: "Sophia Henderson",
    service: "Bridal Makeup",
    text: "The attention to detail at Chic & Glam is unmatched. They didn't just style me; they made me feel like the best version of myself for my big day.",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    service: "Personal Training",
    text: "Finally, a gym that understands luxury and results. The trainers are elite, and the atmosphere keeps me motivated every single day.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    service: "Skincare & Facials",
    text: "The most relaxing experience in Karachi. My skin has never looked better. It's my weekly sanctuary for self-care.",
    rating: 5
  }
];

export default function ReviewsSection() {
  return (
    <section className="py-24 bg-[#FCFBFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Trust Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end mb-20">
          <div className="lg:col-span-2">
            <span className="text-[11px] uppercase tracking-[0.5em] text-[#392d22] font-bold mb-4 block">
              Testimonials
            </span>
            <h2 className="text-5xl md:text-6xl font-serif text-[#392d22] leading-tight">
              Trusted by <span className="italic font-light">Thousands</span> <br/>
              of Confident Clients.
            </h2>
          </div>

          {/* Main Stat Card */}
          <div className="bg-white border border-gray-100 p-10 shadow-sm flex flex-col items-center text-center">
             <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#392d22"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
             </div>
             <div className="text-4xl font-serif text-[#392d22] mb-1">100%</div>
             <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Recommendation Rate</p>
             <div className="mt-4 text-[12px] text-gray-500 font-light">Based on 413 Verified Reviews</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="flex flex-col h-full group">
              <div className="mb-6 flex-grow">
                {/* Modern Quote Icon */}
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="text-[#392d22]/20 mb-6 group-hover:text-[#392d22]/40 transition-colors">
                  <path d="M3 21c3 0 7-1 7-8V5H3v8h4c0 5-4 6-4 6zM14 21c3 0 7-1 7-8V5h-7v8h4c0 5-4 6-4 6z" fill="currentColor"/>
                </svg>
                <p className="text-lg text-gray-600 leading-relaxed font-light italic mb-8">
                  "{review.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#392d22]/5 flex items-center justify-center text-[#392d22] font-serif text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-wider text-[#392d22] uppercase">{review.name}</h4>
                  <p className="text-[11px] tracking-widest text-gray-400 uppercase mt-1">{review.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram / Social Preview Section */}
        <div className="mt-32 relative group cursor-pointer overflow-hidden">
           <Image
             src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=2000"
             alt="Social Feed"
             width={1500}
             height={400}
             className="w-full h-64 object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
           />
           <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex items-center gap-4 mb-4">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#392d22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                 <span className="text-[11px] uppercase tracking-[0.5em] text-[#392d22] font-bold">@chic_glamofficial</span>
              </div>
              <p className="text-gray-500 font-serif italic text-sm">Join our journey on Instagram</p>
           </div>
        </div>

      </div>
    </section>
  );
}
