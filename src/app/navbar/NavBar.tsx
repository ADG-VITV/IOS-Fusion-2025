import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md z-50 h-16 md:h-20">
      <div className="flex max-w-6xl w-full px-6 md:px-8 lg:px-10 py-4 mx-auto custom-font justify-between text-white items-center h-full">
        {/* ADG Logo */}
        <div className="flex items-center ">
          <Image
            className="w-20 md:w-28 h-auto"
            src="/adglogo.png"
            width={112}
            height={112}
            alt="ADG Logo"
            priority
            quality={95}
          />
        </div>
        <div className="flex items-center ">
          <Image
            className="w-20 md:w-28 h-auto"
            src="/logo.png"
            width={112}
            height={112}
            alt="ADG Logo"
            priority
            quality={95}
          />
        </div>
      </div>
    </nav>
  );
}
