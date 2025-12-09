import { Instagram } from "lucide-react"; // npm i lucide-react

export default function SocialCTA() {
  return (
    <section className="py-6">
      <div className="container mx-auto px-6">
         <a
          href="https://www.instagram.com/the_poshsociety/" // <- your IG URL
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Instagram (new tab)"
          className="mt-10 inline-flex items-center justify-center
                     hover:scale-105 transition"
        >
          <Instagram className="w-8 h-8" aria-hidden="true" />
        </a>
        <p className="text-xl md:text-xl text-grey-500 font-light py-1">
          Follow us on Instagram.
        </p>
      </div>
    </section>
  );
}