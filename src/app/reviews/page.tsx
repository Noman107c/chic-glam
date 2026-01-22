import Image from 'next/image';
import Link from 'next/link';

export default function Reviews() {
  const testimonials = [
    {
      name: 'Sarah Ahmed',
      service: 'Bridal Artistry',
      review: 'Absolutely amazing experience! The staff is professional and the results are outstanding. Highly recommend Chic & Glam for all your beauty needs.',
      date: 'January 2024'
    },
    {
      name: 'Fatima Khan',
      service: 'Elite Fitness',
      review: 'The fitness gym here is top-notch. The trainers are knowledgeable and really care about your progress. I\'ve never felt better!',
      date: 'December 2023'
    },
    {
      name: 'Ayesha Malik',
      service: 'Skincare Therapy',
      review: 'From bridal makeup to regular facials, Chic & Glam never disappoints. Their attention to detail is incredible.',
      date: 'November 2023'
    },
    {
      name: 'Zara Hussain',
      service: 'Personal Training',
      review: 'The personal training sessions have transformed my fitness journey. The team is supportive and motivating throughout.',
      date: 'October 2023'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Review Header Section */}
      <section className="pt-24 pb-16 bg-[#FAF9F6] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-[11px] uppercase tracking-[0.5em] text-[#392d22] font-bold mb-4 block">Voices of Excellence</span>
          <h1 className="text-5xl md:text-7xl font-serif text-[#392d22] mb-8">Client <span className="italic font-light text-gray-400">Experiences</span></h1>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
            <div className="flex flex-col items-center">
                <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#392d22"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">413 Verified Reviews</p>
            </div>
            <div className="h-10 w-[1px] bg-gray-200 hidden md:block"></div>
            <div className="text-center">
                <div className="text-3xl font-serif text-[#392d22]">100%</div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Recommendation Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Testimonials Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          {testimonials.map((item, index) => (
            <div key={index} className="break-inside-avoid bg-white border border-gray-100 p-10 hover:shadow-xl transition-all duration-500 group">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="text-[#392d22]/10 mb-6 group-hover:text-[#392d22]/30 transition-colors">
                <path d="M3 21c3 0 7-1 7-8V5H3v8h4c0 5-4 6-4 6zM14 21c3 0 7-1 7-8V5h-7v8h4c0 5-4 6-4 6z" fill="currentColor"/>
              </svg>
              <p className="text-lg text-gray-500 font-light leading-relaxed italic mb-10">
                "{item.review}"
              </p>
              <div className="flex justify-between items-end pt-6 border-t border-gray-50">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#392d22]">{item.name}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{item.service}</p>
                </div>
                <span className="text-[9px] text-gray-300 uppercase tracking-tighter">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Social Proof / Instagram Section */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
                <span className="text-[11px] uppercase tracking-[0.4em] text-gray-400 mb-2 block">Live Gallery</span>
                <h2 className="text-4xl font-serif text-[#392d22]">On the <span className="italic">Gram</span></h2>
            </div>
            <Link href="https://instagram.com/chic_glamofficial" className="text-[11px] uppercase tracking-[0.3em] font-bold border-b border-[#392d22] pb-1 hover:text-gray-400 transition-colors">
                @chic_glamofficial
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000",
              "https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=1000",
              "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000",
              "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000"
            ].map((img, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden bg-gray-200">
                <Image 
                    src={img} 
                    alt={`Social Feed ${i}`} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Contact/Action */}
      <section className="py-32 text-center">
        <h3 className="text-3xl font-serif text-[#392d22] mb-8">Ready to share your story?</h3>
        <Link href="/contact" className="bg-[#392d22] text-white px-12 py-5 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-black transition-all inline-block">
            Book Appointment
        </Link>
      </section>
    </main>
  );
}