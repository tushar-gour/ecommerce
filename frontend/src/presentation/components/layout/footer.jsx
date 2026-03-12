import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    Shop: ["New Arrivals", "Best Sellers", "Featured", "Collections"],
    Company: ["About Us", "Careers", "Press", "Blog"],
    Support: ["Help Center", "Shipping", "Returns", "Contact"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer className="bg-navbar-bg border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold text-gray-800"
            >
              <img
                src="/images/store_logo.png"
                alt="Tushar Store"
                className="w-6 h-6"
              />
              <span>Tushar Store</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Your one-stop shop for quality products at great prices.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-gray-800 tracking-wide mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <span className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer transition-colors duration-300">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Tushar Store. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Twitter", "Instagram", "GitHub"].map((social) => (
              <span
                key={social}
                className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-300"
              >
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
