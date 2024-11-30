import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero relative h-screen text-white p-8 sm:p-16">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-[-1] min-w-full min-h-full"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/shopping-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Hero Content */}
        <div className="hero-content absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-t from-black/50 via-transparent to-black/50 text-center px-4 sm:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to <span className="text-yellow-300">My-Shop</span>
          </h1>
          <p className="text-base sm:text-xl mb-6 font-medium text-gray-200">
            Your One-Stop Shop for Amazing Products
          </p>
          <Link href="/showproducts">
            <button className="px-6 py-3 rounded-full bg-yellow-300 text-gray-800 font-bold hover:bg-yellow-400 transition-all shadow-lg">
              Explore Products
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products py-12 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <h2 className="text-3xl font-bold  text-center text-blue-800 mb-8">
          Featured Products
        </h2>
        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Product cards will be dynamically rendered here */}
          <p className="text-center col-span-full text-gray-500">
            No products available at the moment.
          </p>
        </div>
        <div className="text-center mt-8">
          <Link href="/showproducts">
            <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-md">
              View All
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about bg-gradient-to-br from-green-100 to-blue-50 py-12 px-4">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          About Us
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-6 text-gray-600">
          At <span className="font-semibold">My-Shop</span>, we aim to provide
          high-quality products at the best prices. Customer satisfaction is our
          priority, and we constantly strive to bring you the best shopping
          experience.
        </p>
        <div className="text-center">
          <Link href="/about">
            <button className="px-6 py-2 rounded-full bg-green-600 text-white font-bold hover:bg-green-500 transition-all shadow-md">
              Learn More
            </button>
          </Link>
        </div>
      </section>

      {/* Contact Us CTA */}
      <section className="contact bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Get in Touch with Us
        </h2>
        <p className="text-center mb-6 text-gray-200">
          Have any questions? We&apos;d love to hear from you!
        </p>
        <div className="text-center">
          <Link href="/contact">
            <button className="px-6 py-2 rounded-full bg-yellow-300 text-gray-800 font-bold hover:bg-yellow-400 transition-all shadow-lg">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
