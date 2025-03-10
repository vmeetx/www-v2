import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import DirectorCard from '@/components/DirectorCard';
import { directors } from '@/constants/Leadership';

const Leadership = () => {
  return (
    <div>
      <Header />
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-red-500 font-Pacifico">Meet </span> Our
              Board of Directors
            </h2>
            <div className="h-1 w-24 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The "Sugar Labs Board of Directors" consists of dedicated six
              individuals who guide our organization's mission to provide
              educational tools for children worldwide. They bring diverse
              expertise in education, technology, and nonprofit leadership.
            </p>
          </div>

          {/* Directors grid with equal height cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {directors.map((director) => (
              <div key={director.id} className="h-full">
                <DirectorCard director={director} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Leadership;
