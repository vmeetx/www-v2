import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import learnImage from '../assets/learn.jpg'; // Adjust the path based on your project structure

const MainPage: React.FC = () => {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    // Handle subscription logic here
    console.log('Subscribed with email:', email);
  };

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="text-sm text-gray-600">
              EMPOWERING YOUNG LEARNERS
            </div>
            <h1 className="text-4xl md:text-5xl font-bold space-y-2">
              <span>Our Mission?</span>
              <div>
                <span className="text-coral-500">Authentic</span>
                <br />
                <span>Problem</span>
                <br />
                <span>Solving</span>
              </div>
            </h1>
            <p className="text-gray-600">
              Join Us to Empower Young Learners all Across the Globe. The
              simplest way to get involved is to join our newsletter.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>

          {/* Right Column */}
          <div className="relative">
            <div className="bg-neutral-100 rounded-2xl overflow-hidden">
              <div className="absolute top-6 right-6 bg-white rounded-lg p-4 shadow-lg max-w-xs">
                <h3 className="font-semibold mb-2">Project Based Learning</h3>
                <p className="text-sm text-gray-600">
                  Empowering learners and educators with hands-on project-based
                  tools that enable creation and real-world problem-solving.
                </p>
              </div>
              <img
                src={learnImage}
                alt="Students learning"
                className="w-full rounded-2xl"
              />
              <div className="absolute bottom-6 right-6 bg-blue-100 rounded-lg p-4 shadow-lg max-w-xs">
                <h3 className="font-semibold mb-2">
                  Challenge and Fun: It's hard fun.
                </h3>
                <p className="text-sm text-gray-600">
                  Bringing interactive, meaningful experiences that make
                  education exciting and impactful.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
