'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Salams ${formData.name}! Your message has been sent to Chic & Glam.`);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] selection:bg-[#392d22] selection:text-white">
      {/* 1. ELEGANT HEADER */}
      <section className="pt-32 pb-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[11px] uppercase tracking-[0.6em] text-gray-400 mb-6 block">Get in Touch</span>
          <h1 className="text-5xl md:text-7xl font-serif text-[#392d22] leading-tight mb-8">
            Let’s Start Your <br /> <span className="italic font-light text-gray-400">Transformation.</span>
          </h1>
          <div className="w-20 h-[1px] bg-[#392d22] mx-auto"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* 2. CONTACT INFO (Visual Sidebar) */}
          <div className="lg:col-span-5 space-y-16">
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#392d22] mb-10">Studio Details</h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="font-serif text-lg text-[#392d22] mb-2">The Studio</p>
                    <p className="text-gray-500 font-light leading-relaxed">
                      FL 11/3 KDA Market, Gulshan-e-Iqbal,<br /> 
                      Block 3, Karachi, Pakistan (75050)
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="font-serif text-lg text-[#392d22] mb-2">Direct Inquiries</p>
                    <a href="tel:03313386136" className="text-gray-500 font-light hover:text-[#392d22] transition-colors">0331 3386136</a>
                  </div>
                </div>

                <div className="flex gap-6">
                  <span className="text-xl">✉️</span>
                  <div>
                    <p className="font-serif text-lg text-[#392d22] mb-2">Email Us</p>
                    <p className="text-gray-500 font-light">chicglam9@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WHATSAPP LUXURY CARD */}
            <div className="bg-[#392d22] p-10 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-2xl font-serif mb-4 italic">Instant Booking</h3>
                <p className="text-white/60 text-sm font-light mb-8 leading-relaxed">
                  Prefer a quick chat? Message us on WhatsApp for faster response and appointment scheduling.
                </p>
                <a
                  href="https://wa.me/923313386136"
                  target="_blank"
                  className="inline-flex items-center gap-3 border-b border-white/30 pb-2 text-[11px] uppercase tracking-[0.3em] font-bold hover:border-white transition-all"
                >
                  Message Now →
                </a>
              </div>
              <div className="absolute -right-10 -bottom-10 text-[10rem] text-white/5 font-serif select-none">
                CG
              </div>
            </div>
          </div>

          {/* 3. CONTACT FORM */}
          <div className="lg:col-span-7 bg-white p-12 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.04)] border border-gray-50">
            <h2 className="text-3xl font-serif text-[#392d22] mb-10 italic">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="relative border-b border-gray-200 focus-within:border-[#392d22] transition-colors pb-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Sarah Khan"
                  className="w-full bg-transparent outline-none text-[#392d22] placeholder:text-gray-200 font-light"
                />
              </div>

              <div className="relative border-b border-gray-200 focus-within:border-[#392d22] transition-colors pb-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="03xx xxxxxxx"
                  className="w-full bg-transparent outline-none text-[#392d22] placeholder:text-gray-200 font-light"
                />
              </div>

              <div className="relative border-b border-gray-200 focus-within:border-[#392d22] transition-colors pb-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  placeholder="Tell us about the service you're interested in..."
                  className="w-full bg-transparent outline-none text-[#392d22] placeholder:text-gray-200 font-light resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#392d22] text-white py-6 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-[#2a1f17] transition-all shadow-xl"
              >
                Confirm Inquiry
              </button>
            </form>
          </div>
        </div>

        {/* 4. GOOGLE MAPS SECTION */}
        <div className="mt-32">
          <div className="w-full h-[500px] grayscale brightness-95 contrast-125 hover:grayscale-0 transition-all duration-1000 overflow-hidden shadow-2xl border border-gray-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.674312151747!2d67.0911072!3d24.9192931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb338da97e55555%3A0x6a0c56784013919b!2sKDA%20Market%20Gulshan-e-Iqbal!5e0!3m2!1sen!2spk!4v1715432100000!5m2!1sen!2spk" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}