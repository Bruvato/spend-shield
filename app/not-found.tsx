import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative w-screen h-screen">
      <Image
        src="/pika404.png"
        alt="404 Not Found"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        className="opacity-80"
      />
      <div className="absolute top-22/29 left-25/47 transform -translate-x-20/64 -translate-y-1/2 text-center z-10">
        <Link
          href="/"
          className="
            inline-block
            text-xs sm:text-sm md:text-base 
            px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3
            rounded-lg 
            bg-white text-black 
            hover:bg-gray-200 
            transition-all 
            duration-150 
            ease-in-out
            will-change-transform
            origin-center
            scale-100
            hover:scale-[1.05]
            active:scale-95
            transform
            delay-0
          "
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
