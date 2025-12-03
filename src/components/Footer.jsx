import { Droplet } from "lucide-react";
import { Link } from "react-router";

const Footer = () => (
  <footer className="relative border-t border-white/10 bg-[#0B0B15] pt-16 pb-8 overflow-hidden">
    {/* Background Glows */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] -z-10" />

    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
            <Droplet className="text-white fill-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-white">Blood<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Aid</span></span>
        </div>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Connecting donors with those in need. Join our community to save lives and make a difference today.
          </p>
          <div className="flex gap-4">
            <SocialLink href="https://facebook.com" icon="facebook" />
            <SocialLink href="https://twitter.com" icon="twitter" />
            <SocialLink href="https://instagram.com" icon="instagram" />
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h6 className="font-bold text-white mb-6">Navigation</h6>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
            <li><Link to="/donation-requests" className="hover:text-purple-400 transition-colors">Donation Requests</Link></li>
            <li><Link to="/blog" className="hover:text-purple-400 transition-colors">Blog & Stories</Link></li>
            <li><Link to="/funding" className="hover:text-purple-400 transition-colors">Funding</Link></li>
            <li><Link to="/dashboard" className="hover:text-purple-400 transition-colors">Dashboard</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h6 className="font-bold text-white mb-6">Company</h6>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-purple-400 transition-colors">Contact Support</Link></li>
            <li><Link to="/terms" className="hover:text-purple-400 transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter/Contact */}
        <div>
          <h6 className="font-bold text-white mb-6">Stay Connected</h6>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to our newsletter for updates and urgent alerts.
          </p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 w-full"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} BloodAid. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-gray-500">
          <Link to="/privacy" className="hover:text-gray-300">Privacy</Link>
          <Link to="/terms" className="hover:text-gray-300">Terms</Link>
          <Link to="/cookies" className="hover:text-gray-300">Cookies</Link>
        </div>
      </div>
    </div>
  </footer>
);

function SocialLink({ href, icon }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-purple-500 hover:text-white transition-all duration-300"
    >
      {icon === 'facebook' && (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      )}
      {icon === 'twitter' && (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
      )}
      {icon === 'instagram' && (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.396 3.678 1.378c-.98.98-1.247 2.092-1.306 3.373C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.059 1.281.326 2.393 1.306 3.373.98.98 2.092 1.247 3.373 1.306C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.326 3.373-1.306.98-.98 1.247-2.092 1.306-3.373.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.281-.326-2.393-1.306-3.373-.98-.98-2.092-1.247-3.373-1.306C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
      )}
    </a>
  );
}

export default Footer;