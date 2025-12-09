function FaqItem({
  q,
  a,
  defaultOpen = false,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group border-b py-4" {...(defaultOpen ? { open: true } : {})}>
      <summary className="cursor-pointer list-none flex items-center justify-between text-base md:text-lg font-medium">
        <span>{q}</span>
        <span className="ml-4 transition group-open:rotate-45">＋</span>
      </summary>
      <div className="mt-2 text-sm md:text-base text-gray-600">{a}</div>
    </details>
  );
}

export default function FAQ() {
  return (
    <div className="container mx-auto px-4 py-10">
  <div className="mx-auto max-w-4xl md:max-w-5xl">
    <h3 className="text-2xl md:text-3xl font-medium mb-6">
      Frequently Asked Questions
    </h3>

    <div className="space-y-4">
      <FaqItem
        q="Are our products authentic?"
        a="Yes, every item is sourced from verified retailers or directly from the brand’s official stores in the US. You can verify the production year and official product code by scanning the QR code on each product."
        defaultOpen
      />
      <FaqItem
        q="Where do we ship?"
        a="We ship to Malaysia, Singapore, and Thailand. Other countries might be possible upon request."
      />
      <FaqItem
        q="How long does delivery take?"
        a="Most of the items are Pre-Order basis. Delivery time will usually take 3 weeks to 1 month."
      />
    </div>
  </div>
</div>
  );
}