const REVIEWS = [
  {
    name: "Ain, MY",
    text:
      "Legit items, smooth process, and fast shipping. My Ralph Lauren order arrived perfectly packed!",
  },
  {
    name: "Ken, SG",
    text:
      "Great pricing and clear communication. They confirmed sizes and authenticity before purchase.",
  },
  {
    name: "Nok, TH",
    text:
      "Second time buying—reliable service and updates at every step. Highly recommended.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10 space-y-12 bg-white">
      {/* Welcome */}
      <section aria-labelledby="welcome" className="space-y-4">
        <h1 id="welcome" className="text-3xl md:text-4xl py-4 font-medium tracking-tight">
          Welcome to <span className="font-medium">the_poshsociety</span> 👋🏻
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Your trusted personal shopper for <span className="font-bold">Ralph Lauren</span> and other
          curated labels. We handle sourcing, authentication, and shipping to{" "}
          <span className="font-medium">Malaysia, Singapore, and Thailand</span>.
        </p>

        <div className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm">
          <p className="text-gray-700">
            Our promise is simple: <span className="font-bold">authentic products</span>,
            transparent pricing, and <span className="font-bold">excellent services</span> — every time!
          </p>
        </div>
      </section>

      {/* How to Order */}
      <section aria-labelledby="how-to-order" className="space-y-5">
        <h2 id="how-to-order" className="text-2xl md:text-3xl font-medium">
          How to make an order?
        </h2>

        <ol className="list-decimal pl-5 space-y-3 text-gray-700 text-base md:text-lg">
          <li>
            Browse our catalogue and select the items you love (note size/colour where applicable).
          </li>
          <li>Add them to your cart and proceed to checkout.</li>
          <li>
            Choose your preferred shipping option to MY/SG/TH and confirm your details.
          </li>
          <li>
            Complete payment. We&rsquo;ll verify authenticity, purchase, and ship. 
          </li>
          <li>
            You&rsquo;ll then receive shipping details to keep track of your purchase.
          </li>
        </ol>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://wa.me/60196343999?text=Hi%20the_poshsociety!%20I%27d%20like%20to%20order%20or%20ask%20a%20question."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-emerald-600 px-4 py-2 text-emerald-700 hover:bg-emerald-50 transition"
            aria-label="Chat on WhatsApp"
          >
            💬 WhatsApp: +60 19-634 3999 (Zhi Jie)
          </a>
        </div>
      </section>

      {/* Customer Reviews */}
      <section aria-labelledby="reviews" className="space-y-5">
        <h2 id="reviews" className="text-2xl md:text-3xl font-medium">
          What our customers say?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <blockquote
              key={i}
              className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm"
            >
              <p className="text-gray-700">“{r.text}”</p>
              <footer className="mt-3 text-sm text-gray-500">— {r.name}</footer>
            </blockquote>
          ))}
        </div>

        <p className="text-sm text-gray-500">
          *Reviews are from verified buyers who consented to share their feedback.
        </p>
      </section>
    </main>
  );
}
