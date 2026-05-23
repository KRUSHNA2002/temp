const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white py-10 px-4 md:px-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold tracking-widest mb-4">
            FOTOEXPRESS STUDIO
          </h2>

          <p className="text-gray-400">
            Capturing emotions, stories, and unforgettable moments through photography.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/services">Services</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-4">
            Contact
          </h3>

          <p className="text-gray-400 mb-2">
            📧 fotoexpresstudio@gmail.com
          </p>

          <p className="text-gray-400 mb-2">
            📞 +91 7020787143
          </p>

          <p className="text-gray-400">
            📍 Rajaram Nagar, Kharadi, Pune
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 mt-10 border-t border-zinc-800 pt-6">
        © 2026 FOTOEXPRESS Studio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;