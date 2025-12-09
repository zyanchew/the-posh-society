import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative min-h-[60vh] grid place-items-center overflow-hidden">
      <Image
        src="/banner.jpg"
        alt="Hero"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-white/5" />
      <div className="py-10"></div>

      <div className="relative container mx-auto text-white text-center font-bold px-10">

        <div className="mt-8 flex items-center justify-center gap-10 md:gap-20">
          <Link href="/shop" className="btn btn-primary bg-blue-800 border-20 border-blue-800 hover:border-blue focus:outline-none focus:ring-10 focus:ring-blue">
            Shop now
          </Link>
          <Link href="/about" className="btn btn-outline bg-blue-800 border-20 border-blue-800 hover:border-blue focus:outline-none focus:ring-10 focus:ring-blue">
            About us
          </Link>
        </div>
      </div>
    </div>
  );
}