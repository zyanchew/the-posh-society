import Link from "next/link";
import CartButton from "./CartButton";

export default function Header() {
return (
<header className="sticky top-0 z-50 bg-white">
<nav className="container mx-auto py-4 flex gap-2 items-center justify-between">
<Link href="/" className="text-3xl font-medium">the_poshsociety</Link>
<div className="flex items-center gap-5 text-xl">
<Link href="/shop" className="font-medium">Shop</Link>
<Link href="/about" className="font-medium">About</Link>
<CartButton/>
</div>
</nav>
</header>
);
}