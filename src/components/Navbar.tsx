import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md z-50 h-16 md:h-20">
      <div className="flex max-w-6xl w-full px-6 md:px-8 lg:px-10 py-4 mx-auto custom-font justify-between text-white items-center h-full">
        {/* ADG Logo */}
        <div className="flex items-center ">
          <Image
            className="w-20 md:w-28 h-auto mr-1"
            src="/adg_nav.png"
            width={112}
            height={112}
            alt="ADG Logo"
            priority
            quality={95}
          />
        </div>
        <div className="flex space-x-6 md:space-x-8">
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
        {/* <p className="relative group">
          <a href="#speakers" className="inline-block">
            SPEAKERS
            <span className="block h-0.5 bg-violet-500 max-w-0 group-hover:max-w-full transition-all duration-500"></span>
          </a>
        </p> */}
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
        <p className="relative group">
          <a href="/login" className="inline-block">
            LOGIN
            <span className="block h-0.5 bg-violet-500 max-w-0 group-hover:max-w-full transition-all duration-500"></span>
          </a>
        </p>
        </div>
      </div>
    </nav>
  );
}
