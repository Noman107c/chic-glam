import Image from 'next/image';
import Link from 'next/link';

interface ServiceSectionProps {
  title: string;
  description: string;
  services: string[];
  link: string;
  bgColor: string;
  isReversed: boolean;
  image: string; // Added this
}

export function ServiceSection({
  title,
  description,
  services,
  link,
  bgColor,
  isReversed,
  image
}: ServiceSectionProps) {
  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${bgColor} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text Content Block */}
          <div className={`${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[#392d22] font-bold mb-4 sm:mb-6 block">
              The Experience
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#392d22] leading-tight mb-6 sm:mb-8">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-gray-500 font-light leading-relaxed mb-8 sm:mb-12">
              {description}
            </p>

            <div className="mb-8 sm:mb-12">
              <h3 className="text-xs sm:text-sm uppercase tracking-widest font-bold text-[#392d22] mb-4 sm:mb-6">Featured Specialties</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-6 sm:gap-x-8">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mr-3 sm:mr-4 shrink-0"></span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={link}
              className="inline-block bg-[#392d22] text-white px-8 sm:px-10 py-4 sm:py-5 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#2a2119] transition-all duration-300"
            >
              Explore {title}
            </Link>
          </div>

          {/* Image Block */}
          <div className={`${isReversed ? 'lg:order-1' : 'lg:order-2'} relative group`}>
            {/* Elegant Border Decoration */}
            <div className={`absolute -inset-2 sm:-inset-4 border border-gray-100 -z-10 transition-transform duration-700 group-hover:scale-105 ${isReversed ? 'translate-x-2 sm:translate-x-4' : '-translate-x-2 sm:-translate-x-4'}`}></div>

            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full overflow-hidden shadow-2xl">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-[#392d22]/5 group-hover:bg-transparent transition-colors duration-700"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
