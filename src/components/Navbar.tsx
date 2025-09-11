export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-500/10 backdrop-blur-md z-50 h-16 md:h-20">
      <div className="flex max-w-6xl w-full px-6 md:px-8 lg:px-10 my-4 mx-auto custom-font justify-between md:justify-around text-white">
        <p className="relative group">
          <a href="#" className="inline-block">
            HOME
            <span className="block h-0.5 bg-violet-500 max-w-0 group-hover:max-w-full transition-all duration-500"></span>
          </a>
        </p>
        <p className="relative group">
          <a href="#about" className="inline-block">
            ABOUT
            <span className="block h-0.5 bg-violet-500 max-w-0 group-hover:max-w-full transition-all duration-500"></span>
          </a>
        </p>
        <p className="relative group">
          <a href="#speakers" className="inline-block">
            SPEAKERS
            <span className="block h-0.5 bg-violet-500 max-w-0 group-hover:max-w-full transition-all duration-500"></span>
          </a>
        </p>
        <p className="relative group">
          <a href="#partners" className="inline-block">
            PARTNERS
            <span className="block h-0.5 bg-violet-500 max-w-0 group-hover:max-w-full transition-all duration-500"></span>
          </a>
        </p>
        <p className="relative group">
          <a href="#faq" className="inline-block">
            FAQ
            <span className="block h-0.5 bg-violet-500 max-w-0 group-hover:max-w-full transition-all duration-500"></span>
          </a>
        </p>
      </div>
    </nav>
  );
}
