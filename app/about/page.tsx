import Image from "next/image";

export default function About() {
  return (
    <div className="about-page bg-gradient-to-b from-blue-50 via-white to-gray-100 text-gray-800 py-10 px-4 pt-24">
      {/* Intro Section */}
      <div className="about-container flex flex-col lg:flex-row items-center gap-8 lg:gap-16 max-w-6xl mx-auto mb-16">
        {/* Left: Image */}
        <div className="about-image-wrapper flex-shrink-0">
          <Image
            src="/about.webp"
            alt="About Us"
            className="rounded-lg shadow-lg"
            width={400}
            height={400}
          />
        </div>

        {/* Right: Content */}
        <div className="about-content space-y-4">
          <h1 className="text-4xl font-extrabold text-blue-600">About Us</h1>
          <p>
            Welcome to our e-commerce platform! We are committed to delivering
            top-quality products at unbeatable prices. Our goal is to make your
            shopping experience easy, enjoyable, and rewarding.
          </p>
          <p>
            We take pride in offering a diverse range of items, from the latest
            trends to everyday essentials. Our platform is designed to cater to
            all your needs while ensuring convenience and affordability.
          </p>
          <p>
            With a dedicated team focused on quality and customer satisfaction,
            we strive to exceed your expectations in every interaction. Whether
            you&apos;re shopping for yourself or looking for the perfect gift,
            you can count on us for an exceptional experience.
          </p>
          <p>
            Thank you for choosing our platform. We&apos;re here to make shopping
            simple, reliable, and enjoyable. Explore our collection today and
            discover why thousands of customers trust us for their needs!
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="mission-section text-center bg-blue-50 py-10 px-6 rounded-lg shadow-md max-w-5xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Mission</h2>
        <p className="text-gray-700">
          To revolutionize the online shopping experience by providing
          high-quality products, exceptional service, and a seamless shopping
          experience for customers worldwide.
        </p>
      </section>

      {/* Values Section */}
      <section className="values-section text-center py-10 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-8">Our Core Values</h2>
        <ul className="values-list grid grid-cols-1 md:grid-cols-2 gap-6">
          <li className="p-6 bg-green-50 rounded-lg shadow-md">
            💡 <span className="font-semibold">Innovation:</span> Bringing creative solutions to enhance shopping.
          </li>
          <li className="p-6 bg-green-50 rounded-lg shadow-md">
            🤝 <span className="font-semibold">Trust:</span> Building relationships with honesty and transparency.
          </li>
          <li className="p-6 bg-green-50 rounded-lg shadow-md">
            🌟 <span className="font-semibold">Excellence:</span> Pursuing quality in every aspect of our business.
          </li>
          <li className="p-6 bg-green-50 rounded-lg shadow-md">
            🌍 <span className="font-semibold">Sustainability:</span> Promoting eco-friendly and ethical practices.
          </li>
        </ul>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section bg-gradient-to-r from-purple-100 to-blue-100 py-10 px-6 rounded-lg shadow-md max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-8">Our Achievements</h2>
        <div className="achievements grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="achievement p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-extrabold text-purple-600">1M+ Happy Customers</h3>
            <p className="text-gray-700">
              Serving satisfied customers globally with exceptional service.
            </p>
          </div>
          <div className="achievement p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-extrabold text-purple-600">500K+ Products</h3>
            <p className="text-gray-700">
              A wide variety of products tailored to your every need.
            </p>
          </div>
          <div className="achievement p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-extrabold text-purple-600">5-Star Ratings</h3>
            <p className="text-gray-700">
              Consistently rated for quality, reliability, and excellence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
