export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="text-2xl font-light">the_poshsociety</div>
        </div>

        {/* right column */}
        <div className="text-right justify-self-end text-2xl font-light">
          Join our community, and shop anytime, anywhere.
        </div>
      </div>
    </footer>
  );
}